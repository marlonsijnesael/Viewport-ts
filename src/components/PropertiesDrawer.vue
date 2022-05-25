<template>
  <section class="properties">
      <div class="properties__inner">
        <slot></slot>
      </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PropertiesDrawer extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.properties {
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    width: 20vw;
    background-color: #1f2326;
    color: #fff;

    &__inner{
        margin-left: 20px;
        padding: 20px;
    }
}
</style>
