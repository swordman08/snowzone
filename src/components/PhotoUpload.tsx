import { useState, useRef } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhotoUploadProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  maxPhotos?: number;
}

export const PhotoUpload = ({ photos, onPhotosChange, maxPhotos = 5 }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newPhotos = Array.from(files).filter(file => 
      file.type.startsWith('image/') && photos.length + 1 <= maxPhotos
    );
    
    const remainingSlots = maxPhotos - photos.length;
    const photosToAdd = newPhotos.slice(0, remainingSlots);
    
    if (photosToAdd.length > 0) {
      onPhotosChange([...photos, ...photosToAdd]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          dragActive 
            ? 'border-accent bg-accent/10' 
            : 'border-border/50 hover:border-border'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-muted">
            <Camera className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Drop photos here or click to upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Up to {maxPhotos} photos (PNG, JPG)
            </p>
          </div>
          <Button 
            type="button"
            variant="frost" 
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={photos.length >= maxPhotos}
          >
            <Upload className="h-4 w-4" />
            Choose Photos
          </Button>
        </div>
      </div>

      {/* Photo previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={URL.createObjectURL(photo)}
                alt={`Upload preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {photos.length}/{maxPhotos} photos added
      </p>
    </div>
  );
};
