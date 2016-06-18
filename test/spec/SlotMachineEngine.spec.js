import SlotMachineEngine from '../../src/lib/SlotMachineEngine';
import SlotSymbol from '../../src/lib/SlotSymbol';

describe('SlotMachineEngine', () => {
    describe('with default constructor', () => {
        it('uses defaultSymbols for availableSymbols', () => {
            const engine = new SlotMachineEngine();
            expect(engine.availableSymbols).toBe(SlotMachineEngine.defaultSymbols);
        });

        describe('generate', () => {
            const availableSymbols = SlotMachineEngine.defaultSymbols;
            let engine;

            beforeEach(() => {
                engine = new SlotMachineEngine();
            });

            it('returns random symbols when initial slots do not match', () => {
                const randomSymbols = [
                    availableSymbols[0],
                    availableSymbols[1],
                    availableSymbols[2]
                ]; 
                spyOn(SlotMachineEngine, 'getRandomElement').and.returnValues(
                    randomSymbols[0],
                    randomSymbols[1],
                    randomSymbols[2]
                );
                
                const generatedSymbols = engine.generate().slotSymbols;
                expect(generatedSymbols).toEqual(randomSymbols);
            });

            it('returns the same symbols when initial slots match and the odds are made', () => {
                const sameSymbols = [
                    availableSymbols[0],
                    availableSymbols[0],
                    availableSymbols[0]
                ]; 
                spyOn(SlotMachineEngine, 'getRandomElement').and.returnValues(
                    sameSymbols[0],
                    sameSymbols[1]
                );
                spyOn(SlotMachineEngine, 'shouldPayout').and.returnValue(true);

                const generatedSymbols = engine.generate().slotSymbols;
                expect(generatedSymbols).toEqual(sameSymbols);
            });            
        });
    });

    it('generate uses custom symbols passed to contructor', () => {
        const availableSymbols = [
            new SlotSymbol('Good', 0.75),
            new SlotSymbol('Bad', 0.25),
            new SlotSymbol('Ugly', 0.000001)
        ];
        const engine = new SlotMachineEngine(availableSymbols);
        const generatedSymbols = engine.generate().slotSymbols;
        
        const areGeneratedFromAvailable = generatedSymbols.every(
            genSymbol => availableSymbols.find(
                availSymbol => availSymbol === genSymbol
            )
        );
        expect(areGeneratedFromAvailable).toBe(true);
    });
    

    describe('support | ', () => {
        // NOTE: This is all basically impossible to test with 100% assurance.
        // * Therefore, we have this section of tests disabled by default.
        /* eslint-disable no-console */
        xdescribe('random stuff | ', () => {
            // Here we are taking a decent-sized set of "random" selections 
            // and making sure they at least yield 1 difference (usually).
            it('getRandomElement should usually return different element after several calls', () => {
                const list = [ 'one', 'two', 'three', 'four', 'five', 'six' ];
                
                const results = [];
                for (let index = 0; index < 100; index++) {
                    results.push(SlotMachineEngine.getRandomElement(list));
                }

                expect(SlotMachineEngine.allElementsAreSame(results)).toBe(false);
                console.log('getRandomElement: ', results);
            });
        
            // This one is trickier still. We use the odds of the symbols to determine how often we expect a payout.
            // The theory is that it should occur after trying for four times the odds.
            it('shouldPayout should usually return true after four times as many calls as the odds indicate', () => {
                const oddsMultiplier = 4;
                const symbols = [
                    new SlotSymbol('half', 0.5),
                    new SlotSymbol('quarter', 0.25),
                    new SlotSymbol('sixteenth', 0.0625)
                ];
                for(let symbol of symbols) {
                    const callsNecessary = Math.floor((1 / symbol.odds) * oddsMultiplier);
                    
                    const results = [];
                    for (let index = 0; index < callsNecessary; index++) {
                        results.push(SlotMachineEngine.shouldPayout(symbol));
                    }

                    expect(results).toContain(true);
                    console.log('shouldPayout for ', symbol, ': ', results);
                }
            });
        });
        /* eslint-enable no-comment */

        describe('getFinalSymbol', () => {
            const availableSymbols = SlotMachineEngine.defaultSymbols;
            
            it('(for all different currentSymbols) should call getRandomElement with all availableSymbols', () => {
                const currentSymbols = availableSymbols.slice(0, 2);
                spyOn(SlotMachineEngine, 'getRandomElement');
                SlotMachineEngine.getFinalSymbol(availableSymbols, currentSymbols);

                expect(SlotMachineEngine.getRandomElement).toHaveBeenCalledWith(availableSymbols);
            });

            describe('(for all the same currentSymbols)', () => {
                const sameSymbols = [
                    availableSymbols[0],
                    availableSymbols[0]
                ];
    
                it('should call shouldPayout', () => {
                    spyOn(SlotMachineEngine, 'shouldPayout');
                    SlotMachineEngine.getFinalSymbol(availableSymbols, sameSymbols);

                    expect(SlotMachineEngine.shouldPayout).toHaveBeenCalledWith(sameSymbols[0]);
                });

                it('should return same symbol when shouldPayout returns true', () => {
                    spyOn(SlotMachineEngine, 'shouldPayout').and.returnValue(true);
                    const finalSymbol = SlotMachineEngine.getFinalSymbol(availableSymbols, sameSymbols);
                    
                    expect(finalSymbol).toBe(sameSymbols[0]);
                });

                it('should call getRandomElement without sameSymbols when shouldPayout returns false', () => {
                    spyOn(SlotMachineEngine, 'shouldPayout').and.returnValue(false);
                    spyOn(SlotMachineEngine, 'getRandomElement');
                    SlotMachineEngine.getFinalSymbol(availableSymbols, sameSymbols);

                    expect(SlotMachineEngine.getRandomElement).toHaveBeenCalledWith(availableSymbols.slice(1));
                });
            });
        });
    });
});