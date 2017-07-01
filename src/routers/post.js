import { Router } from 'express'
import { ObjectId } from 'mongodb'
const Post = app.models.Post;

export default parentLogger => {
    let router = new Router();
    let logger = parentLogger.makeChild('routers/post');

    function update(req, res, next) {
        let id = req.params.id;

        logger.log(`update ${id} or add new post`);
        Post.findById(id)
            .exec()
            .then(item => {
                if (item) {
                    Reflect.ownKeys(req.body)
                        .forEach(key => item[key] = req.body[key])
                }
                else {
                    item = new Post(req.body)
                }

                return item.save().then(item => res.json(item))
            })
            .catch(next)
    }

    function deleteItem(req, res, next) {
        logger.log('delete post(s)');
        let promise = req.params.id
            ? Post.findByIdAndRemove(req.params.id)
            : req.body.ids
                ? Post.remove({_id: {$in: req.body.ids.map(ObjectId)}})
                : null
        ;

        if (!promise) {
            throw Error("Not found id or ids values!");
        }

        promise.then(() => res.json({
            code: 0,
            message: "done"
        })).catch(next)
    }

    router.use((req, res, next) => {
            res.logger = logger;
            next()
        })
        .get('/', (req, res, next) => {
            logger.log('select all post');

            Post.find({})
                .exec()
                .then(data => {
                    res.json(data)
                })
                .catch(next)
        })
        .get('/tags', (req, res, next) => {
            logger.log('select all tags');

            Post.distinct("tags")
                .exec()
                .then(data => {
                    console.log(data);
                    res.json(data)
                })
                .catch(next)
        })
        .post('/', update)
        .put('/:id', update)
        .post('/delete', deleteItem)
        .delete('/:id', deleteItem);

    return router
}