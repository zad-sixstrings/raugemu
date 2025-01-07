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
        <div class="section-header" @click="toggleSection('pending')">
          <h2>
            <span class="toggle-icon">{{
              sectionStates.pending ? "▼" : "▶"
            }}</span>
            Pending ROMs
            <span class="count">({{ romStore.newRoms.length }})</span>
          </h2>
        </div>
        <div class="rom-list" v-show="sectionStates.pending">
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
        <div class="section-header" @click="toggleSection('existing')">
          <h2>
            <span class="toggle-icon">{{
              sectionStates.existing ? "▼" : "▶"
            }}</span>
            Existing ROMs
            <span class="count">({{ filteredActiveRoms.length }})</span>
          </h2>
        </div>
        <div v-show="sectionStates.existing">
          <SearchBar v-model="searchQuery" />
          <div v-if="filteredActiveRoms.length > 0" class="rom-list">
            <RomEditor
              v-for="rom in filteredActiveRoms"
              :key="rom.id"
              :rom="rom"
              :isNew="false"
              @update="handleExistingRomUpdate"
              @beforeEdit="(rom: RomData) => console.log('Editing ROM with data:', rom)"
            />
          </div>
          <div v-else-if="activeRoms.length > 0" class="no-results">
            No ROMs match your search criteria
          </div>
          <div v-else class="no-results">No existing ROMs found</div>
        </div>
      </div>

      <!-- Disabled ROMs Section -->
      <div class="disabled-roms" v-if="disabledRoms.length > 0">
        <div class="section-header" @click="toggleSection('disabled')">
          <h2>
            <span class="toggle-icon">{{
              sectionStates.disabled ? "▼" : "▶"
            }}</span>
            Disabled ROMs
            <span class="count"
              >({{ filteredDisabledRoms.length }} hidden)</span
            >
          </h2>
        </div>
        <div class="rom-list" v-show="sectionStates.disabled">
          <RomEditor
            v-for="rom in filteredDisabledRoms"
            :key="rom.id"
            :rom="rom"
            :isNew="false"
            @update="handleExistingRomUpdate"
            @beforeEdit="(rom: RomData) => console.log('Editing ROM with data:', rom)"
          />
        </div>
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

const sectionStates = ref({
  pending: true,
  existing: true,
  disabled: true
});

function toggleSection(section: 'pending' | 'existing' | 'disabled') {
  sectionStates.value[section] = !sectionStates.value[section];
}

// Split ROMs into active and disabled
const activeRoms = computed(() =>
  romStore.existingRoms.filter((rom) => rom.isAvailable !== false)
);

const disabledRoms = computed(() =>
  romStore.existingRoms.filter((rom) => rom.isAvailable === false)
);

// Filter both active and disabled ROMs based on search
const filteredActiveRoms = computed(() => {
  if (!searchQuery.value.trim()) {
    return activeRoms.value;
  }

  const query = searchQuery.value.toLowerCase().trim();
  return activeRoms.value.filter((rom) => {
    return (
      rom.title?.toLowerCase().includes(query) ||
      rom.developer?.toLowerCase().includes(query) ||
      rom.console?.toLowerCase().includes(query) ||
      rom.categories?.toLowerCase().includes(query) ||
      rom.filename?.toLowerCase().includes(query)
    );
  });
});

const filteredDisabledRoms = computed(() => {
  if (!searchQuery.value.trim()) {
    return disabledRoms.value;
  }

  const query = searchQuery.value.toLowerCase().trim();
  return disabledRoms.value.filter((rom) => {
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
  if (
    !rom.title ||
    !rom.year ||
    !rom.developer ||
    !rom.categories ||
    !rom.consoleid ||
    !rom.romPath
  ) {
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
      boxArtPath: rom.boxArtPath || null,
      isAvailable: true, // New ROMs are always available by default
    };

    await romStore.updateRomInfo(rom.romPath, updatePayload, rom.consoleid);
  } catch (err) {
    console.error(err);
  }
}

async function handleExistingRomUpdate(rom: RomData) {
  console.log("Handling existing ROM update:", rom);

  if (
    !rom.title ||
    !rom.year ||
    !rom.developer ||
    !rom.categories ||
    !rom.romPath
  ) {
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
      boxArtPath: rom.boxArtPath || null,
      isAvailable: rom.isAvailable ?? true, // Keep current availability or default to true
    };

    console.log("Sending update payload:", updatePayload);
    await romStore.updateExistingRom(updatePayload);
  } catch (err) {
    console.error("Error updating ROM:", err);
  }
}
</script>

<style scoped>
.disabled-roms {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 5px solid var(--border-dark-grey);
}

.disabled-count {
  font-family: var(--font-micro);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9em;
  margin-left: 1rem;
}
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

.error-message,
.loading,
.new-roms h2,
.existing-roms h2,
.disabled-roms h2,
.no-results {
  font-family: var(--font-pixelify);
}

.new-roms h2,
.existing-roms h2,
.disabled-roms h2 {
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

.section-header {
  cursor: pointer;
  user-select: none;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.section-header:hover {
  background-color: var(--blue);
}

.toggle-icon {
  display: inline-block;
  width: 20px;
  font-family: monospace;
  transition: transform 0.2s;
}

.count {
  font-family: var(--font-micro);
  color: var(--grey);
  font-size: 0.9em;
  margin-left: 0.5rem;
}

.rom-list {
  transition: max-height 0.3s ease-in-out;
}

.disabled-roms {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 5px solid var(--blue);
}
</style>
