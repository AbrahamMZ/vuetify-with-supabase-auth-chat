<template>
    <v-container>
      <h1 class="text-h1">Thanks for registering!</h1>
      <p>
        Please confirm your email to finishing registering:
        {{ $route.query.email }}
      </p>
    </v-container>
  </template>