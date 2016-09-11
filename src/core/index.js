import config from '../config'
import models from '../models'
import Utils from './utils'
import logger from './logger'

let core = {
    config,
    models,
    Utils,
    logger
};

global.app = core;

export {
    config,
    models,
    Utils,
    logger
}
export default core