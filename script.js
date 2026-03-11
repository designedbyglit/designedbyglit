let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
75,
400 / 400,
0.1,
1000
);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400,400);

document.getElementById("viewer").appendChild(renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,1,1);
scene.add(light);

let light2 = new THREE.AmbientLight(0xffffff,0.6);
scene.add(light2);

let loader = new THREE.STLLoader();

let mesh;

loader.load("piece.stl", function(geometry){

let material = new THREE.MeshStandardMaterial({
color:0x7a00ff,
metalness:0.3,
roughness:0.4
});

mesh = new THREE.Mesh(geometry,material);

geometry.center();

mesh.scale.set(0.5,0.5,0.5);

scene.add(mesh);

});

camera.position.z = 120;


// animation

function animate(){

requestAnimationFrame(animate);

if(mesh){
mesh.rotation.y += 0.01;
}

renderer.render(scene,camera);

}

animate();


// rotation souris

let mouseDown = false;

renderer.domElement.addEventListener("mousedown", ()=>{
mouseDown = true;
});

renderer.domElement.addEventListener("mouseup", ()=>{
mouseDown = false;
});

renderer.domElement.addEventListener("mousemove",(e)=>{

if(!mouseDown || !mesh) return;

mesh.rotation.y += e.movementX * 0.01;
mesh.rotation.x += e.movementY * 0.01;

});


// couleurs

const colors = document.querySelectorAll(".color");

colors.forEach(c=>{

c.addEventListener("click",()=>{

const color = c.getAttribute("data-color");

if(mesh){
mesh.material.color.set(color);
}

});

});
