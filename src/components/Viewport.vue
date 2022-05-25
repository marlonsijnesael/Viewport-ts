<template>
  <section class="viewport">
    <canvas id="viewport__renderCanvas" class="viewport__canvas"/>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ViewportObject from '@/ts/viewport';

@Component
export default class Viewport extends Vue {
  // @Prop() private msg!: string;
  viewportInstance!: ViewportObject
  mounted(){
   this.viewportInstance = new ViewportObject("viewport__renderCanvas", true);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.viewport{
  position: absolute;
  top:0;
  left:0;
  height: 100%;
  width: 100%;
  background: black;
  &__canvas{
    height: inherit;
    width: inherit;
    outline: none;
  }
}
</style>
