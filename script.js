let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
75,
400/400,
0.1,
1000
);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(400,400);

document.getElementById("viewer").appendChild(renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,1,1);
scene.add(light);

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

scene.add(mesh);

});

camera.position.z = 100;

function animate(){

requestAnimationFrame(animate);

if(mesh){
mesh.rotation.y += 0.01;
}

renderer.render(scene,camera);

}

animate();


// CHANGEMENT COULEUR

const colors = document.querySelectorAll(".color");

colors.forEach(color=>{

color.addEventListener("click",()=>{

const c = color.dataset.color;

if(mesh){
mesh.material.color.set(c);
}

});

});
