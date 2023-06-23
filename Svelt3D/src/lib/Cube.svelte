<!-- Cube.svelte -->
<script>
    import { getContext } from 'svelte';
    import { onMount } from 'svelte';
    import * as THREE from 'three';

    let cube;
    getContext('canvascontainer').addToScene(cube);
    
  
    onMount(() => {
      // Create a cube and add it to the scene
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      cube = new THREE.Mesh(geometry, material);
    });
  </script>
  
