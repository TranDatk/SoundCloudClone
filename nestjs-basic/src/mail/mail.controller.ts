import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/custom-decorators/is-public-decorator';
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService
  ) { }

  @Get()
  @Public()
  @ResponseMessage("Test email")
  async handleTestEmail() {
    await this.mailerService.sendMail({
      to: "2051050098dat@ou.edu.vn",
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'test',
      context: {
        receiver: 'dat assad'
      }
    });
  }
}
