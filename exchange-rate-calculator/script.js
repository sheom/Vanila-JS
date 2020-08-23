const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rates and update the DOM
function calculate(){
    //console.log("RAM");

    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    console.log(currency_one, currency_two);
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data.rates);
        const rate = data.rates[currency_two];
        //console.log(data.rates[currency_two]);
        rateEl.innerText=`1${currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });

}

//Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', ()=> {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

/*
var arr= [1,2,3,4,5,6];

console.log("Original Array: "+arr);
console.log("Array.push(5):"+arr.push(5));
console.log("After push(5) method:"+arr);

console.log("Array pop:"+arr.pop());
console.log("After pop() method:"+arr);

console.log('<><><><><><><>><><><><><><><>><');

console.log("Array unshift(0) method:"+arr.unshift(0));
console.log("After unshift(0) method:"+arr);

console.log('<><><><><><><>><><><><><><><>><');

console.log("Array concat(9,10): "+arr.concat(9,10));
console.log("After concat(): "+arr);


var arr2 = arr.map(x => x*2);
console.log("Afetr map function");
console.log(arr2);
*/