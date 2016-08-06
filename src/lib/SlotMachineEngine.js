import SlotSymbol from './SlotSymbol';
import SlotMachineResults from './SlotMachineResults';
import { allElementsAreSame, getRandomInteger } from './common';

const DefaultSymbols = [
    new SlotSymbol('cherry', 0.5),
    new SlotSymbol('horseshoe', 0.2),
    new SlotSymbol('lemon', 0.1),
    new SlotSymbol('bell', 0.05),
    new SlotSymbol('watermelon', 0.02),
    new SlotSymbol('seven', 0.01),
    new SlotSymbol('bar', 0.0002)
];

export default class SlotMachineEngine {
    static get defaultSymbols() {
        return DefaultSymbols;
    }

    get availableSymbols() {
        return this._availableSymbols;
    }
    
    get slotCount() {
        return 3;
    }

    constructor(availableSymbols = this.constructor.defaultSymbols) {
        this._availableSymbols = availableSymbols;
    }

    generate() {
        const generatedSymbols = [];

        // Randomly generate symbols for the initial slots (all but the last one).
        const slotCountLessOne = this.slotCount - 1;
        for (let slot = 0; slot < slotCountLessOne; slot++) {
            generatedSymbols.push(this.constructor.getRandomElement(this.availableSymbols));
        }

        // Determine the final symbol, based on already generated ones.
        generatedSymbols.push(this.constructor.getFinalSymbol(this.availableSymbols, generatedSymbols));

        return new SlotMachineResults(generatedSymbols);
    }


    static getFinalSymbol(availableSymbols, currentSymbols) {
        // Special circumstances if all current symbols are the same.
        if (allElementsAreSame(currentSymbols)) {
            // Check for a random payout for the common symbol.
            const commonSymbol = currentSymbols[0];
            if (this.shouldPayout(commonSymbol)) {
                return commonSymbol;
            }

            // Otherwise, get a random symbol from the remaining symbols.
            const remainingSymbols = availableSymbols.filter(s => s !== commonSymbol);
            return this.getRandomElement(remainingSymbols);
        }

        // Otherwise, just get any random symbol.
        return this.getRandomElement(availableSymbols);
    }

    static getRandomElement(list) {
        const randomIndex = getRandomInteger(0, list.length);
        return list[randomIndex];
    }

    static shouldPayout(symbol) {
        // Randomly generate a number and compare to the symbol's odds.
        return Math.random() < symbol.odds;
    }
}