<!-- Admin.vue -->
<template>
  <div class="admin-container">
    <h2 class="admin-title">Admin Dashboard</h2>
    <div v-if="userProfileStore.profile?.userright === 'admin'">
      <div v-if="romStore.error" class="error">
        <p class="error-message">{{ romStore.error }}</p>
      </div>
      <div class="loading" v-if="romStore.loading">Loading...</div>

      <!-- New ROMs Section -->
      <div class="new-roms" v-if="romStore.newRoms.length > 0">
        <h2>Pending ROMs</h2>
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
        <SearchBar v-model="searchQuery" />
        <div v-if="filteredExistingRoms.length > 0" class="rom-list">
          <RomEditor
            v-for="rom in filteredExistingRoms"
            :key="rom.id"
            :rom="rom"
            :isNew="false"
            @update="handleExistingRomUpdate"
            @beforeEdit="(rom: RomData) => console.log('Editing ROM with data:', rom)"
          />
        </div>
        <div v-else-if="romStore.existingRoms.length > 0" class="no-results">
          No ROMs match your search criteria
        </div>
        <div v-else class="no-results">No existing ROMs found</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserProfileStore } from "../stores/userProfile";
import { useRomStore } from "../stores/roms";
import type { RomData, RomUpdatePayload } from "../types/roms";
import RomEditor from "./RomEditor.vue";
import SearchBar from "./SearchBar.vue";

const userProfileStore = useUserProfileStore();
const romStore = useRomStore();
const router = useRouter();
const searchQuery = ref("");

const filteredExistingRoms = computed(() => {
  if (!searchQuery.value.trim()) {
    return romStore.existingRoms;
  }

  const query = searchQuery.value.toLowerCase().trim();
  return romStore.existingRoms.filter((rom) => {
    return (
      rom.title?.toLowerCase().includes(query) ||
      rom.developer?.toLowerCase().includes(query) ||
      rom.console?.toLowerCase().includes(query) ||
      rom.categories?.toLowerCase().includes(query) ||
      rom.filename?.toLowerCase().includes(query)
    );
  });
});

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
      romStore.fetchAllRoms(),
    ]);

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(
          `Failed to fetch ${index === 0 ? "new" : "existing"} ROMs:`,
          result.reason
        );
      }
    });
  } catch (error) {
    console.error("Error in Admin component setup:", error);
  }
});

async function handleNewRomUpdate(rom: RomData) {
  if (!rom.title || !rom.year || !rom.developer || !rom.categories || !rom.consoleid || !rom.romPath) {
    romStore.error = "Please fill in all required fields";
    return;
  }

  try {
    const updatePayload: RomUpdatePayload = {
      title: rom.title,
      year: rom.year,
      developer: rom.developer,
      categories: rom.categories,
      romPath: rom.romPath,
      boxArtPath: rom.boxArtPath || null
    };

    await romStore.updateRomInfo(
      rom.romPath,
      updatePayload,
      rom.consoleid
    );
  } catch (err) {
    console.error(err);
  }
}

async function handleExistingRomUpdate(rom: RomData) {
  console.log("Handling existing ROM update:", rom);
  
  if (!rom.title || !rom.year || !rom.developer || !rom.categories || !rom.romPath) {
    romStore.error = "Please fill in all required fields";
    return;
  }

  try {
    const updatePayload: RomUpdatePayload = {
      title: rom.title,
      year: rom.year,
      developer: rom.developer,
      categories: rom.categories,
      romPath: rom.romPath,
      boxArtPath: rom.boxArtPath || null
    };
    
    console.log("Sending update payload:", updatePayload);
    await romStore.updateExistingRom(updatePayload);
  } catch (err) {
    console.error("Error updating ROM:", err);
  }
}
</script>

<style scoped>
.admin-container {
  max-width: 80%;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.admin-title {
  font-family: var(--font-press-start);
  text-align: center;
  color: var(--blue);
  font-size: 2rem;
}

.rom-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.error-message, .loading, .new-roms h2, .existing-roms h2, .no-results {
  font-family: var(--font-pixelify);
}

.new-roms h2, .existing-roms h2 {
  color: white;
}

.error {
  color: red;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid red;
  border-radius: 4px;
}

.no-results {
  color: var(--yellow);
}

.new-roms {
  margin-bottom: 2rem;
}

.existing-roms {
  margin-top: 2rem;
}
</style>
