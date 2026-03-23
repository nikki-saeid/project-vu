import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
import { storageRepository } from '../repositories/storage.repository';

export const storageService = {
    // resize image to webp format
    resizeImageToWebp: async function (file: File, width: number, height: number) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return await sharp(buffer).resize(width, height).webp({ quality: 80 }).toBuffer();
    },

    uploadAfterResize: async function (path: string, file: File | null, width: number, height: number) {
        if (!(file instanceof File)) {
            throw { error: new Error('Missing file'), status: StatusCodes.BAD_REQUEST };
        }

        const buffer = await this.resizeImageToWebp(file, width, height);

        return await storageRepository.upload(path, buffer);
    },
};
