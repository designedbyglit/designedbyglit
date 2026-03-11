const colors = document.querySelectorAll(".color");
const preview = document.getElementById("preview");
const couleursInput = document.getElementById("couleurs");

let selectedColors = [];

colors.forEach(color => {

color.addEventListener("click", () => {

const name = color.dataset.color;

if(color.classList.contains("selected")){

color.classList.remove("selected");
selectedColors = selectedColors.filter(c => c !== name);

}else{

if(selectedColors.length < 4){

color.classList.add("selected");
selectedColors.push(name);

preview.style.background = window.getComputedStyle(color).backgroundColor;

}else{

alert("Maximum 4 couleurs");

}

}

couleursInput.value = selectedColors.join(", ");

});

});
