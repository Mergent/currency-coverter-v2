import React, {Fragment} from "react";

export const CurrencyRatesTable = ({ currencyRates = {}}) => (
    <Fragment>
        <table className="table table-striped mt-3">
            <tbody>
            <tr>
                <th>Currency</th>
                <th>Rate</th>
            </tr>
            {Object.entries(currencyRates).map(([key,value]) => (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </Fragment>
);
