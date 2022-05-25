<template>
  <div class="input-colorpicker">
    <div class="input-colorpicker__row">
      <h3 class="input-vector3__header">{{ label }}</h3>
      <div class="input-vector3__divider"></div>
    </div>
    <div class="input-colorpicker__row">
      <ColorPicker
        :color="color"
        :onStartChange="(c) => onChange(c)"
        :onChange="(c) => onChange(c, 'change')"
        :onEndChange="(c) => onChange(c, 'end')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Color3, Vector3 } from "babylonjs/index";
import { Component, Vue, Prop } from "vue-property-decorator";
import { ColorPicker } from "vue-color-gradient-picker";

@Component({
  components: {
    ColorPicker,
  },
})
export default class StringInput extends Vue {
  @Prop({ required: false }) label!: string;
  color!: any;

  data() {
    return {
      placeholderStr: "",
      color: {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
      },
    };
  }

  onChange(attrs: any, name: any) {
    this.color = { ...attrs };
    console.log(this.color)
     let rgb = new Color3(this.color.red/255, this.color.red/255, this.color.blue/255)
    this.$emit("input", rgb);
  }
}
</script>


<style src="vue-color-gradient-picker/dist/index.css" lang="css" />
<style lang="scss">
.input-colorpicker {
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
