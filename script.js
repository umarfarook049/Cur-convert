const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const btn = document.querySelector("form button");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        UpdateFlag(evt.target);
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
    amount.value = "1";   
     }
 console.log(fromcurr.value);
 console.log(tocurr.value);
 const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
 let response = await fetch(url);
 let data = await response.json();
 let rate = data[tocurr.value.toLowerCase()];
 let finalAmt = amtval*rate;
 msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmt} ${tocurr.value}`;
}

const UpdateFlag = (element) => {
    let CurCode = element.value;
    let countryCode = countryList[CurCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});

window.addEventListener("load",() => {
    updateExchangeRate();
})