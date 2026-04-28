import { useState } from "react";

const useCurrencyRate = (fromCurrency) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getData = async () => {
    try {
      const fetchRates = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`,
      );
      const data = await fetchRates.json();
      setRates(data[fromCurrency]);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  getData();
  return { rates, loading, error };
};

export default useCurrencyRate;
