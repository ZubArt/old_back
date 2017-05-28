import mongoose from '../helpers/mongoose'
const Schema = mongoose.Schema;

let schema = new Schema({
    title: {
        type: String,
        requited: true
    },
    description: String,
    created: {
        type: Date,
        default: Date.now
    },
    images: {
        preview: {
            // base64
            type: String
        },
        main: {
            // base64
            type: String
        }
    },
    urls: {
        src: String,
        dev: String,
        out: String
    },
    tags: []
});

const Post = mongoose.model('Post', schema);

export default Post
