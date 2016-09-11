import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import httpLogger from 'morgan'
import {logger} from './core'

import routers from './routers'

const hosts = ['::', '127.0.0.1'];

class Application {
    constructor(name, config) {
        this.config = config;

        this.logger = logger(`app_${name}`);

        const app = this.app = express();

        app.use(httpLogger('dev'))
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(bodyParser.json())
            .use(express.static(path.join(__dirname, 'public')))
            .use((err, req, res, next) => {
                res.json({
                    code: err.status,
                    message: err.message
                })
            })
        ;

        app.set("logger", this.logger);
        routers(app);
    }
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
