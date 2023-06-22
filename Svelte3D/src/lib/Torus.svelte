<script>
    import * as THREE from 'three'


    const geometry = new THREE.TorusGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
</script>

