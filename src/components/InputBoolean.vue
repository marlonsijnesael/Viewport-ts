<template>
  <div class="input-bool">
    <div class="input-bool__row">
      <div class="input-bool__divider"></div>
    </div>
    <div class="input-bool__row">
      <h3 class="input-bool__header">{{ label }}</h3>
      <label class="switch">
        <input
          type="checkbox"
          ref="strInput"
          class="input-bool__field"
          @input="handleInput"
          :placeholder="value"
        />
        <span class="slider round"></span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vector3 } from "babylonjs/index";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class InputBoolean extends Vue {
  @Prop({ required: true }) value!: boolean;
  @Prop({ required: false }) label!: string;

  data() {
    return {
      placeholderStr: "",
    };
  }

  handleInput(e: any): void {
    this.$emit("input", this.value);
  }
}
</script>

<style lang="scss">
.input-bool {
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
    background-color: #000000;
    margin: 8px 0;
  }
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 32px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  height: 32px;
  border-radius: 4px;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #222;
  background-color: #161819;
  color: #ffffff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39), 0 -1px 1px #161819, 0 1px 0 #161819;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
