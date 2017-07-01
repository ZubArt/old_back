import mongoose from '../helpers/mongoose'
const Schema = mongoose.Schema;

let schema = new Schema({
    title: {
        type: String,
        requited: true
    },
    description: String,
    descHtml: String,
    created: {
        type: Date,
        default: Date.now
    },
    dateOfProject: {
        type: Date,
        default: Date.now
    },
    images: {
        preview: {
            // base64
            type: String
        },
        full: {
            // base64
            type: String
        },
        video: {
            type: String
        }
    },
    urls: {
        src: String,
        dev: String,
        prod: String
    },
    tags: []
});

const Post = mongoose.model('Post', schema);

export default Post
