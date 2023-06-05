import picassojs from 'picasso.js';
import PicassoQ from 'picasso-plugin-q';
import PicassoHammer from 'picasso-plugin-hammer';
import Hammer from 'hammerjs';
import eventArea from './plugins/event-area';
import disclaimer from './disclaimer/disclaimer-component.jsx';

export default function setup(renderer) {
  const picasso = picassojs();
  // default to use canvas renderer
  picasso.renderer.prio([renderer || 'canvas']);

  // TODO: investigate picasso warnings
  // if (DebugFlags.DEVELOPER) {
  // picasso.logger.level(picassojs.logger.LOG_LEVEL.WARN);
  // }

  picasso.use(PicassoQ);
  picasso.use(PicassoHammer(Hammer));
  picasso.use(eventArea);
  picasso.component('disclaimer', disclaimer);
  return picasso;
}
