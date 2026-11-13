import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {username: registerDto.username}
        });

        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        const passwordHash = await bcrypt.hash(registerDto.password, 10);

        return this.prisma.user.create({
            data: {
                username: registerDto.username,
                passwordHash: passwordHash,
                role: "PATRON"
            }
        });
    }
}
