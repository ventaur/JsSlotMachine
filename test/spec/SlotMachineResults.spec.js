import SlotSymbol from '../../src/lib/SlotSymbol';
import SlotMachineResults from '../../src/lib/SlotMachineResults';

describe('SlotMachineResults', () => {
    const availableSymbols = [
        new SlotSymbol('1', 0.5),
        new SlotSymbol('2', 0.4),
        new SlotSymbol('3', 0.3)
    ];

    it('slotCount should equal slotSymbols length', () => {
        const results = new SlotMachineResults(availableSymbols);
        expect(results.slotCount).toEqual(availableSymbols.length);
    });

    it('should prevent changes to slotSymbols property', () => {
        const results = new SlotMachineResults(availableSymbols);
        expect(() => results.slotSymbols.push(availableSymbols[0])).toThrowError(TypeError);
        expect(() => results.slotSymbols[0] = availableSymbols[1]).toThrowError(TypeError);
    });

    describe('isPayout', () => {
        it('should be false if all slotSymbols are different', () => {
            const results = new SlotMachineResults(availableSymbols);
            expect(results.isPayout).toBe(false);
        });

        it('should be false if only some slotSymbols are the same', () => {
            const results1 = new SlotMachineResults([
                availableSymbols[0],
                availableSymbols[0],
                availableSymbols[1]
            ]);
            const results2 = new SlotMachineResults([
                availableSymbols[0],
                availableSymbols[1],
                availableSymbols[1]
            ]);

            expect(results1.isPayout).toBe(false);
            expect(results2.isPayout).toBe(false);
        });

        it('should be true if all slotSymbols are the same', () => {
            const results = new SlotMachineResults([
                availableSymbols[1],
                availableSymbols[1],
                availableSymbols[1]
            ]);
            expect(results.isPayout).toBe(true);
        });
    });
});