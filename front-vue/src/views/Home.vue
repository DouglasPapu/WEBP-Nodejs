<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="8" md="8">
            <v-card class="ml-5 mr-5">
              <v-card-title class="justify-center">Welcome to UsersApp</v-card-title>
              <v-card-subtitle align="center">CRUD with Node.js, Vue.js, MongoDB and Express</v-card-subtitle>
              <v-card-text>
                <v-img src="../../../back-nodejs/img/crud.png"></v-img>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    mini: false,
    userData: {
      name: "",
      description: "",
    },
    dialog: false,
    checkbox: false,
  }),
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>