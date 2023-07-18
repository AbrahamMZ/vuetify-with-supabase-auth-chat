<!-- eslint-disable vue/multi-word-component-names -->
<template >
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-card max-width="500" class="pa-4 mx-auto" title="Login">
        <v-form @submit.prevent="handleLogin()">
          <v-text-field
            v-model="form.email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :counter="10"
            label="Passowrd"
            type="password"
            required
          ></v-text-field>

          <div class="d-flex justify-end">
            <v-btn color="success" class="mt-4" type="submit"> Login </v-btn>

            <v-btn
              color="blue"
              variant="text"
              class="ml-2 mt-4"
              :to="{ name: 'Register' }"
            >
              Register
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

// keep up with form data
const form = ref({
  email: "",
  password: "",
});

// call the proper login method from the AuthUser composable
// on the submit of the form
const handleLogin = async (provider) => {
  try {
    provider
      ? await loginWithSocialProvider(provider)
      : await login(form.value);
    router.push({ name: "Dashboard" });
  } catch (error) {
    alert(error.message);
  }
};
</script>

<style >
</style>