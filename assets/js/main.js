const themeSwipper = document.querySelector(".theme-swipper");
const optionsForm = document.querySelector(".options-form");
const rollBtn = document.getElementById("roll-btn");
const diceAmountInput = document.querySelector(".options-form__number");
const diceTypeBtns = document.querySelectorAll("[data-type-btn]");
const dicesContainer = document.querySelector(".dices__container");

function existingDices() {return document.querySelectorAll(".dices");}

function randomInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shakeDice(dice) {
    dice.classList.remove("shake");
    void dice.offsetWidth;//Força o browser a recalcular o layout antes da animação
    dice.classList.add("shake");
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
    const dices = existingDices();

    dices.forEach(dice => {
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
    const dices = existingDices();

    dices.forEach(dice => {
        if(lastClickedBtn) {dice.innerHTML = randomInteger(1, lastClickedBtn)}
    
        else {dice.innerHTML = randomInteger(1, 20)}

        shakeDice(dice);
    })
})

diceAmountInput.addEventListener("input", function() {
    const number = parseInt(diceAmountInput.value);
    
    const errorBox = document.getElementById("error-box");
    if(number < diceAmountInput.min || number > diceAmountInput.max) {
        errorBox.innerHTML = `Por favor, insira um valor entre ${diceAmountInput.min} e ${diceAmountInput.max}.`
        errorBox.style.display = "grid";
    }

    else {
        errorBox.style.display = "none";
        createDice(number);   
        if(lastClickedBtn) {changeDiceType()};
    }
})

themeSwipper.addEventListener("click", () => {
    const themeIcon = themeSwipper.firstElementChild;
    document.querySelector("body").classList.toggle("dark-theme");

    if(themeIcon.classList.contains("slide-right")){
        themeIcon.classList.remove("slide-right");
        void themeIcon.offsetWidth;
        themeIcon.classList.add("slide-left");
    }
    else {
        themeIcon.classList.remove("slide-left");
        void themeIcon.offsetWidth;
        themeIcon.classList.add("slide-right");
    }
})
