import fs from 'fs'

export default class Utils {
    /**
     * Loads all modules from dirname
     * @param {String} dirname
     * @param {Boolean} capitalLetter
     * @return {{}}
     */
    static dirLoader(dirname, capitalLetter) {
        let files = fs.readdirSync(dirname);

        const res = {
        };

        files.map(file => {
            if (file === "index.js")
                return;

            let key = file.replace(/\.js$/, '');
            if (capitalLetter) {
                key = key.charAt(0).toUpperCase() + key.slice(1);
            }

            res[key] = require(`${dirname}/${key}`);
            res[key] = res[key].default;
        });

        return res
    }
}