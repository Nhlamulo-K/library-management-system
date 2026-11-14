import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto.js';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

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

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {username: loginDto.username}
        });

        if (!user || !(await bcrypt.compare(loginDto.password, user.passwordHash))) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role
        };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
