
import { v4 as uuidv4 } from 'uuid';

// S3 bucket region and name - these would be set according to your AWS setup
const REGION = import.meta.env.VITE_AWS_REGION || 'us-east-1';
const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME || 'your-bucket-name';
const BASE_URL = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/`;

/**
 * Generates a unique S3 key (path) for an image
 */
export const generateS3Key = (file: File): string => {
  const extension = file.name.split('.').pop();
  const uniqueId = uuidv4();
  return `images/${uniqueId}.${extension}`;
};

/**
 * Returns the full URL for an S3 object
 */
export const getS3Url = (key: string): string => {
  return `${BASE_URL}${key}`;
};

/**
 * Uploads a file to S3 using a pre-signed URL
 * This assumes you have a backend endpoint that generates pre-signed URLs
 */
export const uploadFileToS3 = async (file: File): Promise<string> => {
  try {
    // In a production environment, you would:
    // 1. Call your backend to get a pre-signed URL
    // 2. Use that URL to upload directly to S3
    // For now, we'll simulate this process
    
    console.log('Uploading file to S3:', file.name);
    
    // This is where you'd make an API call to your backend
    // const response = await fetch('/api/get-upload-url', {
    //   method: 'POST',
    //   body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    // const { url, key } = await response.json();
    // await fetch(url, { method: 'PUT', body: file });
    // return getS3Url(key);
    
    // Temporary: Return a placeholder URL for now
    // In a real implementation, this would return the actual S3 URL
    return `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}`;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Failed to upload image');
  }
};
