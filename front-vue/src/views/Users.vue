<template>
  <v-card width="1000" elevation="17" class="mx-auto mt-16">
    <v-data-table :headers="headers" :items="users" item-key="_id" rounded>
      <template v-slot:item.actions="{ item }">
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
      <template v-slot:item.active="{ item }">
        <v-icon :color="item.active ? 'green darken-2' : 'red'">{{
          item.active ? "how_to_reg" : "unpublished"
        }}</v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent>
      <v-card rounded>
        <v-card-title class="justify-center">Edit User</v-card-title>
        <v-card-text>
          <v-form v-model="isValid" @submit.prevent="editUser">
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
                required
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn :disabled="!isValid" class="primary" @click="updateUser">
                <v-icon left>update</v-icon> Update</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn class="secondary" @click="close">
                <v-icon left>cancel</v-icon> Cancel</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
        </v-card-text>
      </v-card>
      
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      itemEdit: {
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
        {
          text: "First Name",
          value: "name.firstName",
          sortable: true,
          align: "center",
        },
        {
          text: "Last Name",
          value: "name.lastName",
          sortable: true,
          align: "center",
        },
        {
          text: "Username",
          value: "username",
          sortable: false,
          align: "center",
        },
        {
          text: "Identification Type",
          value: "identification.type",
          sortable: false,
          align: "center",
        },
        {
          text: "Identification Number",
          value: "identification.number",
          sortable: false,
          align: "center",
        },
        {
          text: "Password",
          value: "password",
          sortable: false,
          align: "center",
        },
        { text: "Photo", value: "photo", sortable: false, align: "center" },
        { text: "Active", value: "active", sortable: false, align: "center" },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "150px",
          align: "center",
        },
      ],
      typeItems: ["CC", "TI"],
      dialog: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers: async function () {
      let apiURL = "https://crud-users-back.herokuapp.com//users";
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
      this.editedIndex = this.users.indexOf(item);
      this.user = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.user = Object.assign({}, this.itemEdit);
        this.editedIndex = -1;
      }, 300);
    },
    updateUser() {
      let apiURL = `https://crud-users-back.herokuapp.com//users/update-user/${this.user._id}`;
      axios
        .put(apiURL, this.user)
        .then((res) => {
          console.log(res);
          this.close();
          this.loadUsers();
        })
        .catch((error) => {
          console.log(error);
          console.log(this.$route.params.id);
        });
    },
    deleteUser(id) {
      let apiURL = `https://crud-users-back.herokuapp.com//users/remove-user/${id}`;
      let indexOfItem = this.users.findIndex(i => i._id === id);
      axios.delete(apiURL).then(() => {
        this.users.splice(indexOfItem, 1);
      }).catch(error => {
        console.log(error)
      })
    }
  },
};
</script>

<style>
</style>