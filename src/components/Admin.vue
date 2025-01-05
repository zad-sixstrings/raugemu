<template>
  <div class="admin-container">
    <h2 class="">Dashboard</h2>
    <div
      v-if="userProfileStore.profile?.userright === 'admin'"
    >
      <div class="">
        <h2 class="">Gestionnaire de ROMs</h2>
        <p class="">
          
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

<script setup lang="ts">
import { onMounted, } from "vue";
import { useRouter } from "vue-router";
import { useUserProfileStore } from "../stores/userProfile";

const userProfileStore = useUserProfileStore();
const router = useRouter();

onMounted(async () => {
  // Redirect if user is not logged in or not admin
  if (!userProfileStore.profile?.id) {
    await userProfileStore.fetchProfile();
  }

  if (userProfileStore.profile?.userright !== "admin") {
    router.push("/");
  }
});
</script>

<style scoped>
.admin-container {
    color: white;
}
</style>
