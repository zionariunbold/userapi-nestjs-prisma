// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true, createdAt: true },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    let data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, createdAt: true },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
