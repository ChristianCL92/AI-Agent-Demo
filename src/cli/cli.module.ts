import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { CliCommand } from "./cli.command/cli.command";
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [CliService, CliCommand],
  exports: [CliService]
})
export class CliModule {}
