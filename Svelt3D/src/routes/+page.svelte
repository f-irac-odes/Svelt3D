<script>
    import { onMount } from "svelte";
  import Basic from "../lib/Basic.svelte";
  import * as THREE from 'three'

  let  objectPos = {x : 0, y: 0, z:0}

  let cameraPosition = { x: 0, y: 2, z: 5 };
  let sceneBackgroundColor = 'papayawhip';
  let plane = true;
  let useOrbitControls = true;
  let planeColor = 'orange'


  const geometry = new THREE.TorusGeometry();
  const material = new THREE.MeshStandardMaterial({color: 0x00ff00 ,
	metalness: 1});
  const torus = new THREE.Mesh(geometry, material);

  let objects = [torus]
  torus.position.set(1, 2, 3)
    
</script>


<Basic {cameraPosition} {sceneBackgroundColor} {plane} {planeColor} {useOrbitControls} {objects}>

</Basic>
