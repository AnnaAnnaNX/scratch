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

const createItem = (illo) => {
    // const group = new Zdog.Group({
    //     addTo: illo,
    //     translate: { z: 20 },
    //   });
    //   // eye white first
    //   new Zdog.Ellipse({
    //     addTo: group,
    //     width: 160,
    //     height: 80,
    //   });
    //   // then iris
    //   new Zdog.Ellipse({
    //     addTo: group,
    //     diameter: 70,
    //   });
    //   return group;

    const gold = '#EA0';
    const garnet = '#C25';
    const eggplant = '#636';

    const group = new Zdog.Group({
        addTo: illo,
        translate: { z: 20 },
    });

    var hipX = 3;
    // hips
    var hips = new Zdog.Shape({
      addTo: group,
      path: [ { x: -hipX }, { x: hipX } ],
      translate: { y: 2 },
      stroke: 4,
      color: eggplant,
    });
    
    // ----- legs ----- //
    
    var leg = new Zdog.Shape({
      addTo: hips,
      path: [ { y: 0 }, { y: 12 } ],
      translate: { x: -hipX },
      rotate: { x: Zdog.TAU/4 },
      color: eggplant,
      stroke: 4,
    });
    
    // foot
    var foot = new Zdog.RoundedRect({
      addTo: leg,
      width: 2,
      height: 4,
      cornerRadius: 1,
      translate: { y: 14, z: 2 },
      rotate: { x: Zdog.TAU/4 },
      color: garnet,
      fill: true,
      stroke: 4,
    });
    
    var standLeg = leg.copy({
      translate: { x: hipX },
      rotate: { x: -Zdog.TAU/8 },
    });
    
    foot.copy({
      addTo: standLeg,
      rotate: { x: -Zdog.TAU/8 },
    });
    
    // ----- upper body ----- //
    
    var spine = new Zdog.Anchor({
      addTo: hips,
      rotate: { x: Zdog.TAU/8 },
    });
    
    var chest = new Zdog.Shape({
      addTo: spine,
      path: [ { x: -1.5 }, { x: 1.5 } ],
      translate: { y: -6.5 },
      stroke: 9,
      color: garnet,
    });
    
    var head = new Zdog.Shape({
      addTo: chest,
      stroke: 12,
      translate: { y: -9.5 },
      color: gold,
    });
    
    var eye = new Zdog.Ellipse({
      addTo: head,
      diameter: 2,
      quarters: 2,
      translate: { x: -2, y: 1, z: 4.5 },
      rotate: { z: -Zdog.TAU/4 },
      color: eggplant,
      stroke: 0.5,
      backface: false,
    });
    eye.copy({
      translate: { x: 2, y: 1, z: 4.5 },
    });
    // smile
    new Zdog.Ellipse({
      addTo: head,
      diameter: 3,
      quarters: 2,
      translate: { y: 2.5, z: 4.5 },
      rotate: { z: Zdog.TAU/4 },
      closed: true,
      color: '#FED',
      stroke: 0.5,
      fill: true,
      backface: false,
    });
    
    // ----- arms ----- //
    
    var armSize = 6;
    
    // arm on left
    var upperArm = new Zdog.Shape({
      addTo: chest,
      path: [ { y: 0 }, { y: armSize } ],
      translate: { x: -5, y: -2 },
      rotate: { x: -Zdog.TAU/4 },
      color: eggplant,
      stroke: 4,
    });
    
    var forearm = new Zdog.Shape({
      addTo: upperArm,
      path: [ { y: 0 }, { y: armSize } ],
      translate: { y: armSize },
      rotate: { x: Zdog.TAU/8 },
      color: gold,
      stroke: 4,
    });
    
    // hand
    new Zdog.Shape({
      addTo: forearm,
      translate: { z: 1, y: armSize },
      stroke: 6,
      color: gold,
    });

    return group;
}

export {
    createInitShape,
    createMesh,
    createItem
}