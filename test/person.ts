import { IID, ORM } from '../src/'

export interface IPerson extends IID {
    name: string
    email: string
}

export class Person extends ORM<IPerson> implements IPerson {
    name: string
    email: string
    constructor(person: IPerson) {
        super(person)
        this.name = person.name
        this.email = person.email
    }
}
