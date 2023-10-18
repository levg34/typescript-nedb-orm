import { ORM, IID } from 'typescript-nedb-orm'

interface IPerson extends IID {
    name: string
    email: string
}

class Person extends ORM<IPerson> implements IPerson {
    name: string
    email: string

    constructor(person: IPerson) {
        super(person)
        this.name = person.name
        this.email = person.email
    }
}

async function main() {
    const person = new Person({ name: 'Alice', email: 'alice@example.com' })

    const savedPerson = await person.save()

    const persons = await Person.find<IPerson>()

    const updated = await Person.update<IPerson>({ name: 'Alice' }, { email: 'alice@new.com' })

    await new Person(savedPerson).delete()

    console.log('Saved person:', savedPerson)
    console.log('All persons:', persons)
    console.log('Updated persons:', updated)
}

main()
