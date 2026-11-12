import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
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

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
