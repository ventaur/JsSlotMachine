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