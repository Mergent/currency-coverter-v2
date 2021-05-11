export const currenciesUtils = {
    displayCurrencyFormat,
    convertAmount,
    convertRatesTable
};

function displayCurrencyFormat({
    currencyList = [],
    currencyId = "EUR",
    number = 0
}) {
    const displayedCurrency = currencyList.find(currency => currency.id === currencyId).currencyName;
    const formatting = new Intl.NumberFormat("de-DE").format(number);

    return `${formatting} ${displayedCurrency}`;
}

function convertAmount({amount = 0, state = {}, mode = 'from'}) {
    const rate = state.rates[state.convertFrom] / state.rates[state.convertTo];
    let result;
    if (mode === "from") {
        result = amount * rate;
    }
    if (mode === "to") {
        result = amount * (1 / rate);
    }

    return Math.round(result * 1000) / 1000;
}

function convertRatesTable(ratesTable = {}, newBaseCurrency = '') {
    let newRatesTable = {};
    const ratio = 1 / ratesTable[newBaseCurrency];
    for (const [currency, rate] of Object.entries(ratesTable)) {
        newRatesTable[currency] = +(rate * ratio).toFixed(6);
    }

    return newRatesTable;
}