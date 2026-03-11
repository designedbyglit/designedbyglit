let scene, camera, renderer, mesh, controls;

init();
animate();

function init(){

const viewer = document.getElementById("viewer");

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
75,
viewer.clientWidth / viewer.clientHeight,
0.1,
1000
);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
viewer.appendChild(renderer.domElement);


// lumières

const light1 = new THREE.DirectionalLight(0xffffff,1);
light1.position.set(1,1,1);
scene.add(light1);

const light2 = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light2);


// chargement STL

const loader = new THREE.STLLoader();

loader.load("piece.stl", function(geometry){

const material = new THREE.MeshStandardMaterial({
color:0x7a00ff,
metalness:0.3,
roughness:0.4
});

mesh = new THREE.Mesh(geometry, material);

geometry.center();

mesh.scale.set(0.6,0.6,0.6);

scene.add(mesh);

});


camera.position.z = 120;


// CONTROLES SOURIS

controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableZoom = true;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;

}


// animation

function animate(){

requestAnimationFrame(animate);

if(controls){
controls.update();
}

renderer.render(scene,camera);

}


// gestion couleurs

let selectedColors = [];

const colors = document.querySelectorAll(".color");

colors.forEach(color=>{

color.addEventListener("click",()=>{

const c = color.dataset.color;

if(selectedColors.includes(c)){

selectedColors = selectedColors.filter(x => x !== c);
color.classList.remove("selected");

}else{

if(selectedColors.length < 4){

selectedColors.push(c);
color.classList.add("selected");

}

}

if(mesh){

mesh.material.color.set(selectedColors[0] || "#7a00ff");

}

});

});
