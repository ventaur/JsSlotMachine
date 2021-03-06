import SlotMachineEngine from 'lib/SlotMachineEngine';
import Rx from 'rx';

export default function setupPayoutForm() {
    const maxIterations = 1000001; // Must be set to +1 higher than max.
    const availableSymbols = SlotMachineEngine.defaultSymbols;
    initilizePayoutSymbols();

    document.getElementById('payoutForm').addEventListener('submit', iterateUntilPayout);

    function initilizePayoutSymbols() {
        const symbolSelect = document.getElementById('payoutSymbol');
        for (const symbol of availableSymbols) {
            const option = document.createElement('option');
            option.value = symbol.key;
            option.text = `${symbol.key} (odds: ${symbol.odds})`;
            symbolSelect.options.add(option);
        }
    }

    function iterateUntilPayout(event) {
        event.preventDefault();

        const totalAttempts = getTotalAttempts();
        const symbol = getSelectedSymbol();
        const showIterations = getShowIterations();
        if (totalAttempts === undefined || symbol === undefined) return;

        const resultsElement = document.getElementById('results');
        const headingElement = document.getElementById('resultsHeading');
        resultsElement.className = 'iterations';
        resultsElement.innerHTML = '';
        headingElement.innerText = `Payout Iterations for '${symbol.key}'`;

        const engine = new SlotMachineEngine();
        
        let defaultScheduler = Rx.Scheduler.default;
        for (let attemptCount = 0; attemptCount < totalAttempts; attemptCount++) {
            Rx.Observable.start(function () {
                const messageElement = document.createElement('div');
                messageElement.innerHTML = '? iterations';
                messageElement.className = 'busy';
                resultsElement.appendChild(messageElement);

                let totalIterations = 0;
                Rx.Observable.from(
                    repeatUntilSuccess(
                        () => {
                            const results = engine.generate();
                            return (results.isPayout && results.slotSymbols[0] === symbol);
                        }), null, null, defaultScheduler)
                    .subscribe(
                        function (iterations) {
                            totalIterations = iterations;
                            if (showIterations) {
                                defaultScheduler.schedule(null, function () {
                                    updateMessage(messageElement, totalIterations);
                                });
                            }
                        },
                        function () {
                            messageElement.className = 'failure';
                        },
                        function () {
                            updateMessage(messageElement, totalIterations);
                            messageElement.className = 'success';
                        }
                    );
            });
        }
    }


    function getTotalAttempts() {
        const attemptsInput = document.getElementById('payoutAttempts');
        return Number.parseInt(attemptsInput.value);
    }

    function getSelectedSymbol() {
        const symbolSelect = document.getElementById('payoutSymbol');
        const key = symbolSelect.value.trim();
        if (key === '') return;
        return availableSymbols.find(s => s.key === key);
    }

    function getShowIterations() {
        const showIterationsInput = document.getElementById('payoutShowIterations');
        return showIterationsInput.checked;
    }

    function* repeatUntilSuccess(action) {
        // Something is odd about how Babel translates loops in a generator, 
        // so we *have* to use < instead of <=.
        for (let iterationCount = 1; iterationCount < maxIterations; iterationCount++) {
            let isSuccessful = action();
            if (isSuccessful) {
                return iterationCount;
            } else {
                yield iterationCount;
            }
        }

        throw new Error('"maxIterations" reached.');
    }

    function updateMessage(messageElement, totalIterations) {
        messageElement.innerHTML = '';
        messageElement.innerText = `${totalIterations.toLocaleString()} iterations`;
    }
}