import {
  Fieldset,
  Container,
  CurrenciesContainer,
  ButtonsContainer,
  LabelText,
  Input,
  Select,
  Button,
  ResetButton
} from "./styled";
import { useState } from "react";
import Result from "./Result";
import Rate from "./Rate";
import Loading from "./Loading";
import Failure from "./Failure";
import Header from "./Header";
import Clock from "./Clock";
import Footer from "./Footer"
import { useAPIRates } from "./useAPIRates";
import { currencyLabels } from "./currencyLabels"

const Form = () => {
  const { APIRates, error } = useAPIRates();

  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("PLN");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const calculateRate = (currencyFrom, currencyTo) => {
    if (!APIRates.rates) {
      return 0;
    }

    const rateFrom = 1 / APIRates.rates[currencyFrom];
    const rateTo = 1 / APIRates.rates[currencyTo];

    return rateFrom / rateTo;
  };

  const calculateResult = (currencyFrom, currencyTo, amount) => {
    const rate = calculateRate(currencyFrom, currencyTo);

    setResult({
      sourceAmount: +amount,
      calculatedAmount: rate * amount,
      currencyFrom,
      currencyTo,
    });
  };

  const rate = calculateRate(currencyFrom, currencyTo);

  const onSubmit = (event) => {
    event.preventDefault();
    calculateResult(currencyFrom, currencyTo, amount)
  };

  const onReset = () => {
    setCurrencyFrom("EUR");
    setCurrencyTo("PLN");
    setAmount("");
  };

  if (error) {
    return <Failure />;
  }

  if (!APIRates.rates) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <Clock />
      <form onSubmit={onSubmit}>
        <Fieldset>
          <label>
            <Container>
              <LabelText>Amount</LabelText>
              <Input
                value={amount}
                onChange={({ target }) =>
                  setAmount(target.value)}
                type="number"
                name="amount"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </Container>
          </label>
          <label>
            <CurrenciesContainer>
              <LabelText>From</LabelText>
              <Select
                name="currencyFrom"
                value={currencyFrom}
                onChange={({ target }) =>
                  setCurrencyFrom(target.value)}
              >
                {!!APIRates.rates &&
                  Object.keys(APIRates.rates).map((currency => (
                    <option
                      key={currency}
                      value={currency}
                    >
                      {currencyLabels[currency]}
                    </option>
                  )))}
              </Select>
            </CurrenciesContainer>
          </label>
          <label>
            <CurrenciesContainer>
              <LabelText>To</LabelText>
              <Select
                name="currencyTo"
                value={currencyTo}
                onChange={({ target }) => setCurrencyTo(target.value)}
              >
                {!!APIRates.rates &&
                  Object.keys(APIRates.rates).map((currency => (
                    <option
                      key={currency}
                      value={currency}
                    >
                      {currencyLabels[currency]}
                    </option>
                  )))}
              </Select>
            </CurrenciesContainer>
          </label>
          <Rate
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            rate={rate}
          />
          <Result result={result} />
          <ButtonsContainer>
            <Button>
              Convert
            </Button>
            <ResetButton onClick={onReset}>
              Reset
            </ResetButton>
          </ButtonsContainer>
        </Fieldset>
      </form>
      <Footer date={APIRates.date} />
    </>
  );
};

export default Form;