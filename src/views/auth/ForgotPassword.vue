<template >
  <v-container>
    <v-form ref="form" @submit.prevent="handlePasswordReset">
      <div class="text-h3 pb-4">Forgot Password</div>
      <v-text-field v-model="email" label="Email"> </v-text-field>
    </v-form>
  </v-container>
</template>
<script setup>
import useAuthUser from "@/composables/UseAuthUser";
import { ref } from "vue";

// use necessary composables
const { sendPasswordRestEmail } = useAuthUser();

// keep up with email
const email = ref("");

// function to call on submit of the form
// triggers sending the reset email to the user
const handlePasswordReset = async () => {
  await sendPasswordRestEmail(email.value);
  alert(`Password reset email sent to: ${email.value}`);
};
</script>
<style lang="">
</style>