export interface ImageData {
  id: string;
  url: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
  category?: string;
  uploadedAt?: Date;
}

export interface GalleryProps {
  images: ImageData[];
  columns?: number;
}
