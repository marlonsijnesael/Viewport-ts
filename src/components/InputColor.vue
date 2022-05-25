<template>
  <div class="input-colorpicker">
    <div class="input-colorpicker__row">
      <h3 class="input-colorpicker__header">{{ label }}</h3>
      <div class="input-colorpicker__divider"></div>
      <button class="input-vector3__toggle" @click="onClick">
        <span v-if="show">&#x25B2; </span>
        <span v-else>&#x25BC;</span>
      </button>
    </div>

    <div class="input-colorpicker__row" v-if="show">
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
import { Color3, Vector3 } from "babylonjs";
import { Component, Vue, Prop } from "vue-property-decorator";
import { ColorPicker } from "vue-color-gradient-picker";

@Component({
  components: {
    ColorPicker,
  },
})
export default class StringInput extends Vue {
  @Prop({ required: true }) initialColor!: Color3;
  @Prop({ required: false }) label!: string;
  color!: any;
  show = false;

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

  mounted() {
    console.log(this.color);
    this.color = {
      red: this.initialColor.r * 255,
      green: this.initialColor.g * 255,
      blue: this.initialColor.b * 255,
    };
    console.log(this.color);
  }

  onChange(attrs: any, name: any) {
    this.color = { ...attrs };
    console.log(this.color.red / 255, this.color.green / 255, this.color.blue / 255);
    let rgb = new Color3(
      this.color.red / 255,
      this.color.green / 255,
      this.color.blue / 255
    );
    this.$emit("input", rgb);
  }

  onClick() {
    this.show = !this.show;
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
    justify-content: space-between;
  }

  &__header {
    width: max-content;
  }

  &__field {
  }

  &__label {
    margin-right: 16px;
  }

  /*@todo make this into own component*/
  &__divider {
    width: max-content;
    min-width: 32%;
    justify-self: center;
    height: 1px;
    background-color: #161819;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39);
    margin: 8px 0;
  }

  &__toggle {
    height: 40px;
    width: 40px;
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
  .ui-color-picker {
    background-color: transparent;
    width: 100%;
    margin: 0;
  }
  .picker-area {
    padding: 0;
  }

  .alpha,
  .preview-area {
    display: none;
  }
  .ui-color-picker .color-preview-area {
    padding: 0;
  }
  .ui-color-picker .picker-area .preview .color-hue-alpha {
    margin: 0;
  }
}

.input-field .input-container .input {
  color: white;
}
.input-container {
  color: white;
  > input {
    margin: 0 !important;
    padding: 0 0 0 8px;
    margin-right: 20px;
    height: 32px !important;
    border-radius: 4px;
    border: 1px solid transparent !important;
    border-top: none;
    border-bottom: 1px solid #222;
    background-color: #161819;
    color: #ffffff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39), 0 -1px 1px #161819, 0 1px 0 #161819;

    &::placeholder {
      color: #ffffff;
    }
  }
}
.input-field .input-container,
.label,
.input-field .input-container .input {
  color: white !important;
}
</style>
