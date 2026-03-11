// COULEURS

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

if(couleursInput){
couleursInput.value = selectedColors.join(", ");
}

});

});


// APERÇU IMAGE LOGO

const logoInput = document.getElementById("logoInput");
const logoPreview = document.getElementById("logoPreview");

if(logoInput){

logoInput.addEventListener("change", function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.addEventListener("load", function(){

logoPreview.src = reader.result;
logoPreview.style.display = "block";

});

reader.readAsDataURL(file);

}

});

}


// ROTATION DE LA PIECE

let rotation = 0;

if(preview){

preview.addEventListener("mousemove", (e)=>{

const rect = preview.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;

const rotateX = (y - centerY) / 10;
const rotateY = (centerX - x) / 10;

preview.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

preview.addEventListener("mouseleave", ()=>{

preview.style.transform = "rotateX(0deg) rotateY(0deg)";

});

}
