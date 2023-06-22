<script>
    import { onMount, afterUpdate } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import CustomGeometry from '$lib/CustomGeometry.svelte'
    import Cannon from 'cannon';
  
    export let cameraPosition = { x: 0, y: 0, z: 5 };
    export let sceneBackgroundColor = 0x000000; // Black color
    export let plane = true; // Exported variable to control adding the plane
    export let useOrbitControls = true; // Exported variable to control using OrbitControls
    export let planeColor = 'papayawhip'

    let renderer, scene, camera, controls;

    export let toggleFog = true;
    export let fogColor = 'papayawhip'
    export let fogCorp = 0.01;
    let physicsWorld;

    export let mapSizeX, mapSizeY;


    
  
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
      if (toggleFog) {
      scene.fog = new THREE.FogExp2(fogColor, fogCorp);
        }
  
      // Lighting setup
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 0);
      scene.add(directionalLight);

      physicsWorld = new Cannon.World();
    physicsWorld.gravity.set(0, -9.82, 0); 

    
  
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
        physicsWorld.step(1 / 60); 
        renderer.render(scene, camera);
      }
      animate();
    });
  
    function addPlane() {
      const geometry = new THREE.PlaneGeometry(mapSizeX, mapSizeY);
      const material = new THREE.MeshBasicMaterial( {color: planeColor, side: THREE.DoubleSide} )
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
      overflow: hidden;
    }
  </style>
  
  <div id="canvas-container">
  </div>

  <slot></slot>
  