import { useEffect, useState } from "react";
import useCurrencyRate from "../hooks/useCurrencyRate";
import SelectBox from "./SelectBox";
function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("mmk");
  const [convertedValue, setConvertedValue] = useState(null);
  const { rates, loading, error } = useCurrencyRate(fromCurrency);

  useEffect(() => setConvertedValue(null), [amount, toCurrency, fromCurrency]);

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-sky-400">
      <div className="bg-white max-w-md p-10 rounded-2xl flex flex-col">
        <h2 className="text-2xl font-semibold mb-3">Currency Converter</h2>
        <label htmlFor="input" className="text-gray-400">
          Amount
        </label>
        <input
          type="number"
          min={0}
          className="border p-2.5 rounded-2xl"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              setConvertedValue((amount * rates[toCurrency]).toFixed(2));
            }
          }}
        />
        <div className="flex gap-6">
          <SelectBox
            rates={Object.keys(rates)}
            name={"From"}
            changeHandler={setFromCurrency}
            value={fromCurrency}
          />
          <SelectBox
            rates={Object.keys(rates)}
            name={"To"}
            changeHandler={setToCurrency}
            value={toCurrency}
          />
        </div>
        <div>
          <button
            className="w-full mt-4 bg-sky-400 hover:bg-sky-600 duration-300 rounded-md p-4 cursor-pointer"
            onClick={() => {
              setConvertedValue((amount * rates[toCurrency]).toFixed(2));
            }}
          >
            Convert
          </button>
        </div>
        <div className="mt-4 font-semibold text-xl text-center">
          {!loading && !error && convertedValue === null && (
            <p>Click to convert ...</p>
          )}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && convertedValue !== null && (
            <p>
              {amount} {fromCurrency} ={" "}
              <span className="text-blue-500">
                {convertedValue} {toCurrency}
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CurrencyConverter;
