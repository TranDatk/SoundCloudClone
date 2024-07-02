import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { Permission, PermissionSchema } from 'src/permissions/schemas/permission.schema';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';
import { UsersService } from 'src/users/users.service';
import { Genre, GenreSchema } from 'src/genres/schemas/genre.schemas';
import { Track, TrackSchema } from 'src/tracks/schemas/track.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name, schema: UserSchema,
      },
      {
        name: Permission.name, schema: PermissionSchema,
      },
      {
        name: Role.name, schema: RoleSchema,
      },
      {
        name: Genre.name, schema: GenreSchema,
      },
      {
        name: Track.name, schema: TrackSchema,
      }
    ]),
    ConfigModule
  ],
  controllers: [DatabasesController],
  providers: [DatabasesService, UsersService]
})
export class DatabasesModule { }
