import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {userActions} from '../_actions';
import {currenciesConstants} from "../_constants/currencies.constants";
import {currenciesActions} from "../_actions/currencies.actions";
import {SelectCurrency} from "../_components/SelectCurrency";
import {CurrencyRatesTable} from "../_components/CurrencyRatesTable";

class RatesPage extends React.Component {
    componentDidMount() {
        this.props.getAllUsers();
        this.props.loadCurrenciesRates();
    }

    render() {
        const {
            user,
            users,
            currency,
            handleLogout,
            handleDeleteUser,
            handleBaseCurrencyChange
        } = this.props;
        const currencyAliases = Object.values(currenciesConstants.aliases);

        return (
            <Fragment>
                <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h2>Hello, <b>{user.firstName}</b>!</h2>
                        <button type="button" className="btn btn-primary" onClick={(e) => handleLogout()} role="button">Logout</button>
                    </div>
                    <br/>
                    <h4>Users list</h4>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items &&
                    <ul className="list-group">
                        {users.items.map((user, index) =>
                            <li key={user.id} className="list-group-item d-flex align-items-center justify-content-between">
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ?
                                        <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <button type="button" className="btn btn-danger" onClick={(e) => handleDeleteUser(user.id)}>Delete</button>
                                }
                            </li>
                        )}
                    </ul>
                    }
                    <br/>
                    <div>
                        <a className="btn btn-primary" href="/" role="button">Go to public converter</a>
                        <h4 className="mt-3">You can now select currency and compare it with others</h4>
                        <SelectCurrency
                            value={currency.baseCurrency}
                            onChange={e => handleBaseCurrencyChange(e.target.value)}
                            currencyList={currencyAliases}
                        />
                        <CurrencyRatesTable currencyRates={currency.rates}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {users, authentication, currency} = state;
    const {user} = authentication;
    return {
        user,
        users,
        currency
    };
}

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => {
        dispatch(userActions.getAll());
    },
    handleDeleteUser: value => {
        dispatch(userActions.delete(id));
    },
    handleLogout: () => {
        dispatch(userActions.logout());
        window.location.href = '/login';
    },
    handleBaseCurrencyChange: value => {
        dispatch(currenciesActions.baseCurrencyChange(value));
    },
    loadCurrenciesRates: () => {
        dispatch(currenciesActions.loadCurrenciesRates());
    }
});

const connectedRatesPage = connect(mapStateToProps, mapDispatchToProps)(RatesPage);
export {connectedRatesPage as RatesPage};