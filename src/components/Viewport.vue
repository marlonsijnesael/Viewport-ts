<template>
  <section class="viewport">
    <canvas id="viewport__renderCanvas" class="viewport__canvas"/>

    <div v-if="$store.getters.getActiveMesh" class="viewport__overlay">
    <h1>Current object:</h1>
    <ul>
      <li>Name: {{$store.getters.getActiveMesh.name}}</li>
      <li>UID: {{$store.getters.getActiveMesh.uniqueId}}</li>
      <li>Position: {{$store.getters.getActiveMesh.position}}</li>
      </ul>
    </div>
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

  &__overlay{
    position: absolute;
    right: 0;
    top:0;
    height: 100vh;
    width: 20vw;
    background: white;

  }

}
</style>
