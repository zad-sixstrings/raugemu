export interface RomData {
  id?: string;          
  title?: string;      
  romPath: string;      
  boxArtPath?: string | null;  
  year?: number;        
  console?: string;
  consoleid: string;    
  developer?: string;  
  categories?: string;  
  filename?: string;
  isAvailable: boolean;
}

export interface RomUpdatePayload {
  title: string;
  year: number;
  developer: string;
  categories: string;
  boxArtPath: string | null;
  romPath: string;
  isAvailable: boolean;
}