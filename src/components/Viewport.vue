<template>
  <section class="viewport">
    <canvas id="viewport__renderCanvas" class="viewport__canvas" />

    <div class="viewport__overlay">
      <Propertiesdrawer v-if="$store.getters.getActiveMesh">
        <InputString
          :label="'name'"
          v-model="$store.getters.getActiveMesh.name"
        ></InputString>
        <InputVector3
          :label="'position'"
          :vec="$store.getters.getActiveMesh.position"
        ></InputVector3>
        <InputColor
          v-model="$store.getters.getActiveMesh.material.diffuseColor"
          :initialColor="$store.getters.getActiveMesh.material.diffuseColor"
          label="material color"
          mutationProp="setSelectedMeshColor"
        ></InputColor>
      </Propertiesdrawer>

      <Propertiesdrawer v-else-if="viewportInstance">
        <SceneProperties />
      </Propertiesdrawer>

      <!-- <div style="top: 100px">
      
      </div> -->
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewportObject from "@/ts/viewport";
import Propertiesdrawer from "@/components/PropertiesDrawer.vue";
import InputVector3 from "@/components/InputVector3.vue";
import InputString from "@/components/InputString.vue";
import InputColor from "@/components/InputColor.vue";
import InputBoolean from "@/components/InputBoolean.vue";
import SceneProperties from "@/components/SceneProperties.vue";

@Component({
  components: {
    Propertiesdrawer,
    InputVector3,
    InputString,
    InputColor,
    InputBoolean,
    SceneProperties,
  },
})
export default class Viewport extends Vue {
  viewportInstance!: ViewportObject | null;
  color!: any;
  data() {
    return {
      viewportInstance: null,
    };
  }
  mounted() {
    if (!this.$store.getters.getViewport) {
      this.viewportInstance = new ViewportObject("viewport__renderCanvas", true);
      this.$store.commit("setViewport", this.viewportInstance);
    } else {
      this.viewportInstance = this.$store.getters.getViewport;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.viewport {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: black;

  &__canvas {
    height: inherit;
    width: inherit;
    outline: none;
  }

  &__overlay {
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    width: 20vw;
    background-color: rgb(20, 20, 20);
    color: #fff;
  }
}
</style>
