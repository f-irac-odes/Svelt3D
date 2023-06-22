<script>
    import Canvas from '$lib/Canvas.svelte';
    import CustomGeometry from '$lib/CustomGeometry.svelte';
    import * as THREE from 'three'


    let cameraPosition = { x: 1, y: 1, z: 9 };
  let sceneBackgroundColor = 'papayawhip';

  let mapSizeX = 200;
  let mapSizeY = 200;
  
    let plane = true;
    let useOrbitControls = true;
    let planeColor = 'orange'
    let toggleFog = false;

    let fogCorp = 0.01;
    let fogColor = 'white'
</script>
  
  
<Canvas {cameraPosition} {sceneBackgroundColor} {plane} {useOrbitControls} {mapSizeX} {mapSizeY} {planeColor} {toggleFog} {fogColor} {fogCorp}>

    <CustomGeometry
    geometryType="BoxGeometry"
    geometryParams={{ width: 1, height: 1, depth: 1 }}
    material={new THREE.MeshPhongMaterial({ color: 0xff0000 })}
  />

</Canvas>


  


  