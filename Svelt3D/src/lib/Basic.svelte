<script>
  import { onMount, setContext } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

  let renderer, scene, camera, controls;

  let canvascontainer;


  export let cameraPosition = { x: 0, y: 0, z: 5 };
  export let sceneBackgroundColor = 0x000000;
  export let plane = true;
  export let planeColor = 0x000000;
  export let mapSize = {x: 100, z: 100};
  export let useOrbitControls = true;



  onMount(() => {
    
    newScane()
  });

  setContext('canvascontainer', {addToScene});
  function newScane() {
        // Example: Creating a basic scene
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.width, window.height);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    scene = new THREE.Scene();
    const directionalLight = new THREE.DirectionalLight('red', 1);
    
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
     0.1,
      1000
    );

    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    scene.background = new THREE.Color(sceneBackgroundColor);

    if (plane) {
      addPlane(); 
    }

    if (useOrbitControls) {
      addOrbitControls(); 
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
    const container = document.getElementById('canvas-container');
    container.appendChild(renderer.domElement);
  
  }
  function addPlane() {
    const geometry = new THREE.PlaneGeometry(mapSize.x, mapSize.z);
    const material = new THREE.MeshBasicMaterial({color: planeColor, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
  }
  function addOrbitControls() {
    controls = new OrbitControls(camera, renderer.domElement);
  }

  function addToScene(object) {
    scene.add(object)
  }
</script>

<div id="canvas-container" bind:this={canvascontainer}>
  <slot/>
</div>
<style>
  #canvas-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
  }
</style>
