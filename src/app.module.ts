import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Module({
   imports: [UsersModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
