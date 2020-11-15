<template>
  <v-app id="app">
    <main>
      <div class="app-container">
        <header class="app-header">
          <NavBar></NavBar>
        </header>
        <div class="container">
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <router-view></router-view>
        </div>
      </div>
    </main>
  </v-app>
</template>

<script>
import NavBar from "./views/NavBar";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>