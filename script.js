// SCENE 3D

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
400 / 400,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400, 400);

document.getElementById("viewer").appendChild(renderer.domElement);


// LUMIERE

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);
scene.add(light);


// CHARGEMENT STL

const loader = new THREE.STLLoader();

let mesh;

loader.load("piece.stl", function (geometry) {

const material = new THREE.MeshStandardMaterial({
color: 0x7a00ff,
metalness: 0.3,
roughness: 0.4
});

mesh = new THREE.Mesh(geometry, material);

geometry.center();

scene.add(mesh);

});

camera.position.z = 100;


// ROTATION AUTO

function animate() {

requestAnimationFrame(animate);

if (mesh) {
mesh.rotation.y += 0.01;
}

renderer.render(scene, camera);

}

animate();


// ROTATION SOURIS

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

renderer.domElement.addEventListener("mousedown", () => {
isDragging = true;
});

renderer.domElement.addEventListener("mouseup", () => {
isDragging = false;
});

renderer.domElement.addEventListener("mousemove", (event) => {

if (!isDragging || !mesh) return;

let deltaMove = {
x: event.offsetX - previousMousePosition.x,
y: event.offsetY - previousMousePosition.y
};

mesh.rotation.y += deltaMove.x * 0.01;
mesh.rotation.x += deltaMove.y * 0.01;

previousMousePosition = {
x: event.offsetX,
y: event.offsetY
};

});


// COULEURS

const colors = document.querySelectorAll(".color");

colors.forEach(color => {

color.addEventListener("click", () => {

const c = color.dataset.color;

if (mesh) {
mesh.material.color.set(c);
}

});

});
