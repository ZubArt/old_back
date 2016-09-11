import Utils from '../core/utils'
const routers = Utils.dirLoader(__dirname);
/**
 * Bind all routers to app
 * @param app it is Express Application
 */
export default app => {
    let keys = Reflect.ownKeys(routers);
    keys.forEach(key => {
        let route = key === 'app' ? '' : key;
        app.use(`/${route}`, routers[key](app.get('logger')))
    })
}
