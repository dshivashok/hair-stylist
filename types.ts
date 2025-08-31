export interface Hairstyle {
  id: string;
  name: string;
  prompt: string;
  imageUrl: string;
  gender: 'male' | 'female';
}

export interface AnalysisResult {
  rating: number;
  advice: string;
  products: string[];
}

export interface UserImage {
  file: File;
  dataUrl: string;
}

export type AppStep = 'upload' | 'selectStyle' | 'processing' | 'result';