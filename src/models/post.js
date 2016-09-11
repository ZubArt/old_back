import mongoose from '../helpers/mongoose'
const Schema = mongoose.Schema;

let schema = new Schema({
    title: {
        type: String,
        requited: true
    },
    description: String,
    images: {
        preview: {
            // base64
            type: String
        },
        main: {
            // base64
            // TODO think about gif
            type: String
        }
    },
    urls: {
        src: String,
        dev: String,
        out: String
    }
});

const Post = mongoose.model('Post', schema);

export default Post
