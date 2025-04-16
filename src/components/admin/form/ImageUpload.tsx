
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { uploadFileToS3 } from '@/utils/s3Upload';
import { toast } from 'sonner';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload = ({ currentImageUrl, onImageUpload }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Create temporary preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Upload file to S3
    try {
      setIsUploading(true);
      const imageUrl = await uploadFileToS3(file);
      onImageUpload(imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUpload('');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="image-upload" className="text-sm font-medium">
          Image
        </label>
        {previewUrl && (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            onClick={handleRemoveImage}
            className="h-8 px-2"
          >
            <X className="h-4 w-4 mr-1" /> Remove
          </Button>
        )}
      </div>
      
      {previewUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 bg-muted">
          <div className="mb-2 rounded-full bg-muted-foreground/10 p-2">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop or click to upload
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isUploading}
            className="relative"
          >
            {isUploading ? 'Uploading...' : 'Choose Image'}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </Button>
        </div>
      )}
      
      {!previewUrl && currentImageUrl && (
        <div className="text-sm text-muted-foreground">
          <p>Current image URL: {currentImageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
