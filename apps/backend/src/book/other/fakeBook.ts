
import { Area, Lend } from 'src/Constants'
import { faker } from '@faker-js/faker';
import { sampleEnum } from 'src/utils/sample';


export default function fakeBook() {
    return {
        title: faker.lorem.words(10),
        author: faker.person.fullName(),
        edition: faker.date.past().toString(),
        pages: faker.number.int({ min: 10, max: 2000 }),
        area: sampleEnum(Area),
        inventory: faker.number.int({ min: 1, max: 100 }),
        lend: sampleEnum(Lend),
        userId: null,
        addedAt: faker.date.past(),
    }
}