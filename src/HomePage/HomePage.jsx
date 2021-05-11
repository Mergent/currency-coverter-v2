import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {currenciesConstants} from "../_constants/currencies.constants";
import {currenciesActions} from "../_actions/currencies.actions";
import {currenciesUtils} from "../_helpers/currencies-utils";
import {SelectCurrency} from "../_components/SelectCurrency";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.loadCurrenciesRates();
    }

    render() {
        const {
            currency,
            toChangeInput,
            fromChangeInput,
            fromCurrencyChange,
            toCurrencyChange,
            handleSwitch
        } = this.props;
        const currencyAliases = Object.values(currenciesConstants.aliases);

        return (
            <Fragment>
                <h2>ReactJS Redux currency converter</h2>
                {currency.error && <div className="text-danger">{currency.error.message}</div>}
                {!currency.isFetched && !currency.error && <div>Loading...</div>}
                {currency.isFetched && (
                    <div className="mt-3">
                        <div>
                            <p>
                                {currenciesUtils.displayCurrencyFormat({
                                    currencyList: currencyAliases,
                                    currencyId: currency.convertFrom,
                                    number: currency.from
                                })}{" "}
                                equals{" "}
                                <b>
                                    {currenciesUtils.displayCurrencyFormat({
                                        currencyList: currencyAliases,
                                        currencyId: currency.convertTo,
                                        number: currency.to
                                    })}
                                </b>
                            </p>
                        </div>

                        <div className="d-flex mb-3">
                            <input type="number" value={currency.from} onChange={e => fromChangeInput(e.target.value)}/>

                            <SelectCurrency
                                value={currency.convertFrom}
                                onChange={e => fromCurrencyChange(e.target.value)}
                                currencyList={currencyAliases}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleSwitch}> reverse </button>
                        <div className="d-flex mt-3 mb-3">
                            <input type="number" value={currency.to} onChange={e => toChangeInput(e.target.value)}/>
                            <SelectCurrency
                                value={currency.convertTo}
                                onChange={e => toCurrencyChange(e.target.value)}
                                currencyList={currencyAliases}
                            />
                        </div>

                        <a className="btn btn-primary" href="/rates" role="button">Go to personal page</a>
                    </div>
                )}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {currency} = state;
    return {
        currency
    };
}

const mapDispatchToProps = dispatch => ({
    loadCurrenciesRates: () => {
        dispatch(currenciesActions.loadCurrenciesRates());
    },
    toChangeInput: value => {
        dispatch(currenciesActions.toChangeInput(value));
    },
    fromChangeInput: value => {
        dispatch(currenciesActions.fromChangeInput(value));
    },
    fromCurrencyChange: value => {
        dispatch(currenciesActions.fromCurrencyChange(value));
    },
    toCurrencyChange: value => {
        dispatch(currenciesActions.toCurrencyChange(value));
    },
    handleSwitch: value => {
        dispatch(currenciesActions.handleSwitch(value));
    }
});


const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export {connectedHomePage as HomePage};