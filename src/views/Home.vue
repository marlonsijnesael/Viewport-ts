<template>
  <div class="home">
    <Viewport/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Viewport from '../components/Viewport.vue'; // @ is an alias to /src

@Component({
  components: {
    Viewport
  },
})
export default class Home extends Vue {}
</script>
