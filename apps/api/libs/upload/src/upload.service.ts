import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  private readonly uploadsDirectory = 'uploads';
  private readonly uploadsPath = join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    this.uploadsDirectory,
  );

  constructor() {
    this.ensureUploadsDirectory();
  }

  /**
   *
   * @param file
   * @param subPaths
   * @returns The relative path to the uploaded file
   * @description Uploads a file to the server and returns the relative path to the file.
   */
  async uploadFile(
    file: Express.Multer.File,
    subPaths?: string[],
  ): Promise<string> {
    await this.ensureUploadsSubDirectory(subPaths);

    const filePath = join(
      this.uploadsPath,
      ...(subPaths || []),
      file.originalname,
    );
    await fs.writeFile(filePath, file.buffer);

    return join(this.uploadsDirectory, ...(subPaths || []), file.originalname);
  }

  public async deleteFile(relativeFilePath: string) {
    const filePath = join(this.uploadsPath, relativeFilePath);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting file: ${filePath}`, error);
    }
  }

  private async ensureUploadsDirectory() {
    try {
      await fs.access(this.uploadsPath);
    } catch {
      await fs.mkdir(this.uploadsPath, { recursive: true });
    }
  }

  private async ensureUploadsSubDirectory(subPaths: string[]) {
    const subDir = join(this.uploadsPath, ...subPaths);
    try {
      await fs.access(subDir);
    } catch {
      await fs.mkdir(subDir, { recursive: true });
    }
  }
}
