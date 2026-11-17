import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({
      data: createGenreDto
    });
  }

  findAll() {
    return this.prisma.genre.findMany();
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({where: {id: id}});

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`)
    }
    return genre;
  }

  update(id: number, updategenreDto: UpdateGenreDto) {
    return this.prisma.genre.update({
      where: {id: id},
      data: updategenreDto
    });
  }

  remove(id: number) {
    return this.prisma.genre.delete({where: {id: id}});
  }
}
