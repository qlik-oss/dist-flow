import picassojs from 'picasso.js';
import PicassoQ from 'picasso-plugin-q';
import PicassoHammer from 'picasso-plugin-hammer';
import Hammer from 'hammerjs';
import eventArea from './plugins/event-area';
// import DebugFlags from '../../core/utils/debug-flags';

export default function setup() {
  const picasso = picassojs();
  // default to use canvas renderer
  picasso.renderer.prio(['canvas']);
  // if (DebugFlags.DEVELOPER) {
  picasso.logger.level(picassojs.logger.LOG_LEVEL.WARN);
  // }

  picasso.use(PicassoQ);
  picasso.use(PicassoHammer(Hammer));
  picasso.use(eventArea);
  return picasso;
}
