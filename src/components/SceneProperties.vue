<template>
  <div class="scene-properties">
    <h3>Scene:</h3>

    <component
      v-for="item in properties"
      :key="item.id"
      :is="item.component"
      v-bind="item.props"
      v-model="item.props.model"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import InputColor from "@/components/InputColor.vue";

@Component({})
export default class SceneProperties extends Vue {
  show = true;
  properties = null;

  data() {
    return {
      properties: [
        {
          component: InputColor,
          props: {
            model: this.$store.getters.getScene.clearColor,
            initialColor: this.$store.getters.getScene.clearColor,
            label: "Scene main color",
            mutationProp: "setClearColor",
          },
        },
        {
          component: InputColor,
          props: {
            model: this.$store.getters.getGrid.mainColor,
            initialColor: this.$store.getters.getGrid.mainColor,
            label: "Grid main color",
            mutationProp: "setGridMainColor",
          },
        },
        {
          component: InputColor,
          props: {
            model: this.$store.getters.getGrid.lineColor,
            initialColor: this.$store.getters.getGrid.lineColor,
            label: "Grid line color",
            mutationProp: "setGridLineColor",
          },
        },
      ],
    };
  }

  onClick() {
    this.show = !this.show;
  }
}
</script>

<style lang="scss">
.scene-properties {
}
</style>
