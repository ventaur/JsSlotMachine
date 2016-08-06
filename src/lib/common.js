export function allElementsAreSame(list) {
    if (list.length < 2) return true;

    const firstElement = list[0];
    for (let index = 1; index < list.length; index++) {
        if (list[index] !== firstElement) {
            return false;
        }
    }

    return true;
}

export function getRandomInteger(min, maxExclusive) {
    return Math.floor(Math.random() * (maxExclusive - min)) + min;
}

export function scaleToRange(value, sourceMin, sourceMax, targetMin, targetMax) {
    const ratio = (value - sourceMin) / (sourceMax - sourceMin);
    return ratio * (targetMax - targetMin) + targetMin;
}