import { allElementsAreSame } from './common';

export default class SlotMachineResults {
    get isPayout() {
        return this._isPayout;
    }

    get slotCount() {
        return this._slotSymbols.length;
    }
    
    get slotSymbols() {
        return this._slotSymbols;
    }

    constructor(slotSymbols) {
        this._slotSymbols = slotSymbols;
        Object.freeze(this._slotSymbols);

        this._isPayout = allElementsAreSame(this._slotSymbols); 
    }

    toString() {
        let output = this.isPayout ? '✓' : '✗';
        for (const symbol of this.slotSymbols) {
            output += ` | ${symbol.key} `;
        }

        return output + ' |';
    }
}