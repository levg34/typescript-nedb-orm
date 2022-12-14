import Datastore from '@seald-io/nedb'
import { ORM } from '../src/orm'
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
    
    it ('can save an object', async () => {
        const recordCount = await db.countAsync({email: params.email})
        expect(recordCount).toBe(0)
        savedPerson = await person.save()
        const recordCountAfter = await db.countAsync({email: params.email})
        expect(recordCountAfter).toBe(1)
        expect(savedPerson._id).toBeDefined()
        expect(savedPerson.email).toBe(params.email)
        expect(savedPerson.name).toBe(params.name)
    })
    
    it ('can retrieve an object', async () => {
        retrievedPerson = (await Person.find<IPerson>({
            email: params.email
        }))[0]
        expect(retrievedPerson._id).toBeDefined()
        expect(retrievedPerson.email).toBe(params.email)
        expect(retrievedPerson.name).toBe(params.name)
    })
    
    const newMail = 'luc2@luc.fr'
    it ('can edit an object', async () => {
        retrievedPerson.email = newMail
        const editedPerson = new Person(retrievedPerson)
        const personAfterEdit = await editedPerson.save()
        expect(personAfterEdit._id).toBeDefined()
        expect(personAfterEdit._id).toBe(savedPerson._id)
        expect(personAfterEdit.email).toBe(newMail)
        expect(personAfterEdit.name).toBe(params.name)
    })

    it ('editing does not create a new object', async () => {
        const recordCount = await db.countAsync({email: newMail})
        expect(recordCount).toBe(1)
    })
})
