<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-view-dashboard" />

      Admin Panel,
      <template v-if="user">
        <!--user_metadata is the key supabase nests all arbitrary meta data under-->
        <span> Hello {{ user.user_metadata.name ?? user.email  }}</span>
      </template>
    </v-app-bar-title>
    <template #append>
      <v-btn @click="logout">
        <v-icon icon="mdi-logout-variant" start /> logout
      </v-btn>
    </template>
  </v-app-bar>
 
</template>

<script setup>
import useAuthUser from "@/composables/UseAuthUser";
const { user, logout } = useAuthUser();
</script>