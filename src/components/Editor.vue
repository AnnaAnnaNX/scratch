<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="9"
    >
      <svg id="zdog-svg"  width="500" height="500" style="border: 1px solid;"></svg>
      <div style="display: none;">
        <canvas id="zdog-canvas"  width="500" height="500" style="border: 1px solid;"></canvas>
      </div>
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
          :value="selectedScratch"
          @input="setSelectedScratch"
        ></v-select>
      </div>
      <div>
        <h3>Relocate</h3>
        <v-slider
          v-if="selectedScratch !== null"
          v-model="coord.x"
          class="align-center slider"
          :max="MAX_COORD"
          :min="-MAX_COORD"
          hide-details
          label="x"
          thumb-label="always"
        ></v-slider>
        
        <v-slider
          v-if="selectedScratch !== null"
          v-model="coord.y"
          class="align-center slider"
          :max="MAX_COORD"
          :min="-MAX_COORD"
          hide-details
          label="y"
          thumb-label="always"
        ></v-slider>
        
        <v-slider
          v-if="selectedScratch !== null"
          v-model="coord.z"
          class="align-center slider"
          :max="MAX_COORD"
          :min="-MAX_COORD"
          hide-details
          label="z"
          thumb-label="always"
        ></v-slider>

      </div>
      <div>
        <h3>Rotate</h3>
        <v-slider
          v-if="selectedScratch !== null"
          v-model="angles.x"
          class="align-center slider"
          :max="180"
          :min="-180"
          hide-details
          label="x"
          thumb-label="always"
        ></v-slider>
        
        <v-slider
          v-if="selectedScratch !== null"
          v-model="angles.y"
          class="align-center slider"
          :max="180"
          :min="-180"
          hide-details
          label="y"
          thumb-label="always"
        ></v-slider>
        
        <v-slider
          v-if="selectedScratch !== null"
          v-model="angles.z"
          class="align-center slider"
          :max="180"
          :min="-180"
          hide-details
          label="z"
          thumb-label="always"
        ></v-slider>
      </div>
      <div>
        <v-btn
          @click="saveAsPng"
        >Save scratch as png</v-btn>
        <v-btn
          @click="saveAsSvg"
        >Save scratch as svg</v-btn>
        <a id="loadAsPng" href="#" download="picture.png" style="visability: false;"></a>
        <a id="loadAsSvg" href="#" download="picture.svg" style="visability: false;"></a>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Zdog from 'zdog'
import { createInitShape, createMesh, createItem } from '../utils.js'
import { MAX_COORD } from '../constants.json'

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
      angles: {
        x: null,
        y: null,
        z: null,
      },
      mesh: null,
      MAX_COORD,
    }
  },
  computed: {
    items() {
      return Object.keys(this.scratches);
    },
  },
  watch: {
    selectedScratch(newValue) {
      console.log('changed selectedScratch 👍');
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
    coord: {
     handler(newValue){
       this.relocate(newValue);
     },
     deep: true
    },
    angles: {
     handler(newValue){
       this.rotate(newValue);
     },
     deep: true
    }
  },
  methods: {
    add() {
      const group = createItem(this.illo);

      // add circle
      this.currentScratch = group;
      this.scratches.push(this.currentScratch);
      this.selectedScratch = this.scratches.length - 1;

      // update & render
      this.illo.updateRenderGraph();

    },
    relocate({x, y, z}) {
      if (this.currentScratch) {
        this.currentScratch.translate.x = Number.parseInt(x);
        this.currentScratch.translate.y = Number.parseInt(y);
        this.currentScratch.translate.z = Number.parseInt(z);
        this.illo.updateRenderGraph();
      }
    },
    rotate({x, y, z}) {
      if (this.currentScratch) {
        this.currentScratch.rotate.x = Zdog.TAU * parseFloat(x) / 360;
        this.currentScratch.rotate.y = Zdog.TAU * parseFloat(y) / 360;
        this.currentScratch.rotate.z = Zdog.TAU * parseFloat(z) / 360;
        this.illo.updateRenderGraph();
      }
    },
    saveAsPng() {
      console.log('saveAsPng');

      const illo = new Zdog.Illustration({
        element: '#zdog-canvas',
      });

      for(const stratch of this.scratches) {
        stratch.copyGraph({
          addTo: illo,
        });
      }    
      
      illo.updateRenderGraph();

      document.getElementById('loadAsPng').click();  

    },
    saveAsSvg() {
      console.log('saveAsSvg');
      const svg = document.getElementById('zdog-svg').outerHTML;
      console.log(svg);

      document.getElementById('loadAsSvg').click();  

    },

    setSelectedScratch(val) {
      this.selectedScratch = val;
    },

  },
  mounted() {

    createInitShape();
    // create illo
    this.illo = new Zdog.Illustration({
      // set canvas with selector
      element: '#zdog-svg',
    });

    this.mesh = createMesh(this.illo);

    // update & render
    this.illo.updateRenderGraph();

    document.getElementById('loadAsPng').addEventListener('click', function(e) {
      console.log('click on #loadAsPng');

      const dataURL = document.getElementById('zdog-canvas').toDataURL('image/png');
      e.target.href = dataURL;

    });

    document.getElementById('loadAsSvg').addEventListener('click', function(e) {
      console.log('click on #loadAsSvg');

      const SVGDomElement = document.getElementById('zdog-svg');
      const serializedSVG = new XMLSerializer().serializeToString(SVGDomElement);
      const base64Data = window.btoa(serializedSVG);
      const dataURL = `data:image/svg+xml;base64,${base64Data}`;

      e.target.href = dataURL;

    });


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
.slider {
  margin-top: 25px;
}
</style>