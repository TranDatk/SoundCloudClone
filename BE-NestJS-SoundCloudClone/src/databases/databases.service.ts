import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/permissions/schemas/permission.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_GENRES, INIT_PERMISSIONS, INIT_TRACKS, USER_ROLE } from './init-data';
import { Genre, GenreDocument } from 'src/genres/schemas/genre.schemas';
import { Track, TrackDocument } from 'src/tracks/schemas/track.schema';

@Injectable()
export class DatabasesService implements OnModuleInit {
    private readonly logger = new Logger(DatabasesService.name);

    constructor(
        @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
        @InjectModel(Permission.name) private permissionModel: SoftDeleteModel<PermissionDocument>,
        @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
        @InjectModel(Genre.name) private genreModel: SoftDeleteModel<GenreDocument>,
        @InjectModel(Track.name) private trackModel: SoftDeleteModel<TrackDocument>,
        private configService: ConfigService,
        private userService: UsersService,
    ) { }

    async onModuleInit() {
        const isInit = this.configService.get<string>('SHOULD_INIT');
        if (Boolean(isInit)) {
            const permissionQuantity = await this.permissionModel.count({});
            const roleQuantity = await this.roleModel.count({});
            const userQuantity = await this.userModel.count({});
            const genreQuantity = await this.genreModel.count({});
            const trackQuantity = await this.trackModel.count({});


            if (permissionQuantity === 0) {
                await this.permissionModel.insertMany(INIT_PERMISSIONS);
            }

            if (roleQuantity === 0) {
                const permissions = await this.permissionModel.find({}).select("_id");
                const permissionsUser = await this.permissionModel.find({
                    $or: [
                        { apiPath: '/api/v1/likes', method: 'POST' },
                        { apiPath: '/api/v1/likes/check/:id', method: 'GET' },
                        { apiPath: '/api/v1/comments', method: 'POST' },
                        { apiPath: '/api/v1/likes', method: 'GET' },
                        { apiPath: '/api/v1/files/upload', method: 'POST' },
                        { apiPath: '/api/v1/tracks', method: 'POST' },
                        { apiPath: '/api/v1/tracks/user-track', method: 'GET' },
                        { apiPath: '/api/v1/tracks', method: 'GET' },
                        { apiPath: '/api/v1/playlists', method: 'POST' },
                        { apiPath: '/api/v1/playlists', method: 'GET' },
                        { apiPath: '/api/v1/playlists/:id', method: 'PATCH' },
                        { apiPath: '/api/v1/followers/:id', method: 'GET' },
                        { apiPath: '/api/v1/followers', method: 'POST' },
                        { apiPath: '/api/v1/payment/create', method: 'POST' },
                        { apiPath: '/api/v1/payment/:orderId', method: 'PUT' },
                        { apiPath: '/api/v1/payment/check/:orderId', method: 'GET' },
                        { apiPath: '/api/v1/auth/resend', method: 'POST' },
                        { apiPath: '/api/v1/auth/verify/code', method: 'GET' },
                    ]

                }).select("_id");

                await this.roleModel.insertMany([
                    {
                        name: ADMIN_ROLE,
                        description: 'Full permission',
                        isActive: true,
                        permissions: permissions
                    },
                    {
                        name: USER_ROLE,
                        description: 'The users use the web',
                        isActive: true,
                        permissions: permissionsUser
                    }
                ])
            }

            if (userQuantity === 0) {
                const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
                const userRole = await this.roleModel.findOne({ name: USER_ROLE });
                await this.userModel.insertMany([
                    {
                        _id: "6684c50ca995464eae29594b",
                        name: "I'm admin",
                        email: "admin@gmail.com",
                        password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD')),
                        age: 22,
                        gender: "MALE",
                        address: "VietNam",
                        role: adminRole._id,
                        refreshToken: null,
                        type: "CREDENTIAL",
                        avatar: 'anh1-1720166965307.jpg'
                    },
                    {
                        _id: "668cf8ff5e7d98319807efcf",
                        name: "I'm user 1",
                        email: "user1@gmail.com",
                        password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD')),
                        age: 22,
                        gender: "MALE",
                        address: "VietNam",
                        role: userRole._id,
                        refreshToken: null,
                        type: "CREDENTIAL",
                        avatar: 'anh1-1720166965307.jpg'
                    },
                    {
                        _id: "668e4c2cf538984a22937eea",
                        name: "I'm user 2",
                        email: "user2@gmail.com",
                        password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD')),
                        age: 22,
                        gender: "MALE",
                        address: "VietNam",
                        role: userRole._id,
                        refreshToken: null,
                        type: "CREDENTIAL",
                        avatar: 'anh1-1720166965307.jpg'
                    },
                ]);
            }

            if (genreQuantity === 0) {
                await this.genreModel.insertMany(INIT_GENRES);
            }

            if (trackQuantity === 0) {
                await this.trackModel.insertMany(INIT_TRACKS);
            }

            if (userQuantity > 0 && roleQuantity > 0 && permissionQuantity > 0 && genreQuantity > 0 && trackQuantity > 0) {
                this.logger.log(">>> ALREADY INIT DATA...");
            }
        }
    }
}
