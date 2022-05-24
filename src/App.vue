<template>
  <div id="app">
<!-- <div id="nav">
<router-link to="/">Home</router-link> |
<router-link to="/about">About</router-link>
</div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app, html, body {
  /* reset */
  padding:0;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
  widows: 100%;
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
