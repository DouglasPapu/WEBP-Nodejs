<template>
  <div>
    <v-card width="500" rounded elevation="17" class="mx-auto mt-16">
      <v-card-title class="justify-center">Add new user</v-card-title>
      <v-form v-model="isValid" @submit.prevent="createUser">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.name.firstName"
                required
                label="First Name"
                prepend-icon="perm_identity"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.name.lastName"
                required
                label="Last Name"
                prepend-icon="person_outline"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.username"
                required
                label="Username"
                :rules="usernameRules"
                prepend-icon="account_circle"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.password"
                required
                label="Password"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-combobox
                v-model="user.identification.type"
                :items="typeItems"
                label="Identification type"
                outlined
                dense
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.identification.number"
                required
                type="number"
                label="Number"
              />
            </v-col>
            
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="user.photo" required label="Photo" />
            </v-col>

            <v-col cols="12" md="6">
              <v-switch
                v-model="user.active"
                label="Active"
                color="success"
                :value="user.active"
                prepend-icon="check_circle"
                hide-details
                required
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn :disabled="!isValid" class="primary" @click="createUser">
                <v-icon>save</v-icon> Save</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        name: {
          firstName: "",
          lastName: "",
        },
        username: "",
        identification: {
          type: "",
          number: "",
        },
        password: "",
        photo: "",
        active: false,
      },
      userData: {
        name: {
          firstName: "",
          lastName: "",
        },
        username: "",
        identification: {
          type: "",
          number: "",
        },
        password: "",
        photo: "",
        active: false,
      },
      usernameRules: [
        (username) =>
          username.length >= 8 || "Username must be at least 8 characters",
      ],
      typeItems: ["CC", "TI"],
      isValid: true,
      editedIndex: -1,
      dialog: false,
      users: [],
    };
  },
  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.user = Object.assign({}, this.userData);
        this.editedIndex = -1;
      }, 300);
    },
    saveUser: async function () {
      if (this.editedIndex > -1) {
        console.log("updated");
      } else {
        this.createUser();
      }
    },
    createUser() {
      let apiURL = "https://crud-users-back.herokuapp.com//users/create-user";
      axios
        .post(apiURL, this.user)
        .then(() => {
          (this.user = {
            name: {
              firstName: "",
              lastName: ""
            },
            username: "",
            identification: {
              type: "",
              number: ""
            },
            password: "",
            photo: "",
            active: false,
          }),
            this.close();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>