<template>
  <div>
    <v-card width="500" shaped elevation="17" class="mx-auto mt-16">
      <v-card-title class="justify-center">Add new user</v-card-title>
      <v-form v-model="isValid">
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
              <v-btn :disabled="!isValid" class="primary" @click="addToUsers"
                >Register</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <!-- Show user has been added! -->
      <v-dialog v-model="dialogUserAdded" max-width="500px">
        <v-card>
          <v-card-title class="headline">
            User added successfully!</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogUserAdded = false"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
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
      usernameRules: [
        (username) => !!username || "Username required",
        (username) =>
          username.length >= 8 || "Username must be at least 8 characters",
      ],
      typeItems: ["CC", "TI"],
      isValid: true,
    };
  },
};
</script>

<style>
</style>