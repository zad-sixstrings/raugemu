export interface RomData {
    title?: string;         // Optional as it might be missing for new ROMs
    romPath: string;        // Full path to the ROM file
    boxArtPath?: string;    // Optional path to box art
    year?: number;          // Optional as it might be missing for new ROMs
    console?: string;
    consoleid: string;       // Optional, can be derived from path
    developer?: string;     // Optional as it might be missing for new ROMs
    categories?: string[];  // Optional as it might be missing for new ROMs
  }
  
  export interface RomUpdatePayload {
    title: string;
    year: number;
    developer: string;
    categories: string[];
  }