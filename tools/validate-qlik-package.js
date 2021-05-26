const validate = (pkg) => {
  if (pkg.private) {
    return;
  }
  if (!pkg.publishConfig || pkg.publishConfig.registry !== 'https://qliktech.jfrog.io/qliktech/api/npm/npm-local/') {
    throw new Error('package.json does not have the correct publishConfig');
  }
};

module.exports = validate;
