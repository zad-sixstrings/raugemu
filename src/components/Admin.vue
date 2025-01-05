# Admin.vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserProfileStore } from "../stores/userProfile";
import { useRomStore } from "../stores/roms";
import type { RomData } from "../types/roms";

const userProfileStore = useUserProfileStore();
const romStore = useRomStore();
const router = useRouter();
const editingRom = ref<RomData | null>(null);

onMounted(async () => {
  if (!userProfileStore.profile?.id) {
    await userProfileStore.fetchProfile();
  }

  if (userProfileStore.profile?.userright !== "admin") {
    router.push("/");
    return;
  }

  await romStore.fetchNewRoms();
});

function getFileName(path: string | undefined): string {
  if (!path) return "";
  // First remove the ./dist/ROM/ prefix if it exists
  const cleanPath = path.replace(/^\.\/dist\/ROM\//, "");
  // Split by / and get the last part (the filename)
  const fileName = cleanPath.split("/").pop();
  return fileName || "";
}

function handleCategoriesInput(event: Event, rom: RomData) {
  const target = event.target as HTMLInputElement;
  if (target) {
    const categories = target.value
      .split(",")
      .map((cat: string) => cat.trim())
      .filter(Boolean);
    rom.categories = categories.length ? categories : undefined;
  }
}

async function updateRom(rom: RomData) {
  if (!rom.title || !rom.year || !rom.developer || !rom.categories) {
    romStore.error = "Please fill in all required fields";
    return;
  }

  try {
    await romStore.updateRomInfo(rom.romPath, {
      title: rom.title,
      year: rom.year,
      developer: rom.developer,
      categories: rom.categories,
    });
    editingRom.value = null;
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <div class="admin-container">
    <h1>Admin Dashboard</h1>
    <div v-if="userProfileStore.profile?.userright === 'admin'">
      <div v-if="romStore.error" class="error">
        {{ romStore.error }}
      </div>
      <div v-if="romStore.loading">Loading...</div>
      <div class="new-roms" v-else-if="romStore.roms.length > 0">
        <h2>New ROMs Detected</h2>
        <div class="rom-list">
          <div
            v-for="rom in romStore.roms"
            :key="rom.romPath"
            :class="{ editing: editingRom?.romPath === rom.romPath }"
            class="rom-item"
          >
            <div class="rom-header">
              <div class="rom-info">
                <p>Filename: {{ getFileName(rom.romPath) }}</p>
                <p>Console: {{ rom.console }}</p>
                <img
                  v-if="rom.boxArtPath"
                  :src="rom.boxArtPath.replace('./dist', '')"
                  alt="Box Art"
                  class="box-art"
                />
              </div>
              <div class="rom-actions">
                <button
                  v-if="editingRom?.romPath === rom.romPath"
                  @click="editingRom = null"
                  class="cancel-button"
                >
                  Cancel Edit
                </button>
                <button v-else @click="editingRom = rom" class="edit-button">
                  Edit ROM Info
                </button>
              </div>
            </div>
            <div v-if="editingRom?.romPath === rom.romPath" class="edit-form">
              <div class="form-group">
                <label>Title*</label>
                <input v-model="rom.title" type="text" required />
              </div>
              <div class="form-group">
                <label>Year*</label>
                <input v-model.number="rom.year" type="number" required />
              </div>
              <div class="form-group">
                <label>Developer*</label>
                <input v-model="rom.developer" type="text" required />
              </div>
              <div class="form-group">
                <label>Categories*</label>
                <input
                  type="text"
                  :value="rom.categories?.filter((c) => c !== null).join(', ')"
                  placeholder="Separate categories with commas"
                  @input="(e) => handleCategoriesInput(e, rom)"
                  required
                />
              </div>
              <button @click="updateRom(rom)" class="save-button">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <p>No new ROMs detected.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  display: flex;
  max-width: 80%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  color: white;
  background-color: red;
}

.new-roms {
  background-color: greenyellow;
}

.box-art {
  max-width: 100px;
  height: auto;
}
</style>
