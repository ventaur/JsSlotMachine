import SlotMachineEngine from 'lib/SlotMachineEngine';

const engine = new SlotMachineEngine();
const testElement = document.getElementById('results');

for (var count = 0; count < 100; count++) {
    const results = engine.generate();
    const resultsNode = document.createElement('div');

    resultsNode.innerText = results;
    if (results.isPayout) {
        const symbol = results.slotSymbols[0];
        resultsNode.className = 'is-payout';
        resultsNode.style.color = `rgb(${100 - symbol.odds * 100}%, 0%, 0%)`;
    }

    testElement.appendChild(resultsNode);
}