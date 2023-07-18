<template >
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-card max-width="500" class="mx-auto pa-4" title="Register">
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :counter="10"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <div class="d-flex flex-column">
            <v-btn
              color="success"
              class="mt-4"
              block
              type="submit"
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
const { register } = useAuthUser();

// Form reactive ref to keep up with the form data
const form = ref({
  name: "",
  email: "",
  password: "",
});

// function to hand the form submit
const handleSubmit = async () => {
  try {
    // use the register method from the AuthUser composable
    await register(form.value);

    // and redirect to a EmailConfirmation page the will instruct
    // the user to confirm they're email address
    router.push({
      name: "EmailConfirmation",
      query: { email: form.value.email },
    });
  } catch (error) {
    alert(error.message);
  }
};
</script>

<style >
</style>