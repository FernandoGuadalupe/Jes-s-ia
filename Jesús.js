// Configuración del Avatar 3D de Jesús
let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('avatarContainer').appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Añadir una luz ambiental
    let light = new THREE.AmbientLight(0x404040); 
    scene.add(light);
    
    // Crear un cubo para el avatar (esto puede ser sustituido por un modelo 3D real)
    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}

// Iniciar la escena 3D
init();

// Reconocimiento de voz para interactuar
if (annyang) {
    let commands = {
        'hola jesus': function() {
            document.getElementById('response').innerText = "¡Hola, hijo mío! ¿En qué puedo ayudarte hoy?";
        },
        'como estas': function() {
            document.getElementById('response').innerText = "Estoy en paz, gracias por preguntar.";
        }
    };
    
    annyang.addCommands(commands);
    annyang.start();
}

// Interacción por texto (Preguntar)
document.getElementById('askButton').addEventListener('click', function() {
    let question = document.getElementById('userInput').value.trim().toLowerCase();
    
    let response = '';
    
    // Respuestas predeterminadas de Jesús basadas en sus enseñanzas
    if (question.includes("amor")) {
        response = "El amor es el mandamiento más importante. Ama a tu prójimo como a ti mismo.";
    } else if (question.includes("perdón")) {
        response = "Perdona a tus enemigos, porque el perdón trae paz al corazón.";
    } else if (question.includes("reino de dios")) {
        response = "El Reino de Dios está cerca, y se encuentra en el corazón de todos los que buscan la verdad.";
    } else {
        response = "Pregunta algo más sobre amor, perdón o el Reino de Dios.";
    }
    
    document.getElementById('response').innerText = response;
});
