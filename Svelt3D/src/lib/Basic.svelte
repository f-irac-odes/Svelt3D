<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

   function add() {
    objects.forEach(object => {
      scene.add(object)
    });
    }  
    export let cameraPosition = { x: 0, y: 0, z: 5 };
    export let sceneBackgroundColor = 0x000000; // Black color
    export let plane = true; // Exported variable to control adding the plane
    export let useOrbitControls = true; // Exported variable to control using OrbitControls
  
    let renderer, scene, camera, controls;
    export let objects = [];
  
    onMount(() => {
      // Renderer setup
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('canvas-container').appendChild(renderer.domElement);
  
      // Scene setup
      scene = new THREE.Scene();
  
      // Camera setup
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  
      // Background color setup
      scene.background = new THREE.Color(sceneBackgroundColor);
  
      // Lighting setup
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 0);
      scene.add(directionalLight);
  
      // Add plane if enabled
      if (plane) {
        addPlane();
      }
  
      // OrbitControls setup if enabled
      if (useOrbitControls) {
        addOrbitControls();
      }
  
      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      const resize = () => {
	      renderer.setSize(window.innerWidth, window.innerHeight);
	      camera.aspect = window.innerWidth / window.innerHeight;
	      camera.updateProjectionMatrix();
      };
      resize();
      animate();
      add();
    });
  
    function addPlane() {
      const geometry = new THREE.PlaneGeometry(10, 10);
      const material = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);
    }
  
    function addOrbitControls() {
      controls = new OrbitControls(camera, renderer.domElement);
      // Add any additional OrbitControls customization here
    }
  
  </script>
 
  
  <style>
    #canvas-container {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
    }
  </style>
  
  <div id="canvas-container"></div>
  