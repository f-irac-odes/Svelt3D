<script>
  import Basic from "../lib/Basic.svelte";
  import Cube from "../lib/Cube.svelte";


  let cameraPosition = { x: 0, y: 0, z: 5 };
  let sceneBackgroundColor = 'papayawhip';
  let plane = true;
  let useOrbitControls = true;
</script>

<Basic {cameraPosition} {sceneBackgroundColor} {plane} {useOrbitControls}>
  <Cube></Cube>
</Basic>