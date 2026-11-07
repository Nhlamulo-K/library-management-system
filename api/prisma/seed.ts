import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.genre.createMany({
        data: [
            {name: "Fantasy"},
            {name: "Mystery"},
            {name: "Science Fiction"},
            {name: "Romance"}
        ]
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
    await prisma.book.createMany({
        data: [
            {
                title: "The Hobbit", 
                author: "J.R.R. Tolkien", 
                genreId: fantasy.id 
            },
            {
                title: "Harry Potter and the Philosopher's Stone",
                author: "J.K. Rowling",
                genreId: fantasy.id
            },
            {
                title: "The Name of the Wind",
                author: "Patrick Rothfuss",
                genreId: fantasy.id
            },
            {
                title: "The Fellowship of the Ring",
                author: "J.R.R. Tolkien",
                genreId: fantasy.id
            },
            {
                title: "The Lion, the Witch and the Wardrobe",
                author: "C.S. Lewis",
                genreId: fantasy.id
            },
            {
                title: "Gone Girl",
                author: "Gillian Flynn",
                genreId: mystery.id
            },
            {
                title: "The Girl with the Dragon Tattoo",
                author: "Stieg Larsson",
                genreId: mystery.id
            },
            {
                title: "The Hound of the Baskervilles",
                author: "Arthur Conan Doyle",
                genreId: mystery.id
            },
            {
                title: "Murder on the Orient Express",
                author: "Agatha Christie",
                genreId: mystery.id
            },
            {
                title: "The Silent Patient",
                author: "Alex Michaelides",
                genreId: mystery.id
            },
            {
                title: "Dune",
                author: "Frank Herbert",
                genreId: science_fiction.id
            },
            {
                title: "1984",
                author: "George Orwell",
                genreId: science_fiction.id
            },
            {
                title: "Foundation",
                author: "Isaac Asimov",
                genreId: science_fiction.id
            },
            {
                title: "The Martian",
                author: "Andy Weir",
                genreId: science_fiction.id
            },
            {
                title: "Pride and Prejudice",
                author: "Jane Austen",
                genreId: romance.id
            }
        ]
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
