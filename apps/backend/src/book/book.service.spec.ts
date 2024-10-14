import { Test, TestingModule } from '@nestjs/testing'
import { BookService } from './book.service'
import { PrismaService } from 'src/core/prisma/prisma.service'
import fakeBook from './other/fakeBook'



describe('BookService', () => {
    let bookService: BookService
    let prismaService: PrismaService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BookService, PrismaService],
        }).compile();
        bookService = module.get<BookService>(BookService)
        prismaService = module.get<PrismaService>(PrismaService);
    })


    it('should be defined', () => {
        expect(bookService).toBeDefined();
    })


    it('should create a new book', async () => {
        const bookData = fakeBook();

        const book = await bookService.create(bookData);


        expect(book).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String),
                author: expect.any(String),
                edition: expect.any(String),
                area: expect.any(String),
                inventory: expect.any(Number),
                lend: expect.any(String),
                userId: null,
                pages: expect.any(Number),
                addedAt: expect.any(Date),
            })
        )

    })

})