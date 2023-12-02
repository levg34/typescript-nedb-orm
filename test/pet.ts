import { IID, ORM } from '../src/'

export interface IPet extends IID {
    name: string
    type: 'cat' | 'dog' | 'rabbit'
}

export class Pet extends ORM<IPet> implements IPet {
    name: string
    type: 'cat' | 'dog' | 'rabbit'
    constructor(pet: IPet) {
        super(pet)
        this.name = pet.name
        this.type = pet.type
    }
}
