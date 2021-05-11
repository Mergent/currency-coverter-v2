import {currenciesConstants} from "../_constants/currencies.constants";
import {currenciesService} from "../_services/currencies.service";


export const currenciesActions = {
    handleCurrencyError,
    handleSwitch,
    loadCurrenciesRates,
    fromChangeInput,
    fromCurrencyChange,
    toChangeInput,
    toCurrencyChange,
    baseCurrencyChange
};


function handleCurrencyError(data) {
    return {
        type: currenciesConstants.actions.HANDLE_CURRENCY_ERROR,
        data
    };
}

function handleSwitch(data) {
    return {
        type: currenciesConstants.actions.SWITCH_CURRENCIES,
        data
    };
}

function loadCurrenciesRates() {
    return dispatch => {
        currenciesService.fetchCurrenciesRates()
            .then(result => {
                const currenciesData = result.data;
                currenciesData.rates['EUR'] = 1;
                return dispatch({
                    type: currenciesConstants.actions.FETCH_CURRENCIES_RATES,
                    data: currenciesData.rates
                });
            })
            .catch(error => {
                dispatch(currenciesActions.handleCurrencyError(error));
            });
    };
}

function fromChangeInput(data) {
    return {
        type: currenciesConstants.actions.FROM_CHANGE_INPUT,
        data
    };
}

function toChangeInput(data) {
    return {
        type: currenciesConstants.actions.TO_CHANGE_INPUT,
        data
    };
}

function baseCurrencyChange(newBaseCurrency) {
    return dispatch => {
        currenciesService.fetchCurrenciesRates()
            .then(res => {
                dispatch({
                    type: currenciesConstants.actions.BASE_CURRENCY_CHANGE,
                    data: newBaseCurrency
                });
                dispatch({
                    type: currenciesConstants.actions.FETCH_CURRENCIES_RATES,
                    data: res.data.rates
                });
            })
            .catch(error => {
                dispatch(currenciesActions.handleCurrencyError(error));
            });
    };
}


function toCurrencyChange(newCurrencyTo) {
    return (dispatch, getState) => {
        currenciesService.fetchCurrenciesRates()
            .then(res => {
                dispatch({
                    type: currenciesConstants.actions.FETCH_CURRENCIES_RATES,
                    data: res.data.rates
                });

                dispatch({
                    type: currenciesConstants.actions.TO_CURRENCY_CHANGE,
                    data: newCurrencyTo
                });

                dispatch({
                    type: currenciesConstants.actions.FROM_CHANGE_INPUT,
                    data: getState().currency.from
                });
            })
            .catch(error => {
                dispatch(currenciesActions.handleCurrencyError(error));
            });
    };
}

function fromCurrencyChange(newCurrencyFrom) {
    return (dispatch, getState) => {
        currenciesService.fetchCurrenciesRates()
            .then(res => {
                dispatch({
                    type: currenciesConstants.actions.FETCH_CURRENCIES_RATES,
                    data: res.data.rates
                });

                dispatch({
                    type: currenciesConstants.actions.FROM_CURRENCY_CHANGE,
                    data: newCurrencyFrom
                });

                dispatch({
                    type: currenciesConstants.actions.FROM_CHANGE_INPUT,
                    data: getState().currency.from
                });
            })
            .catch(error => {
                dispatch(currenciesActions.handleCurrencyError(error));
            });
    };
}