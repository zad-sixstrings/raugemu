<template>
  <div class="page-transition">
   <h3 class="soon">Coming soon...</h3>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useApiStatusStore } from "../stores/apiStatus";

const apiStatusStore = useApiStatusStore();

onMounted(() => {
  apiStatusStore.fetchStatus();
});
</script>

<style scoped>
.soon {
  color: white;  
}
</style>
