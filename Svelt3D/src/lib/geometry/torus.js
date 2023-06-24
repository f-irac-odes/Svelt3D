function create(type, texture) {
    let geometry;
    
    if (type === 'box') {
      geometry = new THREE.BoxGeometry(1, 1, 1);
    } else if (type === 'torus') {
      geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 32);
    } else if (type === 'plane') {
      geometry = new THREE.PlaneGeometry(1, 1);
    } else if (type === 'sphere') {
      geometry = new THREE.SphereGeometry(0.5, 32, 32);
    } else if (type === 'cylinder') {
      geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    } else if (type === 'custom') {
      // Add custom geometry creation logic here
    }
    
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const meshObj = new THREE.Mesh(geometry, material);
    scene.add(meshObj);
    
    return {
      geometry,
      material,
      mesh: meshObj
    };
  }
  
  // Example usage:

  
  const box = create('box', texture);
  const torus = create('torus', texture);
  const plane = create('plane', texture);
  const sphere = create('sphere', texture);
  const cylinder = create('cylinder', texture);
  const custom = create('custom', texture);

  export {create}
  