<template>
  <div>
    <canvas class="zdog-canvas" width="240" height="240"></canvas>
    <input type='button' value="add circle" @click="add" />
  </div>
</template>

<script>
import Zdog from 'zdog'
import { createInitShape } from '../utils.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      illo: null,
      scratches: [],
      currentScratch: null,
    }
  },
  methods: {
    add() {
      console.log('add circle');
      const newCurrent = this.currentScratch.copy({
        // overwrite original options
        translate: { x: this.currentScratch.translate.x + 30 },
        color: '#C25',
      });
      this.currentScratch = newCurrent;
      this.scratches.push(this.currentScratch);
      // update & render
      this.illo.updateRenderGraph();
    },
  },
  mounted() {
    createInitShape();
    // create illo
    this.illo = new Zdog.Illustration({
      // set canvas with selector
      element: '.zdog-canvas',
    });

    // add circle
    this.currentScratch = new Zdog.Ellipse({
      addTo: this.illo,
      diameter: 80,
      stroke: 20,
      color: '#636',
    });

    this.scratches.push(this.currentScratch);

    // update & render
    this.illo.updateRenderGraph();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
