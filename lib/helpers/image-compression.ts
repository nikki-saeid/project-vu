import imageCompression from 'browser-image-compression';

export async function compressImage(image: File) {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };
    return await imageCompression(image, options);
}
