class Logger {
    constructor(name) {
        this._name = name;
    }

    _header() {
        let date = (new Date()).toLocaleString();
        return `${date} - [${this._name}]`
    }

    /**
     * @param args
     */
    log(...args) {
        console.log(this._header(), ...args)
    }

    /**
     * @param args
     */
    error(...args) {
        console.error(this._header(), ...args)
    }

    /**
     * Makes new Logger with appending the new name to the current name.
     * @param name
     * @return {Logger}
     */
    makeChild(name) {
        name = `${this._name}/${name}`;
        return new Logger(name)
    }
}

export {Logger}
export default name => new Logger(name)
