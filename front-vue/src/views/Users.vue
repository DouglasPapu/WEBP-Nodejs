<template>
  <v-card width="800" shaped elevation="17" class="mx-auto mt-16">
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-center">Name</th>
          <th class="text-center">Username</th>
          <th class="text-center">Identification</th>
          <th class="text-center">Password</th>
          <th class="text-center">Photo</th>
          <th class="text-center">Active</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in users" :key="index">
          <td>{{ item.name.firstName }} {{ item.name.lastName }}</td>
          <td>{{ item.username }}</td>
          <td>
            {{ item.identification.type }} {{ item.identification.number }}
          </td>
          <td>{{ item.password }}</td>
          <td>
            <v-icon :color="item.active ? 'green darken-2' : 'red'">{{
              item.active ? "how_to_reg" : "unpublished"
            }}</v-icon>
          </td>
          <td>
            <v-icon small @click="viewEdit(item)">edit</v-icon>
            <v-icon small @click="getUserDelete(item)">delete</v-icon>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <!-- Dialog to delete user -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteUsers(itemDelete)"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
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
    };
  },
  methods: {
    viewEdit(item) {
      this.dialogEdit = true;
      this.itemEdit = Object.assign({}, item);
    },
    getUserDelete(item) {
      this.itemDelete = item;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>

<style>
</style>