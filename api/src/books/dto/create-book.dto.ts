import { IsISBN, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    author!: string;

    @IsISBN('13')
    @IsISBN()
    isbn!: string;

    @IsInt()
    @Min(0)
    totalCopies!: number;

    @IsInt()
    @Min(1)
    genreId!: number;
}
