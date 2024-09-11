import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './endpoints/user/user.module';
import { configService } from './config/env.config.service';
import { AiModule } from './endpoints/ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(configService.typeOrmAsyncConfig),
    UserModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
