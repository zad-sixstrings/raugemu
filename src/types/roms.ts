export interface RomData {
  id?: string;           
  title?: string;       
  romPath: string;      
  boxArtPath?: string;  
  year?: number;        
  console?: string;
  consoleid: string;    
  developer?: string;   
  categories?: string[];
  filename?: string;    // Added filename field
}

export interface RomUpdatePayload {
  title: string;
  year: number;
  developer: string;
  categories: string[];
}

export interface ExistingRomUpdatePayload extends RomUpdatePayload {
  id: string;  
  romPath: string;
  boxArtPath?: string;
  consoleid: string;
}