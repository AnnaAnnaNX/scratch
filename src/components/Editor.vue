<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="9"
    >
      <svg class="zdog-svg"  width="500" height="500" style="border: 1px solid;"></svg>
      <canvas class="zdog-canvas"  width="500" height="500" style="border: 1px solid;"></canvas>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="3"
    >
      <div>
        <v-btn type='button' @click="add">Add scratch</v-btn>
      </div>
      <div>
        <v-select
            :items="items"
            v-model="selectedScratch"
          ></v-select>
          {{ selectedScratch }}
      </div>
      <div>
        <v-text-field
          label="x"
          v-model="coord.x"
        ></v-text-field>
        <v-text-field
          label="y"
          v-model="coord.y"
        ></v-text-field>
        <v-text-field
          label="z"
          v-model="coord.z"
        ></v-text-field>
        <v-btn
         type='button'
          @click="relocate"
          :disabled="selectedScratch === null"
        >Relocate scratch</v-btn>
      </div>
      <div>
        <v-btn
          @click="save"
        >Save scratch</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Zdog from 'zdog'
import { createInitShape } from '../utils.js'

export default {
  name: 'Editor',
  props: {
    msg: String
  },
  data() {
    return {
      illo: null,
      scratches: [],
      currentScratch: null,
      selectedScratch: null,
      coord: {
        x: null,
        y: null,
        z: null,
      },
    }
  },
  computed: {
    items() {
      return Object.keys(this.scratches);
    },
  },
  watch: {
    selectedScratch(newValue) {
      console.log('changed selectedScratch');
      console.log(newValue);
      this.currentScratch = this.scratches[newValue];
      if (!this.currentScratch) {
        this.coord.x = null;
        this.coord.y = null;
        this.coord.z = null;
        return;
      }
      this.coord.x = this.currentScratch.translate.x;
      this.coord.y = this.currentScratch.translate.y;
      this.coord.z = this.currentScratch.translate.z;
    },
  },
  methods: {
    add() {
      console.log('add circle');
      const newCurrent = this.currentScratch.copyGraph({
        // overwrite original options
        translate: { x: this.currentScratch.translate.x + 30 },
        color: '#C25',
      });
      this.currentScratch = newCurrent;
      this.scratches.push(this.currentScratch);
      // update & render
      this.illo.updateRenderGraph();
    },
    relocate() {
      console.log('relocate');

      this.currentScratch.translate.x = this.coord.x;
      this.currentScratch.translate.y = this.coord.y;
      this.currentScratch.translate.z = this.coord.z;

      this.illo.updateRenderGraph();
    },
    save() {
      console.log('save');
      const svg = document.getElementsByClassName('zdog-svg')[0].outerHTML;
      console.log(svg);

      const illo = new Zdog.Illustration({
        element: '.zdog-canvas',
      });
      
      for(const stratch of this.scratches) {
        stratch.copyGraph({
          addTo: illo,
        });
      }    
      
      illo.updateRenderGraph();
    },
  },
  mounted() {
    createInitShape();
    // create illo
    this.illo = new Zdog.Illustration({
      // set canvas with selector
      element: '.zdog-svg',
    });

    const group = new Zdog.Group({
      addTo: this.illo,
      translate: { z: 20 },
    });
    // eye white first
    new Zdog.Ellipse({
      addTo: group,
      width: 160,
      height: 80,
    });
    // then iris
    new Zdog.Ellipse({
      addTo: group,
      diameter: 70,
    });

    // add circle
    this.currentScratch = group;

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