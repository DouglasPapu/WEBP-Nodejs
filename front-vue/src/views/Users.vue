<template>
  <v-card width="1000" shaped elevation="17" class="mx-auto mt-16">
    <v-data-table :headers="headers" :items="users" item-key="_id">
      <template v-slot:item.actions="{item}">
        <v-btn
          color="success"
          class="mx-2"
          x-small
          @click="editUser(item)"
          outlined
        >
          <v-icon small>edit</v-icon>
        </v-btn>
        <v-btn color="red" x-small @click="deleteUser(item._id)" outlined>
          <v-icon small>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog">
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
              <v-combobox
                v-model="user.identification.type"
                :items="typeItems"
                label="Identification type"
                outlined
                dense
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.identification.number"
                required
                type="number"
                label="Number"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.password"
                required
                label="Password"
                type="password"
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
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      itemDelete: Object,
      itemEdit: Object,
      dialogDelete: false,
      dialogEdit: false,
      usernameRules: [
        (username) => !!username || "Username required",
        (username) =>
          username.length >= 8 || "Username must be at least 8 characters",
      ],
      user: {
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
      },
      users: [],
      headers: [
        { text: "First Name", value: "name.firstName", sortable: true },
        { text: "Last Name", value: "name.lastName", sortable: true },
        { text: "Username", value: "username", sortable: false },
        { text: "Identification Type", value: "identification.type", sortable: false },
        { text: "Identification Number", value: "identification.number", sortable: false },
        { text: "Password", value: "password", sortable: false },
        { text: "Photo", value: "photo", sortable: false },
        { text: "Active", value: "active", sortable: false },
        { text: "Actions", value: "actions", sortable: false, width: "150px" },
      ],
      dialog: false,
    };
  },
  watch:{
    dialog (val) {
      val || this.close()
    }
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers: async function () {
      let apiURL = "http://localhost:4000/users";
      axios
        .get(apiURL)
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editUser(item) {
      this.editedIndex = this.users.indexOf(item)
      this.user = Object.assign({}, item)
      this.dialog = true
    },
    getUserDelete(item) {
      this.itemDelete = item;
      this.dialogDelete = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.user = Object.assign({}, this.userData);
        this.editedIndex = -1;
      }, 300);
    },
  },
};
</script>

<style>
</style>