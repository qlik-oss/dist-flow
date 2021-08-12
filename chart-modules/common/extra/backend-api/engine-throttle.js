import extend from 'extend';

const defaultOptions = {
  enabled: true,
  delay: 50,
};

function deferred() {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

class Throttle {
  constructor({ onSend }) {
    this.options = {};
    this.ongoingRequests = []; // requests being processed
    this.queuedRequests = []; // requests waiting to be processed

    this.recentRequests = [];

    this.resolvedRequests = [];

    this._debounceTimer = null;
    this._latestResolvedRequestedAt = -1;

    this.onSend = onSend;

    this.setOptions({});
  }

  destroy() {
    this.clear();
    this.recentRequests = [];
    this.resolvedRequests = [];
    this.onSend = null;
    this.onCancel = null;
  }

  setOptions(opts) {
    this.options = extend(true, {}, defaultOptions, this.options, opts);

    this.enabled = this.options.enabled || false;
    this.delay = this.options.delay || -1;
  }

  clear() {
    clearTimeout(this._debounceTimer); // do not send queued request

    let request;

    // reject queued requests
    while (this.queuedRequests.length) {
      request = this.queuedRequests.pop();
      request.dfd.reject();
    }

    // reject ongoing requests
    while (this.ongoingRequests.length) {
      request = this.ongoingRequests.pop();
      request.dfd.reject();
    }
  }

  queue(data) {
    const debounceDelay = this.enabled ? this.delay : -1;
    const now = Date.now();

    const requestObject = {
      data,
      dfd: deferred(),
      wrapper: deferred(),
      requestedAt: now,
    };

    const avgResponseTime = Math.max(this._getAvgResolutionTime(), debounceDelay);
    const disabled = debounceDelay < 1;
    const notAnyRecentRequests = this.recentRequests.length < 1;
    const lastRequestIsOld =
      notAnyRecentRequests || now - this.recentRequests.slice(-1)[0].requestedAt > avgResponseTime;
    const lastResponseIsOld = now > this._latestResolvedRequestedAt + debounceDelay;

    if (disabled || notAnyRecentRequests || lastRequestIsOld || lastResponseIsOld) {
      throttleQueue.apply(this, [requestObject, 0]);
    } else {
      throttleQueue.apply(this, [requestObject, Math.min(debounceDelay, 1000)]);
    }

    this.recentRequests.push(requestObject);
    if (this.recentRequests.length > 10) {
      this.recentRequests = this.recentRequests.slice(-10);
    }

    return requestObject.dfd.promise;
  }

  updateResolutionTime() {
    this._latestResolvedRequestedAt = Date.now();
  }

  _getAvgResolutionTime() {
    let avgResponseTime;
    if (this.resolvedRequests.length) {
      avgResponseTime = 0;
      this.resolvedRequests.forEach((q) => {
        avgResponseTime += q.respondedAt - q.sentAt;
      });
      avgResponseTime /= this.resolvedRequests.length;
    }
    return avgResponseTime;
  }
}

function throttleQueue(q, t) {
  const self = this;
  this.queuedRequests.push(q);

  clearTimeout(this._debounceTimer);

  if (t >= 10) {
    this._debounceTimer = setTimeout(() => {
      sendLastThrottledRequest.call(self);
    }, t);
  } else {
    sendLastThrottledRequest.call(self);
  }
}

function sendLastThrottledRequest() {
  if (this.ongoingRequests.length) {
    this.waitingForResponse = true;
    return;
  }
  let req = this.queuedRequests.pop();

  if (req) {
    sendRequest.call(this, req);
  }

  // reject all other requests
  while (this.queuedRequests.length) {
    req = this.queuedRequests.shift();
    req.dfd.reject();
  }
}

function sendRequest(q) {
  this.waitingForResponse = false;
  this.ongoingRequests.push(q);
  const self = this;
  const wrapper = q.wrapper;

  q.sentAt = Date.now();
  wrapper.promise
    .then(
      function (...args) {
        self.ongoingRequests.splice(self.ongoingRequests.indexOf(q), 1);
        q.respondedAt = Date.now();

        self.resolvedRequests.push({
          sentAt: q.sentAt,
          respondedAt: q.respondedAt,
          requestedAt: q.requestedAt,
        });
        if (self.resolvedRequests.length > 10) {
          self.resolvedRequests = self.resolvedRequests.slice(-10);
        }

        // maintain order in queue
        if (q.requestedAt > self._latestResolvedRequestedAt) {
          q.dfd.resolve(...args);
        } else {
          q.dfd.reject();
        }
        self._latestResolvedRequestedAt = q.requestedAt;
      },
      function (...args) {
        self.ongoingRequests.splice(self.ongoingRequests.indexOf(q), 1);
        q.respondedAt = Date.now();
        q.dfd.reject(...args);
      }
    )
    .finally(() => {
      if (self.waitingForResponse) {
        sendLastThrottledRequest.call(self);
      }
    });

  this.onSend(q.data, wrapper);
}

export default Throttle;
