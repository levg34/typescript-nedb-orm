import Datastore from '@seald-io/nedb'
import { IPerson, Person } from './person'
import { ORM } from '../src'
import { IPet, Pet } from './pet'

describe('test cases for several objects', () => {
    let person: Person
    let savedPerson: IPerson
    let dog: Pet

    const personData: IPerson = {
        name: 'Luc',
        email: 'luc@luc.fr'
    }

    const dogData: IPet = {
        name: 'Médor',
        type: 'dog'
    }

    let db: Datastore

    beforeAll(async () => {
        db = await ORM.getDatabase()
        await db.dropDatabaseAsync()
    })

    it('can instantiate several classes extending ORM', () => {
        person = new Person(personData)
        expect(person.email).toBe(personData.email)
        expect(person.name).toBe(personData.name)

        dog = new Pet(dogData)
        expect(dog.name).toBe(dogData.name)
        expect(dog.type).toBe(dogData.type)
    })

    it('can save an object of several classes extending ORM', async () => {
        const recordCount = await db.countAsync({ email: personData.email })
        expect(recordCount).toBe(0)
        savedPerson = await person.save()
        const recordCountAfter = await db.countAsync({ email: personData.email })
        expect(recordCountAfter).toBe(1)
        expect(savedPerson._id).toBeDefined()
        expect(savedPerson.email).toBe(personData.email)
        expect(savedPerson.name).toBe(personData.name)

        const recordCountDog = await db.countAsync({ type: 'dog' })
        expect(recordCountDog).toBe(0)
        const savedDog = await dog.save()
        const recordCountDogAfter = await db.countAsync({ type: 'dog' })
        expect(recordCountDogAfter).toBe(1)
        expect(savedDog._id).toBeDefined()
        expect(savedDog.type).toBe(dogData.type)
        expect(savedDog.name).toBe(dogData.name)
    })

    it('retrieves only the objects of the class', async () => {
        const pets = await Pet.find<IPet>()
        expect(pets.map((p) => p.name)).toContain(dogData.name)
        expect(pets.map((p) => p.name)).not.toContain(personData.name)
    })

    it('counts only the objects of the class', async () => {
        const petCount = await Pet.count()
        expect(petCount).toBe(1)
    })

    xit('updates only the objects of the class', async () => {})

    xit('removes only the objects of the class', async () => {})

    it('deletes only the concerned object without impacting the others classes object', async () => {
        const retrievedPerson = new Person(savedPerson)
        const personCount = await Person.count()
        const petCount = await Pet.count()
        await retrievedPerson.delete()
        expect(await Pet.count()).toBe(petCount)
        expect(await Person.count()).toBe(personCount - 1)
    })
})
