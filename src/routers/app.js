import { Router } from 'express'
import packageInfo from '../../package.json'

export default parentLogger => {
    let router = new Router();
    let logger = parentLogger.makeChild('appRouter');

    router
        .get('/', (req, res, next) => {
            res.json({
                version: packageInfo.version
            })
        });

    return router
}