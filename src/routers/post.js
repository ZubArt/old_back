import { Router } from 'express'

export default parentLogger => {
    let router = new Router();
    let logger = parentLogger.makeChild('postRouter');

    router
        .get('/', (req, res, next) => {
            res.json(req.query)
        })
        .post('/', (req, res, next) => {
            res.json(req.body)
        })
        .put('/:id', (req, res, next) => {
            res.json({
                id: req.params.id,
                body: req.body
            })
        })
        .delete('/:id', (req, res, next) => {
            res.json({
                id: req.params.id,
                body: req.body
            })
        });

    return router
}