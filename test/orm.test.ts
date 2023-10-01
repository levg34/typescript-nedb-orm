import Datastore from '@seald-io/nedb'
import { ORM } from '../src'
import { IPerson, Person } from "./person"

describe('instantiate, save, read, edit and delete', () => {
    let person: Person
    let retrievedPerson: IPerson
    let savedPerson: IPerson

    const params = {
        name: 'Luc',
        email: 'luc@luc.fr'
    }
    let db: Datastore

    beforeAll(async () => {
        db = await ORM.getDatabase()
        await db.dropDatabaseAsync()
    })

    it('can instantiate an ORM', () => {
        person = new Person(params)
        expect(person.email).toBe(params.email)
        expect(person.name).toBe(params.name)
    })

    it('can save an object', async () => {
        const recordCount = await db.countAsync({ email: params.email })
        expect(recordCount).toBe(0)
        savedPerson = await person.save()
        const recordCountAfter = await db.countAsync({ email: params.email })
        expect(recordCountAfter).toBe(1)
        expect(savedPerson._id).toBeDefined()
        expect(savedPerson.email).toBe(params.email)
        expect(savedPerson.name).toBe(params.name)
    })

    it('can retrieve an object', async () => {
        retrievedPerson = (await Person.find<IPerson>({
            email: params.email
        }))[0]
        expect(retrievedPerson._id).toBeDefined()
        expect(retrievedPerson.email).toBe(params.email)
        expect(retrievedPerson.name).toBe(params.name)
    })

    const newMail = 'luc2@luc.fr'
    it('can edit an object', async () => {
        retrievedPerson.email = newMail
        const editedPerson = new Person(retrievedPerson)
        const personAfterEdit = await editedPerson.save()
        expect(personAfterEdit._id).toBeDefined()
        expect(personAfterEdit._id).toBe(savedPerson._id)
        expect(personAfterEdit.email).toBe(newMail)
        expect(personAfterEdit.name).toBe(params.name)
    })

    it('editing does not create a new object', async () => {
        const recordCount = await db.countAsync({ email: newMail })
        expect(recordCount).toBe(1)
    })

    it('can delete an object', async () => {
        const personToDelete = await Person.find<IPerson>({ email: newMail })
        const deletePerson = async () => await new Person(personToDelete[0]).delete()
        expect(deletePerson).not.toThrow()
        const recordCount = await db.countAsync({ email: newMail })
        expect(recordCount).toBe(0)
    })

    it('can find one among many', async () => {
        const person1 = new Person({
            name: 'Luc',
            email: 'luc@luc.fr'
        })
        await person1.save()
        const person2 = new Person({
            name: 'Luc',
            email: 'luc2@luc.fr'
        })
        await person2.save()
        const person = await Person.findOne({ name: 'Luc' })
        expect(person?.name).toEqual('Luc')
    })

    it('can update several objects', async () => {
        const updated = await Person.update({ name: 'Luc' }, { name: 'Lucie' })
        expect(updated).toBe(2)
        const persons = await Person.find<IPerson>({ name: 'Lucie' })
        expect(persons).toContainEqual<IPerson>({
            _id: expect.any(String),
            name: 'Lucie',
            email: 'luc@luc.fr'
        })
        expect(persons).toContainEqual<IPerson>({
            _id: expect.any(String),
            name: 'Lucie',
            email: 'luc2@luc.fr'
        })
    })
    
    it('can count the objects', async () => {
        const count = await Person.count({ name: 'Lucie' })
        expect(count).toBe(2)
    })

    it('can count all objects', async () => {
        const count = await Person.count()
        expect(count).toBe(2)
    })

    it('can find all objects', async () => {
        const persons = await Person.find()
        expect(persons).toContainEqual<IPerson>({
            _id: expect.any(String),
            name: 'Lucie',
            email: 'luc@luc.fr'
        })
        expect(persons).toContainEqual<IPerson>({
            _id: expect.any(String),
            name: 'Lucie',
            email: 'luc2@luc.fr'
        })
    })

    it('can remove several objects', async () => {
        const removed = await Person.remove({ name: 'Lucie' })
        expect(removed).toBe(2)
    })

    it('can find an object by id', async () => {
        const person = new Person({
            name: 'Luc',
            email: 'luc@luc.fr'
        })
        const savedPerson = await person.save()
        const foundPerson = await Person.findById(savedPerson._id as string)
        expect(foundPerson).toEqual(savedPerson)
    })
})
