// stores/roms.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type { RomData, RomUpdatePayload } from "../types/roms";

export const useRomStore = defineStore("rom", () => {
  const roms = ref<RomData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchNewRoms() {
    try {
      loading.value = true;
      error.value = null;
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log('Making request to:', `${import.meta.env.VITE_API_URL}/roms/checknewroms`);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/roms/checknewroms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      // Clone response for text reading
      const responseClone = response.clone();
      const textData = await responseClone.text();
      console.log('Raw response text:', textData);

      if (!response.ok) {
        throw new Error(`Failed to fetch ROM list: ${response.status} ${response.statusText}`);
      }

      // Only try to parse if we have content
      if (textData.trim()) {
        const data = JSON.parse(textData);
        console.log('Parsed data:', data);
        roms.value = data;
      } else {
        console.log('No content received, setting empty array');
        roms.value = [];
      }

    } catch (err) {
      console.error("Get ROM list error:", err);
      error.value = "Failed to load ROMs";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateRomInfo(romPath: string, updateData: RomUpdatePayload) {
    try {
      loading.value = true;
      error.value = null;
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
  
      // Find the ROM in our store to get its consoleid
      const rom = roms.value.find(r => r.romPath === romPath);
      if (!rom) {
        throw new Error("ROM not found in current list");
      }
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/roms/registernewroms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          romPath,
          consoleid: rom.consoleid,
          boxArtPath: rom.boxArtPath,  // Include the consoleid from the ROM data
          ...updateData,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update ROM information");
      }
  
      // Remove the updated ROM from the list
      roms.value = roms.value.filter(rom => rom.romPath !== romPath);
  
    } catch (err) {
      error.value = "Failed to update ROM information";
      console.error("Update ROM error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    roms,
    loading,
    error,
    fetchNewRoms,
    updateRomInfo
  };
});