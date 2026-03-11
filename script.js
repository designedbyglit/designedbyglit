window.onload = function(){

const viewer = document.getElementById("viewer");

if(!viewer){
console.log("viewer introuvable");
return;
}

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
75,
viewer.clientWidth / viewer.clientHeight,
0.1,
1000
);

let renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(viewer.clientWidth, viewer.clientHeight);

viewer.appendChild(renderer.domElement);


let light = new THREE.AmbientLight(0xffffff,1);
scene.add(light);


let loader = new THREE.STLLoader();

let mesh;

loader.load("piece.stl", function(geometry){

let material = new THREE.MeshStandardMaterial({
color:0x7a00ff
});

mesh = new THREE.Mesh(geometry, material);

geometry.center();

mesh.scale.set(0.5,0.5,0.5);

scene.add(mesh);

});

camera.position.z = 120;


function animate(){

requestAnimationFrame(animate);

if(mesh){
mesh.rotation.y += 0.01;
}

renderer.render(scene,camera);

}

animate();


// couleurs

const colors = document.querySelectorAll(".color");

colors.forEach(c=>{

c.onclick = function(){

let color = c.dataset.color;

if(mesh){
mesh.material.color.set(color);
}

}

});

}
