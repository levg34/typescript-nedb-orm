import { ORM } from 'typescript-nedb-orm'

/**
 * @typedef {Object} IPerson
 * @property {string} name
 * @property {string} email
 */

class Person extends ORM {
    /**
     * @param {IPerson} person
     */
    constructor(person) {
        super(person)
        this.name = person.name
        this.email = person.email
    }
}

async function main() {
    const person = new Person({ name: 'Alice', email: 'alice@example.com' })

    const savedPerson = await person.save()

    const persons = await Person.find()

    const updated = await Person.update({ name: 'Alice' }, { email: 'alice@new.com' })

    await new Person(savedPerson).delete()

    console.log('Saved person:', savedPerson)
    console.log('All persons:', persons)
    console.log('Updated persons:', updated)
}

main()

export default Person
