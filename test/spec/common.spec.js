import { allElementsAreSame } from '../../src/lib/common';

describe('allElementsAreSame', () => {
    it('should return true for 1 item', () => {
        const list = [ 'test' ];
        expect(allElementsAreSame(list)).toBe(true);
    });
    
    it('should return false if items are not same', () => {
        const list = [ 'test', 'other' ];
        expect(allElementsAreSame(list)).toBe(false);
    });

    it('should return true if items are same', () => {
        const list = [ 'test', 'test', 'test', 'test', 'test' ];
        expect(allElementsAreSame(list)).toBe(true);
    });
    
    it('should return false if even one item is different', () => {
        const list = [ 'test', 'test', 'test', 'test', 'other' ];
        expect(allElementsAreSame(list)).toBe(false);
    });
});