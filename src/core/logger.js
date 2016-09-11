class Logger {
    constructor(name) {
        this._name = name;
    }

    _header() {
        let date = (new Date()).toLocaleString();
        return `${date} - [${this._name}]`
    }

    log(...args) {
        console.log(this._header(), ...args)
    }
    error(...args) {
        console.error(this._header(), ...args)
    }

    makeChild(name) {
        name = `${this.name}/${name}`;
        return new Logger(name)
    }
}

export {Logger}
export default name => new Logger(name)
