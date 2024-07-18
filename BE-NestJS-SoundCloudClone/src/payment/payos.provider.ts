import { ConfigService } from "@nestjs/config";
import PayOS from "@payos/node";


export const PayOSProvider = {
    provide: 'PAYOS',
    useFactory: (configService: ConfigService) => {
        return new PayOS(
            configService.get<string>('PAYOS_CLIENT_ID'),
            configService.get<string>('PAYOS_API_KEY'),
            configService.get<string>('PAYOS_CHECKSUM_KEY'),
        );
    },
    inject: [ConfigService],
};
