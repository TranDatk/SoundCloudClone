import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/custom-decorators/is-public-decorator';
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Follower, FollowerDocument } from 'src/followers/schemas/follower.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from 'src/tracks/schemas/track.schema';
import { ConfigService } from '@nestjs/config';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
    @InjectModel(Follower.name) private readonly followerModel: SoftDeleteModel<FollowerDocument>,
    @InjectModel(Track.name) private readonly trackModel: SoftDeleteModel<TrackDocument>
  ) { }

  @Get()
  @Public()
  @ResponseMessage("Send tracks top that user followed")
  @Cron(CronExpression.EVERY_WEEK)
  async handleTestEmail() {
    const followers = await this.followerModel.find({});

    for (const fols of followers) {
      const authors = fols?.authors;
      const tracksWithMatchingAuthors = await this.trackModel.find({
        user: { $in: authors }
      }).populate({ path: 'user', select: "name email avatar" }).sort({ createdAt: -1 });
      if (tracksWithMatchingAuthors?.length) {
        const tracks = tracksWithMatchingAuthors.map(track => {
          return {
            title: track?.title,
            view: track?.view,
            //@ts-ignore
            name: track?.user?.name,
            photo: this.configService.get<string>('RENDER_BE') + 'images/' + track?.photo
          }
        });

        await this.mailerService.sendMail({
          to: fols?.email,
          from: '"Sound Cloud Clone" <soundcloudclone@datk.com>', // override default from
          subject: 'our music journey starts here',
          template: 'mail',
          context: {
            receiver: fols?.name,
            tracks: tracks
          }
        });
      }
    }
  }
}
