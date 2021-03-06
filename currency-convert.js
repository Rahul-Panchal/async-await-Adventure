//
//http://data.fixer.io/api/latest?access_key=0bbba1f10ae4c09b748e86c425647ee9&format=1
const axios  = require('axios');

// const getExchangeRate = (from , to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=0bbba1f10ae4c09b748e86c425647ee9&format=1').then((response) => {
//         const euro = 1 /response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };
//async version
const getExchangeRate = async (from , to) => {
    try{
      const response = await axios.get('http://data.fixer.io/api/latest?access_key=0bbba1f10ae4c09b748e86c425647ee9&format=1');
      const euro = 1 /response.data.rates[from];
      const rate = euro * response.data.rates[to];

      if(isNaN(rate)){
        throw new Error();
      }

      return rate;
    }catch(e){
      throw new Error(`\nSomething went wrong while fetching the rates for ${from} and ${to}.`);
        //return 'Something went wrong while fetching the rates';
    }
};

// const getCountries = (currencyCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) =>{
//     return response.data.map((country) => country.name );
//   });
// };

//async version
const getCountries = async (currencyCode) => {
  try{
    var response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
      return response.data.map((country) => country.name );
  }catch(e){
    throw new Error(`\nSomething went wrong while fetching the countries using ${currencyCode}.`);
  }
};

// const convertCurrency = (from ,  to,  amount) => {
//   let convertedAmount;
//   return getExchangeRate(from,to).then((rate) =>{
//     convertedAmount = (amount*rate).toFixed(2);
//     //console.log(convertedAmount);
//     return getCountries(to);
//   }).then((countries) => {
//       //console.log(countries);
//       return `${amount} ${from} is worth ${convertedAmount} ${to}. We can spend it in following countries : ${countries.join(', ')} `;
//   });
// };

//async version
const convertCurrency = async (from ,  to,  amount) => {

  const rate = await getExchangeRate(from,to)
  const countries = await getCountries(to);
  const convertedAmount = (amount*rate).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. We can spend it in following countries : ${countries.join(', ')} `;
};

convertCurrency('USD','EUR',20).then((message) => {
  console.log(message)
}).catch((err) => {
  console.log('Invalid country' , err.message);
});

// const add = async (a, b) => a + b + c;
// const doWork = async () => {
//   try{
//     const result  = await add(8,25);
//     return result;
//   }catch(e){
//     return 'Error found';
//   }
// };
//
// doWork().then((data) => {
//   console.log(data);
// }).catch((e) => {
//   console.log('Something went wrong');
// })
// getCountries('INR').then((countries)=> {
//   console.log(countries);
// });
//
// getExchangeRate('USD','CAD').then((rate) => {
//   console.log(rate);
// });
