const colors = document.querySelectorAll(".color");
const preview = document.getElementById("preview");

let selected = [];

colors.forEach(color => {

color.addEventListener("click", () => {

if(color.classList.contains("selected")){

color.classList.remove("selected");
selected = selected.filter(c => c !== color);

}else{

if(selected.length < 4){

color.classList.add("selected");
selected.push(color);

const bg = window.getComputedStyle(color).backgroundColor;
preview.style.background = bg;

}else{

alert("Maximum 4 couleurs");

}

}

});

});