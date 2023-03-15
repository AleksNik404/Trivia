import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwTAuthGuard } from 'src/auth/guards/jwt.guards';
import { FileElementResponse } from 'src/files/dto/file-element.response';
import { FilesService } from 'src/files/files.service';
import { MFile } from 'src/files/mfile.class';

@Controller('files')
export class FilesController {
  constructor(public readonly filesServise: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwTAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const lectorEtoNeTvoe: MFile[] = [new MFile(file)];

    if (file.mimetype.includes('image')) {
      const buffer = await this.filesServise.convertToWebP(file.buffer);
      lectorEtoNeTvoe.push(
        new MFile({
          originalname: `${file.originalname.split('.')[0]}.webp`,
          buffer,
        }),
      );
    }

    return this.filesServise.saveFiles(lectorEtoNeTvoe);
  }
}
