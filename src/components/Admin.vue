<!-- Admin.vue -->
<template>
  <div class="admin-container">
    <h1>Admin Dashboard</h1>
    <div v-if="userProfileStore.profile?.userright === 'admin'">
      <div v-if="romStore.error" class="error">
        <p class="error-message">{{ romStore.error }}</p>
      </div>
      <div v-if="romStore.loading">Loading...</div>
     
      <!-- New ROMs Section -->
      <div class="new-roms" v-if="romStore.newRoms.length > 0">
        <h2>New ROMs Detected</h2>
        <div class="rom-list">
          <RomEditor
            v-for="rom in romStore.newRoms"
            :key="rom.romPath"
            :rom="rom"
            :isNew="true"
            @update="handleNewRomUpdate"
          />
        </div>
      </div>

      <!-- Existing ROMs Section -->
      <div class="existing-roms">
        <h2>Existing ROMs</h2>
        <div class="rom-list">
          <RomEditor
            v-for="rom in romStore.existingRoms"
            :key="rom.id"
            :rom="rom"
            :isNew="false"
            @update="handleExistingRomUpdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserProfileStore } from "../stores/userProfile";
import { useRomStore } from "../stores/roms";
import type { RomData } from "../types/roms";
import RomEditor from "./RomEditor.vue";

const userProfileStore = useUserProfileStore();
const romStore = useRomStore();
const router = useRouter();

onMounted(async () => {
  try {
    if (!userProfileStore.profile?.id) {
      await userProfileStore.fetchProfile();
    }

    if (userProfileStore.profile?.userright !== "admin") {
      router.push("/");
      return;
    }

    const results = await Promise.allSettled([
      romStore.fetchNewRoms(),
      romStore.fetchAllRoms()
    ]);
   
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to fetch ${index === 0 ? 'new' : 'existing'} ROMs:`, result.reason);
      }
    });
  } catch (error) {
    console.error('Error in Admin component setup:', error);
  }
});

async function handleNewRomUpdate(rom: RomData) {
  if (!rom.title || !rom.year || !rom.developer || !rom.categories || !rom.consoleid) {
    romStore.error = "Please fill in all required fields";
    return;
  }

  try {
    await romStore.updateRomInfo(
      rom.romPath,
      {
        title: rom.title,
        year: rom.year,
        developer: rom.developer,
        categories: rom.categories,
      },
      rom.consoleid
    );
  } catch (err) {
    console.error(err);
  }
}

async function handleExistingRomUpdate(rom: RomData) {
  if (!rom.id || !rom.title || !rom.year || !rom.developer || !rom.categories) {
    romStore.error = "Please fill in all required fields";
    return;
  }

  try {
    await romStore.updateExistingRom({
      id: rom.id,
      romPath: rom.romPath,
      boxArtPath: rom.boxArtPath,
      consoleid: rom.consoleid,
      title: rom.title,
      year: rom.year,
      developer: rom.developer,
      categories: rom.categories,
    });
  } catch (err) {
    console.error(err);
  }
}
</script>

<style scoped>
.admin-container {
  max-width: 80%;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  color: var(--blue);
}

.rom-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.error {
  color: red;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid red;
  border-radius: 4px;
}

.new-roms {
  margin-bottom: 2rem;
}

.existing-roms {
  margin-top: 2rem;
}
</style>