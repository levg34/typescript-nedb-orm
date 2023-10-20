import { ORM } from '../src'
import { Person } from './person'

describe('test edge cases for orm.ts', () => {
    it('should throw an error if update fails', async () => {
        const mockUpdate = jest.fn().mockResolvedValue({ numAffected: 0 })
        ORM.getDatabase = jest.fn().mockResolvedValue({ updateAsync: mockUpdate })
        const person = new Person({ _id: '123', name: 'Luc', email: 'luc@luc.fr' })
        await expect(person.save()).rejects.toThrow('0 documents updated instead of one.')
    })

    it('should throw an error if delete fails', async () => {
        const mockRemove = jest.fn().mockResolvedValue(0)
        ORM.getDatabase = jest.fn().mockResolvedValue({ removeAsync: mockRemove })
        const person = new Person({ _id: '123', name: 'Luc', email: 'luc@luc.fr' })
        await expect(person.delete()).rejects.toThrow('Could not delete the document with _id=123')
    })
})
