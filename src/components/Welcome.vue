<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Vuetify Supabase</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
            :to="{ name: 'Login' }"
          >
            <v-icon icon="mdi-login-variant" size="large" start />

            Login
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            :to="{ name: 'Register' }"
          >
            <v-icon icon="mdi-account-plus" size="large" start />

            Register
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
//
</script>
