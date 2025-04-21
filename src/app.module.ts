import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectModule } from './connect/connect.module';
import { ConfigModule } from '@nestjs/config';
import { CliModule } from './cli/cli.module';

@Module({
  imports: [
    ConnectModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CliModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
