import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto
    });
  }

  findAll(genreId?: string, search?: string, page = 1, limit = 10) {
    const where: Prisma.BookWhereInput = {};
    const skip = (page - 1) * limit;

    if (genreId) {
      where.genreId = Number(genreId)
    }
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          author: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }

    return this.prisma.book.findMany({
      where: where,
      skip: skip,
      take: limit,
      include: {
        genre: true
      }
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: {id: id},
      include: {genre: true}
    });
    if (!book){
      throw new NotFoundException(`Book with ${id} not found`);
    }

    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: {id: id},
      data: updateBookDto
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({
      where: {id: id}
    });
  }
}
