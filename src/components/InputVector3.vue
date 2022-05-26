<template>
  <div class="input-vector3">
    <div class="input-vector3__row">
      <h3 class="input-vector3__header">{{ label }}</h3>
      <div class="input-vector3__divider"></div>
      <button class="input-vector3__toggle" @click="onClick">
        <span v-if="show">&#x25B2; </span>
        <span v-else>&#x25BC;</span>
      </button>
    </div>
    <div class="input-vector3__row" v-if="show">
      <p class="input-vector3__label">x</p>
      <input class="input-vector3__field" type="number" v-model="vec.x" placeholder="x" />
      <p class="input-vector3__label">y</p>
      <input class="input-vector3__field" type="number" v-model="vec.y" placeholder="y" />
      <p class="input-vector3__label">z</p>
      <input class="input-vector3__field" type="number" v-model="vec.z" placeholder="z" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vector3 } from "babylonjs/index";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class InputVector3 extends Vue {
  @Prop({ required: true }) vec!: Vector3;
  @Prop({ required: false }) label!: string;
  show = true;

  onClick() {
    this.show = !this.show;
  }
}
</script>

<style lang="scss">
.input-vector3 {
  width: 100%;
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__header {
    margin-right: 16px;
  }

  &__field {
    padding: 0 0 0 8px;
    margin-right: 20px;
    width: calc(100% / 3);
    height: 32px;
    border-radius: 4px;
    border: 1px solid transparent;
    border-top: none;
    border-bottom: 1px solid #222;
    background-color: #161819;
    color: #ffffff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39), 0 -1px 1px #161819, 0 1px 0 #161819;

    &::placeholder {
      color: #ffffff;
    }
  }

  &__label {
    margin-right: 16px;
  }

  //@todo make this into own component
  &__divider {
    width: max-content;
    min-width: 50%;
    height: 1px;
    background-color: #161819;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39);
    margin: 8px 0;
  }

  &__toggle {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    border: 1px solid transparent;
    border-top: none;
    border-bottom: 1px solid #222;
    background-color: #161819;
    color: #ffffff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39), 0 -1px 1px #161819, 0 1px 0 #161819;
  }
}
</style>
