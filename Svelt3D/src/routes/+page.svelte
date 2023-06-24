<script>
    import { onMount } from "svelte";
  import Basic from "../lib/Basic.svelte";
  import * as THREE from 'three'

  let cameraPosition = { x: 0, y: 0, z: 5 };
  let sceneBackgroundColor = 'papayawhip';
  let plane = true;
  let useOrbitControls = true;


  const geometry = new THREE.TorusGeometry();
  const material = new THREE.MeshStandardMaterial({color: 0x00ff00 ,
	metalness: 0.13});
  const torus = new THREE.Mesh(geometry, material);

  let objects = [torus]

</script>

<Basic {cameraPosition} {sceneBackgroundColor} {plane}  {useOrbitControls} {objects}>

</Basic>