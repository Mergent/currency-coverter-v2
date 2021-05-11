import axios from "axios";
export const currenciesService = {
    fetchCurrenciesRates,
};

function fetchCurrenciesRates() {
    const url = `http://data.fixer.io/api/latest?access_key=4c82e41586919c82ed5e90aab33998de`;
    return axios.get(url);
}