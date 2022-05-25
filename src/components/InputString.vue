<template>
  <div class="input-string">
    <div class="input-string__row">
      <h3 class="input-vector3__header">{{ label }}</h3>
      <div class="input-vector3__divider"></div>
    </div>
    <div class="input-string__row">
      <input
        ref="strInput"
        class="input-string__field"
        type="string"
        @input="handleInput"
        :placeholder="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vector3 } from "babylonjs/index";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class StringInput extends Vue {
  @Prop({ required: true }) value!: string;
  @Prop({ required: false }) label!: string;
  content: string = this.value;
  placeholderStr!: string;

  data() {
    return {
      placeholderStr: "",
    };
  }

  handleInput(e: any): void {
    let input = this.$refs.strInput as HTMLInputElement;
    if (input.value && input.value !== "") {
      this.$emit("input", input.value);
    }
  }
}
</script>

<style lang="scss">
.input-string {
  width: 100%;
  &__row {
    display: flex;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  &__header {
    margin-right: 16px;
  }

  &__field {
    padding: 0 0 0 8px;
    margin-right: 20px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid transparent;
    border-top: none;
    border-bottom: 1px solid #222;
    background-color: #161819;
    color: #ffffff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39), 0 -1px 1px #161819,
      0 1px 0 #161819;

       &::placeholder {
          color: #ffffff;
      }
  }

  &__label {
    margin-right: 16px;
  }

  //@todo make this into own component
  &__divider {
    width: 100%;
    height: 1px;
    background-color: #ffffff;
    margin: 8px 0;
  }
}
</style>
