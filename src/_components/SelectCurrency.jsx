import React from "react";

export const SelectCurrency = ({ value, onChange, currencyList = [] }) => (
  <select value={value} onChange={onChange} name="currency-selector" className="form-select">
    {currencyList.map(currency => (
      <option key={currency.id} value={currency.id}>
        {currency.currencyName}
      </option>
    ))}
  </select>
);
