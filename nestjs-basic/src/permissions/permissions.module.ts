import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './schemas/permission.schema';
import { IsUniqueConstraint } from 'src/custom-decorators/unique.decorator';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Permission.name, schema: PermissionSchema,
    }]),
  ],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    IsUniqueConstraint,
  ]
})
export class PermissionsModule { }
