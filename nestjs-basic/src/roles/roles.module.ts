import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { IsUniqueConstraint } from 'src/custom-decorators/unique.decorator';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Role.name, schema: RoleSchema,
    }]),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    IsUniqueConstraint,
  ],
  exports: [RolesService]
})
export class RolesModule { }
