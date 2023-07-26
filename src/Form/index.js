import "./style.css";
import { useState } from 'react';
import { currencies } from "./currencies.js";
import Result from "./Result";

const Form = ({ calculateResult, result }) => {
  const [currencyFrom, setCurrencyFrom] = useState(currencies[0].name);
  const [currencyTo, setCurrencyTo] = useState(currencies[1].name);
  const [amount, setAmount] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    calculateResult (currencyFrom, currencyTo, amount)
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="form__fieldset">
        <p>
          <label>
            <div className="form__amountContainer">
              <span className="form__labelText">
                Amount
              </span>
              <input
                value={amount}
                onChange={({ target }) => setAmount(target.value)}
                className="form__amountField"
                type="number"
                name="amount"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
          </label>
        </p>
        <p>
          <label>
            <div className="form__currenciesContainer">
              <span className="form__labelText form__labelText--currencies">
                From
              </span>
              <select
                className="form__currencyField"
                name="currencyFrom"
                value={currencyFrom.name}
                onChange={({ target }) => setCurrencyFrom(target.value)}
              >
                {currencies.map((currencyFrom => (
                  <option
                    key={currencyFrom.name}
                  >
                    {currencyFrom.name}
                  </option>
                )))}
              </select>
            </div>
          </label>
        </p>
        <p>
          <label>
            <div className="form__currenciesContainer">
              <span className="form__labelText form__labelText--currencies">
                To
              </span>
              <select
                className="form__currencyField"
                name="currencyTo"
                value={currencyTo.name}
                defaultValue="EUR"
                onChange={({ target }) => setCurrencyTo(target.value)}
              >
                {currencies.map((currencyTo => (
                  <option
                    key={currencyTo.name}
                  >
                    {currencyTo.name}
                  </option>
                )))}
              </select>
            </div>
          </label>
        </p>
        <p className="form__currencyRate">
          <span>
            1 PLN
          </span> =
          <span>
            0.22 EUR
          </span>
        </p>
        <Result result={result}/>
        <div className="form__buttonsContainer">
          <p>
            <button 
              className="form__button"
            >
              Convert
            </button>
          </p>
          <p>
            <button
              type="reset"
              className="form__button form__button--reset"
            >
              Reset
            </button>
          </p>
        </div>
      </fieldset>
    </form>
  );
};

export default Form;