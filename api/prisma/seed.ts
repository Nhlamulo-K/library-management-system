import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.genre.createMany({
        data: [
            {name: "Fantasy"},
            {name: "Mystery"},
            {name: "Science Fiction"},
            {name: "Romance"}
        ],
        skipDuplicates: true
    });

    const genres = await prisma.genre.findMany();

    const fantasy = genres.find(genre => genre.name === "Fantasy");
    const mystery = genres.find(genre => genre.name === "Mystery");
    const science_fiction = genres.find(genre => genre.name === "Science Fiction");
    const romance = genres.find(genre => genre.name === "Romance");

    if (!fantasy) {
        throw new Error("Fantasy genre not found");
    }

    if (!mystery) {
        throw new Error("Mystery genre not found");
    }

    if (!science_fiction) {
        throw new Error("Science Fiction genre not found");
    }

    if (!romance) {
        throw new Error("Romance genre not found");
    }

    const books = [
        {
            title: "The Hobbit", 
            author: "J.R.R. Tolkien", 
            isbn: "9780261102217",
            totalCopies: 2,
            genreId: fantasy.id 
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J.K. Rowling",
            isbn: "9781408894620",
            totalCopies: 5, 
            genreId: fantasy.id
        },
        {
            title: "The Name of the Wind",
            author: "Patrick Rothfuss",
            isbn: "9780756404741",
            totalCopies: 1,
            genreId: fantasy.id
        },
        {
            title: "The Fellowship of the Ring",
            author: "J.R.R. Tolkien",
            isbn: "9780261102354",
            totalCopies: 3,
            genreId: fantasy.id
        },
        {
            title: "The Lion, the Witch and the Wardrobe",
            author: "C.S. Lewis",
            isbn: "9780006716778",
            totalCopies: 2,
            genreId: fantasy.id
        },
        {
            title: "Gone Girl",
            author: "Gillian Flynn",
            isbn: "9780753827666",
            totalCopies: 5,
            genreId: mystery.id
        },
        {
            title: "The Girl with the Dragon Tattoo",
            author: "Stieg Larsson",
            isbn: "9780857054036",
            totalCopies: 1,
            genreId: mystery.id
        },
        {
            title: "The Hound of the Baskervilles",
            author: "Arthur Conan Doyle",
            isbn: "9780141199177",
            totalCopies: 3,
            genreId: mystery.id
        },
        {
            title: "Murder on the Orient Express",
            author: "Agatha Christie",
            isbn: "9780007527502",
            totalCopies: 4,
            genreId: mystery.id
        },
        {
            title: "The Silent Patient",
            author: "Alex Michaelides",
            isbn: "9781409181637",
            totalCopies: 1,
            genreId: mystery.id
        },
        {
            title: "Dune",
            author: "Frank Herbert",
            isbn: "9780441172719",
            totalCopies: 2,
            genreId: science_fiction.id
        },
        {
            title: "1984",
            author: "George Orwell",
            isbn: "9780141036144",
            totalCopies: 3,
            genreId: science_fiction.id
        },
        {
            title: "Foundation",
            author: "Isaac Asimov",
            isbn: "9780008117498",
            totalCopies: 4,
            genreId: science_fiction.id
        },
        {
            title: "The Martian",
            author: "Andy Weir",
            isbn: "9780091956141",
            totalCopies: 1,
            genreId: science_fiction.id
        },
        {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            isbn: "9780143105428",
            totalCopies: 5,
            genreId: romance.id
        }
    ];

    for (const book of books) {
        await prisma.book.upsert({
            where: {
                isbn: book.isbn
            },
            update: {
                title: book.title,
                author: book.author,
                totalCopies: book.totalCopies,
                genreId: book.genreId
            },
            create: book
        });
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
