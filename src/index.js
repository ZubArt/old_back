import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import httpLogger from 'morgan'
import {logger} from './core'
import sendError from './helpers/middleware/sendError'

import routers from './routers'

const hosts = ['::', '127.0.0.1'];

class Application {
    /**
     * @param name
     * @param config
     */
    constructor(name, config) {
        this.config = config;

        this.logger = logger(`app_${name}`);

        const app = this.app = express();

        app.use(httpLogger('dev'))
            .use(sendError)
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(bodyParser.json())
            .use(express.static(path.join(__dirname, 'public')))
        ;

        app.set("logger", this.logger);
        routers(app);

        // must initialize after routers
        app.use(function(err, req, res, next) {
            const logger = res.logger || this.logger;
            logger.error(err);
            res.sendError(err)
        })
    }

    /**
     * @param port
     * @return {*|http.Server}
     */
    run(port) {

        port = port || this.config.get('port') || process.env.PORT || 3000;

        this.app.set('port', port);
        const server = this.app.listen(this.app.get('port'), () => {
            const addr = server.address();
            const host = hosts.includes(addr.address) ? 'localhost' : addr.address;
            this.logger.log(`Server listens http://${host}:${addr.port}`)
        });
        return server
    }
}

export {Application}
export default (name, config) => new Application(name, config)
