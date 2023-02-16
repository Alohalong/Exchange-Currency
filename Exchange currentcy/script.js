const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");

const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

const rateText = document.getElementById("rate");
const switchCurrency = document.getElementById("btn");

currency_one.addEventListener("change", calculateMoney);
currency_two.addEventListener("change", calculateMoney);
amount_one.addEventListener("input", calculateMoney);
amount_two.addEventListener("input", calculateMoney);

// const currencyHandler = ()=>{
//     console.log('Ok2')
// }

function calculateMoney() {
  const selectedCurrencyOne = currency_one.value;
  const selectedCurrencyTwo = currency_two.value;
  let urlRate = `https://v6.exchangerate-api.com/v6/16c78d8d8d907dbc14de8ad1/latest/${selectedCurrencyOne}`;
  fetch(urlRate)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[selectedCurrencyTwo];
      rateText.innerText = `1 = ${selectedCurrencyOne} = ${rate} ${selectedCurrencyTwo}`;
      amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

switchCurrency.addEventListener("click", () => {
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  calculateMoney();
});

calculateMoney();
