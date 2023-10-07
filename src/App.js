// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function convertCurrency() {
        try {
          setError("");
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency1}&to=${currency2}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          console.log(data);

          setConvertedAmount(data.rates[currency2]);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        }
      }
      convertCurrency();

      return function () {
        controller.abort();
      };
    },
    [amount, currency1, currency2]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={currency1} onChange={(e) => setCurrency1(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {error ? <p>{error}</p> : <p>{convertedAmount}</p>}
    </div>
  );
}
