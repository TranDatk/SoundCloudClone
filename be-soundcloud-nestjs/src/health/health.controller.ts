import { Controller, Get } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from "@nestjs/terminus";
import { Public } from "src/custom-decorators/is-public-decorator";

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
    restartRender() {
        fetch('https://soundcloudclone-nest.onrender.com/api/v1/genres')
    }
}
