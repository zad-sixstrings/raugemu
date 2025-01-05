import { defineStore } from "pinia";
import { ref } from "vue";
import type { RomData, RomUpdatePayload, ExistingRomUpdatePayload } from "../types/roms";
import { romApi } from "../services/api";

export const useRomStore = defineStore("rom", () => {
  const newRoms = ref<RomData[]>([]);
  const existingRoms = ref<RomData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchNewRoms() {
    try {
      loading.value = true;
      error.value = null;
      newRoms.value = await romApi.getNewRoms();
    } catch (err) {
      console.error("Get ROM list error:", err);
      error.value = "Failed to load new ROMs";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchAllRoms() {
    try {
      loading.value = true;
      error.value = null;
      existingRoms.value = await romApi.getAllRoms();
    } catch (err) {
      console.error("Get all ROMs error:", err);
      error.value = err instanceof Error ? err.message : "Failed to load existing ROMs";
      existingRoms.value = [];
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateRomInfo(romPath: string, updateData: RomUpdatePayload, consoleid: string) {
    try {
      loading.value = true;
      error.value = null;

      const rom = newRoms.value.find(r => r.romPath === romPath);
      if (!rom) {
        throw new Error("ROM not found in current list");
      }

      await romApi.updateRomInfo(romPath, updateData, consoleid);
      
      // Remove the updated ROM from the new ROMs list
      newRoms.value = newRoms.value.filter(rom => rom.romPath !== romPath);
      
      // Refresh the existing ROMs list
      await fetchAllRoms();
    } catch (err) {
      error.value = "Failed to update ROM information";
      console.error("Update ROM error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateExistingRom(updateData: ExistingRomUpdatePayload) {
    try {
      loading.value = true;
      error.value = null;

      await romApi.updateExistingRom(updateData);
      
      // Refresh the existing ROMs list
      await fetchAllRoms();
    } catch (err) {
      error.value = "Failed to update existing ROM";
      console.error("Update existing ROM error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    newRoms,
    existingRoms,
    loading,
    error,
    fetchNewRoms,
    fetchAllRoms,
    updateRomInfo,
    updateExistingRom
  };
});