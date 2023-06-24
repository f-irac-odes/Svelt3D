<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import * as CANNON from 'cannon-es';

   function add() {
    objects.forEach(object => {
      scene.add(object)
    });
    }  
    export let cameraPosition = { x: 0, y: 0, z: 5 };
    export let sceneBackgroundColor = 0x000000; // Black color
    export let plane = true; // Exported variable to control adding the plane
    export let planeColor;
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

      const world = new CANNON.World();
      world.gravity.set(0, -9.82, 0);

      const groundShape = new CANNON.Plane();
      const groundBody = new CANNON.Body({ mass: 0 });
      groundBody.addShape(groundShape);
      world.addBody(groundBody);

      const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
      const boxBody = new CANNON.Body({ mass: 1 });
      boxBody.addShape(boxShape);
      boxBody.position.set(0, 2, 0);
      world.addBody(boxBody);

      function updatePhysics() {
        // Step the physics simulation
        const fixedTimeStep = 1 / 60; // 60 FPS
        const maxSubSteps = 3; // Maximum number of sub steps per frame
        world.step(fixedTimeStep, fixedTimeStep, maxSubSteps);

        // Update the position and rotation of the Three.js mesh based on the Cannon.js body
        boxMesh.position.copy(boxBody.position);
        boxMesh.quaternion.copy(boxBody.quaternion);
      }

      function animatePhysics() {
        requestAnimationFrame(animatePhysics);

        updatePhysics();
      }

      animatePhysics();
    });
  
    function addPlane() {
      const geometry = new THREE.PlaneGeometry(10, 10);
      const material = new THREE.MeshBasicMaterial({ color: planeColor, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(geometry, material);
      plane.rotateX(Math.PI / 2)
      plane.rotateY(0)
      plane.rotateZ(0)
      scene.add(plane);
    }
    // Create a new physics world
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0); // Set gravity

// Create a fixed time step for physics simulation
  const fixedTimeStep = 1 / 60; // 60 FPS
  const maxSubSteps = 3; // Maximum number of sub steps per frame

// Create a ground plane
  const groundShape = new CANNON.Plane();
  const groundBody = new CANNON.Body({ mass: 0 });
  groundBody.addShape(groundShape);
  world.addBody(groundBody);

  
    function addOrbitControls() {
      controls = new OrbitControls(camera, renderer.domElement);

    }
    function createWorld() {
      
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
  