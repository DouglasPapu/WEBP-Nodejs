<template>
  <div>
    <v-app-bar color="green" app dark>
      <v-toolbar-title style="width 300px" class="ml-4 pl-2">
        <span class="sm-and-down">UsersApp</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text rounded>Home</v-btn>
      <v-btn to="/users" text rounded>Users</v-btn>
      <v-btn to="/add-user" text rounded>Add User</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
</style>