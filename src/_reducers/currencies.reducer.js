import {currenciesConstants} from "../_constants/currencies.constants";
import { currenciesUtils } from "../_helpers/currencies-utils";

const initialState = {
  rates: {},
  error: "",
  to: 0,
  from: 0,
  convertFrom: "EUR",
  convertTo: "USD",
  isFetched: false,
  baseCurrency: "EUR"
};

export function currency(state = initialState, action) {
  switch (action.type) {
    case currenciesConstants.actions.FETCH_CURRENCIES_RATES:
      const rates = currenciesUtils.convertRatesTable(action.data, state.baseCurrency);
      return {
        ...state,
        rates: rates,
        isFetched: true
      };
    case currenciesConstants.actions.SWITCH_CURRENCIES:
      return {
        ...state,
        to: state.from,
        from: state.to,
        convertTo: state.convertFrom,
        convertFrom: state.convertTo,
      };
    case currenciesConstants.actions.HANDLE_CURRENCY_ERROR:
      return {
        ...state,
        error: action.data
      };
    case currenciesConstants.actions.FROM_CHANGE_INPUT:
      return {
        ...state,
        from: action.data,
        to: action.data
          ? currenciesUtils.convertAmount({ amount: action.data, state, mode: "to" })
          : action.data,

      };
    case currenciesConstants.actions.TO_CHANGE_INPUT:
      return {
        ...state,
        to: action.data,
        from: action.data
          ? currenciesUtils.convertAmount({ amount: action.data, state, mode: "from" })
          : action.data,

      };
    case currenciesConstants.actions.TO_CURRENCY_CHANGE:
      return {
        ...state,
        convertTo: action.data || state.convertTo
      };

    case currenciesConstants.actions.FROM_CURRENCY_CHANGE:
      return {
        ...state,
        convertFrom: action.data || state.convertFrom
      };

    case currenciesConstants.actions.BASE_CURRENCY_CHANGE:
      return {
        ...state,
        baseCurrency: action.data
      };
    default:
      return state || {};
  }
}
