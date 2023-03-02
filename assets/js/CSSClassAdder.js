const themeSwipper = document.querySelector(".theme-swipper");
const dropDownBtn = document.querySelector(".dice-type__title-btn");
const typeList = document.querySelector(".dice-type__list");

export default function shakeDice(dice) {
    dice.classList.remove("shake");
    void dice.offsetWidth;//Força o browser a recalcular o layout antes da animação
    dice.classList.add("shake");
}

themeSwipper.addEventListener("click", () => {
    const themeIcon = themeSwipper.firstElementChild;

    document.querySelector("body").classList.toggle("dark-theme");
    themeIcon.classList.toggle("slide-right");
})

dropDownBtn.addEventListener("click", () => {
    typeList.classList.toggle("dropList");
})
