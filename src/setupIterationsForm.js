import SlotMachineEngine from 'lib/SlotMachineEngine';

export default function setupIterationsForm() { 
    document.getElementById('iterationsForm').addEventListener('submit', generateIterations);

    function generateIterations(event) {
        event.preventDefault();

        const iterationsElement = document.getElementById('iterations');
        const totalIterations = Number.parseInt(iterationsElement.value);
        const headingElement = document.getElementById('resultsHeading');
        const resultsElement = document.getElementById('results');
        resultsElement.className = 'symbols';
        resultsElement.innerHTML = '';
        headingElement.innerText = `${totalIterations.toLocaleString()} Iterations`;
        
        const engine = new SlotMachineEngine();

        for (let count = 0; count < totalIterations; count++) {
            const results = engine.generate();
            const lineElement = document.createElement('div');

            lineElement.innerText = results;
            if (results.isPayout) {
                const symbol = results.slotSymbols[0];
                const oddsIntensity = 100 - symbol.odds * 100;
                const opacity = 1; 
                lineElement.className = 'is-payout';
                lineElement.style.color = `rgba(0%, 0%, ${oddsIntensity}%, ${opacity})`;
            }

            resultsElement.appendChild(lineElement);
        }
    }
}