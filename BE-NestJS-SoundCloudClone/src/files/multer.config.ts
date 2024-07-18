import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import fs from 'fs';
import { diskStorage } from "multer";
import path, { extname, join } from "path";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    getRootPath = () => {
        return process.cwd();
    };

    async ensureExists(targetDirectory: string): Promise<void> {
        try {
            await fs.promises.mkdir(targetDirectory, { recursive: true });
            // console.log('Directory successfully created, or it already exists.');
        } catch (error) {
            switch (error.code) {
                case 'EEXIST':
                    // Requested location already exists, but it's not a directory.
                    break;
                case 'ENOTDIR':
                    // The parent hierarchy contains a file with the same name as the dir
                    // you're trying to create.
                    break;
                default:
                    // Some other error like permission denied.
                    console.error(error);
                    break;
            }
        }
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            limits: {
                fileSize: 1024 * 1024 * 10,
            },
            fileFilter: (req: any, file: any, cb: any) => {
                if (file.mimetype.match(/\/(jpg|jpeg|png|gif|audio|mpeg)$/)) {
                    // Allow storage of file
                    cb(null, true);
                } else {
                    // Reject file
                    cb(new UnprocessableEntityException(
                        `Unsupported file type ${extname(file.originalname)}`),
                        false
                    );
                }
            },
            storage: diskStorage({
                destination: async (req, file, cb) => {
                    const folderPaths = {
                        images: 'public/images',
                        tracks: 'public/tracks',
                    };

                    const folderPath = file.mimetype.match(/\/(audio|mpeg)$/) ? folderPaths['tracks'] : folderPaths['images'];
                    if (folderPath) {
                        const fullPath = join(this.getRootPath(), folderPath);
                        await this.ensureExists(fullPath);

                        cb(null, fullPath);
                    } else {
                        cb(new Error('Invalid folder type'), null);
                    }
                },
                filename: (req, file, cb) => {
                    // Get image extension
                    const extName = path.extname(file.originalname);
                    // Get image's name (without extension) and remove spaces
                    const baseName = path.basename(file.originalname, extName).replace(/\s+/g, '');
                    const finalName = `${baseName}-${Date.now()}${extName}`;
                    cb(null, finalName);
                }
            })
        };
    }
}