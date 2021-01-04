import Zdog from 'zdog';
import { MAX_COORD } from './constants.json'

const createInitShape = () => {
    console.log(111);

}

const createMesh = (illo) => {
    console.log('createMesh');
    const mesh = new Zdog.Group({
        addTo: illo,
        translate: { z: 20 },
      });
      // x-axis, x-axis, z-axis
      new Zdog.Shape({
        addTo: mesh,
        path: [
          { x: -MAX_COORD },
          { x:  MAX_COORD },
          {move: { y: -MAX_COORD }},
          { y:  MAX_COORD },
          {move: { z: -MAX_COORD }},
          { z:  MAX_COORD },
        ],
        color: '#636',
      });      
      return mesh;
}

export {
    createInitShape,
    createMesh
}