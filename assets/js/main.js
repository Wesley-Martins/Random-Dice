import shakeDice from "./CSSClassAdder.js";

const rollBtn = document.getElementById("roll-btn");
const diceAmountInput = document.querySelector(".options-section__number");
const diceTypeBtns = document.querySelectorAll("[data-type-btn]");
const dicesContainer = document.querySelector(".dices__container");

function existingDices() {return document.querySelectorAll(".dices");}

function randomInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

const diceList = [];
function createDice(number) {
    const currentDices = diceList.length;
    const amountToCreate = number - currentDices;
    const amountToDelete =  currentDices - number;

    if(number < currentDices) {
        for(let i = 0; i < amountToDelete; i++) {
            document.querySelector(".dices").remove();
        }

        diceList.splice(0, amountToDelete);
    }
    
    else {
        for(let i = 0; i < amountToCreate; i++) {
            const dice = document.createElement("div");
            dice.innerHTML = 1;
            dice.classList.add("dices");

            diceList.push(dice);
     
            dicesContainer.appendChild(dice)
        }
    }
}
// Cria o dado inicial 
createDice(1);

function changeDiceType() {

    existingDices().forEach(dice => {
        dice.style.backgroundImage = `url(./img/dice-types/d${lastClickedBtn}.png)`;
        dice.innerHTML = 1;
    })
}

let lastClickedBtn;
diceTypeBtns.forEach(button => {

    button.addEventListener("click", (event) => {
        lastClickedBtn = event.target.getAttribute('data-type-btn');

        changeDiceType()  
    })
})

rollBtn.addEventListener("click", () => {

    existingDices().forEach(dice => {
        if(lastClickedBtn) {dice.innerHTML = randomInteger(1, lastClickedBtn)}
    
        else {dice.innerHTML = randomInteger(1, 20)}

        shakeDice(dice);
    })
})

//Valida o input value de acordo com o valor do atributo pattern usando expressão regular
diceAmountInput.addEventListener("beforeinput", (event) => {
    const pattern = new RegExp(event.target.pattern);
    const inputValue = event.target.value + event.data;
    
    if(!pattern.test(inputValue)) {
        event.preventDefault();
    }
})

diceAmountInput.addEventListener("input", function() {
    const number = parseInt(diceAmountInput.value);
    const errorBox = document.getElementById("error-box");
    
    if(number < diceAmountInput.min || number > diceAmountInput.max) {
        errorBox.innerHTML = `Insira um valor entre ${diceAmountInput.min} e ${diceAmountInput.max}.`;
        errorBox.style.display = "inline-block";
    }
    else {
        errorBox.style.display = "none";
        createDice(number);   
        if(lastClickedBtn) {changeDiceType()};
    }
})
