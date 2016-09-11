import config from '../config'
import mongoose from 'mongoose'

mongoose.Promise = Promise;
mongoose.connect(config.get('mongoose:url'), config.get('mongoose:options'));

export default mongoose;
