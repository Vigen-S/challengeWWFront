import './App.css';
import Dropdown from "./dropdown/dropdown.component";
import {useEffect, useState} from "react";
import axios from "axios";

const currURL = "http://localhost:8080/currencies";

function App() {

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get(currURL).then((response) => {
      setCurrencies(response.data.currencyList);
    });
  }, []);

  const [curr1, setCurr1] = useState({ currency: '', value: 0 });
  const [curr2, setCurr2] = useState({ currency: '', value: 0 });

  const [inputValues, setInputValues] = useState({ value1: "", value2: ""});

  const convert = (value, curr1, curr2) => {
    return (parseFloat(value) / parseFloat(curr1) * parseFloat(curr2)).toFixed(2);
  }

  return (
    <div className="App">
      <div className="dropdown-wrapper">
      <Dropdown
        onChange={(selected) => {
          axios.get(currURL + `/${selected.currency}`).then((response) => {
            setCurr1({ currency: response.data.currency, value: response.data.value }); // curr
            setInputValues({
              ...inputValues,
              value2: convert(inputValues.value1, selected.value, curr2.value)
            })
          });
        }}
        values={currencies}
        selected={curr1}
      />
        <input type="text" value={inputValues.value1} onChange={(e) => {
          setInputValues({ value1: e.target.value, value2: convert(e.target.value, curr1.value, curr2.value) })
        }} />
      </div>
      <div className="dropdown-wrapper">
      <Dropdown
        onChange={(selected) => {
          axios.get(currURL + `/${selected.currency}`).then((response) => {
            setCurr2({ currency: response.data.currency, value: response.data.value });
            setInputValues({
              ...inputValues,
              value1: convert(inputValues.value2, curr2.value, curr1.value)
            })
          });
        }}
        values={currencies}
        selected={curr2}
      />
        <input type="text" value={inputValues.value2} onChange={(e) => {
          setInputValues({ value2: e.target.value, value1: convert(e.target.value, curr2.value, curr1.value) })
        }} />      </div>

    </div>
  );


}

export default App;
