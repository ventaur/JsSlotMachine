import SlotMachineEngine from 'lib/SlotMachineEngine';

const engine = new SlotMachineEngine();
const testElement = document.getElementById('results');

for (var count = 0; count < 100; count++) {
    const results = engine.generate();
    const resultsNode = document.createElement('div');
    resultsNode.innerText = results;
    if (results.isPayout) {
        resultsNode.className = 'is-payout';
    }

    testElement.appendChild(resultsNode);
}