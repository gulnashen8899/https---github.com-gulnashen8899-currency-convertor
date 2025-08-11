const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdowns= document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");



for (let select of dropdowns){
    for(currCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newoption.selected="selected";
        }else if
            (select.name === "to" && currCode === "INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
};



const updateExchangeRate= async() =>{
    let amount= document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<0){
        amtVal=1;
        amount.value="1";
    }

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();

let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
 let finalamount = (amtVal * rate).toFixed(2);
// let rate = data[toCurr.value.toLowerCase()];
// let finalamount= amtVal * rate;
msg.innerText=`${amtVal} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;

}


const updateflag=(element) =>{
  let currCode=element.value;
  let countrycode= countryList[currCode];
  let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img =  element.parentElement.querySelector("img");
   img.src=newSrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
 updateExchangeRate();
});
