import { useEffect, useState } from "react";

const useCurrencyRate = (fromCurrency) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const fetchRates = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`,
        );
        const data = await fetchRates.json();
        setRates(data[fromCurrency]);
        setError(null);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [fromCurrency]);
  return { rates, loading, error };
};

export default useCurrencyRate;
