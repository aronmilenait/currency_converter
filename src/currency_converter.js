const latestRatesUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

const $baseCurrencySelect = document.querySelector('#baseCurrency');
const $targetCurrencySelect = document.querySelector('#targetCurrency');
const $amountInput = document.querySelector('#amount');
const $calculateBtn = document.querySelector('#calculateBtn');
const $result = document.querySelector('#result');

async function loadCurrencies() {
    try {
        const data = await fetchCurrenciesData();
        populateCurrencyOptions(data.rates);
    } catch (error) {
        console.error('Error: loading currencies', error);
    }
}
async function fetchCurrenciesData() {
    const response = await fetch(latestRatesUrl);
    return await response.json();
}

function populateCurrencyOptions(rates) {
    const currencyOptions = Object.keys(rates);

    for (const currencyCode of currencyOptions) {
        createOptionElement(currencyCode, $baseCurrencySelect);
        createOptionElement(currencyCode, $targetCurrencySelect);
    }
}

function createOptionElement(currencyCode, selectElement) {
    const option = document.createElement('option');
    option.value = currencyCode;
    option.textContent = currencyCode;
    selectElement.appendChild(option);
}

window.addEventListener('load', loadCurrencies);

$calculateBtn.addEventListener('click', async() => {
    try {
        const baseCurrency = $baseCurrencySelect.value;
        const targetCurrency = $targetCurrencySelect.value;
        const amount = parseFloat($amountInput.value);

        if (isNaN(amount)) {
            $result.textContent = 'Please, enter a valid number.';
            return;
        }

        const conversionURL = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
        const response = await fetch(conversionURL);
        const data = await response.json();

        const exchangeRate = data.rates[targetCurrency];
        if (!exchangeRate) {
            $result.textContent = 'Exchange rate not available for the selected target currency.';
            return;
        }

        const convertedAmount = amount * exchangeRate;

        const resultText = `${amount} ${baseCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}`;
        $result.textContent = resultText;
    } catch (error) {
        console.error('Error: fetching currencies', error);
    }
});

