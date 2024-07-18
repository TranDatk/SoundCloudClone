import { Controller, Get, Logger } from "@nestjs/common";
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from "@nestjs/terminus";
import { Public } from "src/custom-decorators/is-public-decorator";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('permissions')
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: MongooseHealthIndicator,
    ) { }
    @Get()
    @Public()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
        ]);
    }

    @Cron(CronExpression.EVERY_10_MINUTES)
    async restartRender() {
        const res = await fetch('https://soundcloudclone-nest.onrender.com/api/v1/genres');
        if (res) {
            const logger = new Logger('render.com');
            logger.log('Cronjob restart successfully!')
        }
    }
}
