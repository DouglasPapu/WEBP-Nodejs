<template>
  <v-app id="inspire">
    <v-app-bar app color="green" dark>
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
      <v-toolbar-title style="width 300px" class="ml-0 pl-4">
        <span class="sm-and-down">CRUD with Front+Backend</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="8" md="8">
            <v-card class="ml-5 mr-5">
              <v-app-bar dark color="#2C3A47">
                <v-btn icon>
                  <v-icon>local_offer</v-icon>
                </v-btn>
                <v-toolbar-title>Users</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="green" v-on="on">
                      <v-icon left>add</v-icon> Add
                    </v-btn>
                  </template>
                  <v-card>
                    <v-form
                      @submit.prevent="saveUser"
                      ref="userData"
                      lazy-validation
                    >
                      <v-card-title>
                        <span class="headline">Users</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                label="FirstName"
                                v-model="userData.name"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                label="LastName"
                                v-model="userData.description"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          <v-layout wrap>
                            <v-flex xs6 sm6 md6>
                              <v-combobox
                                v-model="select"
                                :items="items"
                                label="Identification type"
                                outlined
                              ></v-combobox>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                label="ID Number"
                                v-model="userData.description"
                                type="number"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          <v-layout wrap>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                label="Password"
                                v-model="userData.name"
                                type="password"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                label="Photo"
                                v-model="userData.description"
                                type="url"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          <v-layout>
                            <v-flex xs6 sm6 md6>
                              <v-checkbox
                                v-model="checkbox"
                                :label="`${checkbox.toString()}`"
                              ></v-checkbox>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-app-bar>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-btn
      v-scroll="onScroll"
      bottomcolor="red"
      dark
      fab
      fixed
      right
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
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