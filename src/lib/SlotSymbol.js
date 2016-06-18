export default class SlotSymbol {
    get key() {
        return this._key;
    }

    get odds() {
        return this._odds;
    }

    constructor(key, odds) {
        this._key = key;
        this._odds = odds;
    }

    toString() {
        return `${this.key} @ ${this.odds} odds`;
    }
}