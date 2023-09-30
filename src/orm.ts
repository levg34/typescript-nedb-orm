import Datastore from '@seald-io/nedb'

export interface IID {
    _id?: string
}

interface IORM extends IID {
    save(): void
}

export class ORM<T extends IID> implements IORM {
    private static database: Datastore
    _id?: string

    constructor(t: T) {
        if (t._id) this._id = t._id
    }

    async save(): Promise<T> {
        const db = await ORM.getDatabase()
        if (this._id) {
            const { numAffected } = await db.updateAsync<T>({ _id: this._id }, this.toDocument(), {})
            if (numAffected !== 1) throw Error(numAffected + ' documents updated instead of one.')
            return this.toDocument()
        } else {
            const inserted = await db.insertAsync(this.toDocument())
            return inserted
        }
    }

    async delete(): Promise<boolean> {
        const db = await ORM.getDatabase()
        if (this._id) {
            const deleted = await db.removeAsync({ _id: this._id }, { multi: false })
            return deleted === 1
        }
        return false
    }

    toDocument(): T {
        return JSON.parse(JSON.stringify(this))
    }

    static async getDatabase(): Promise<Datastore<any>> {
        if (!ORM.database) {
            ORM.database = new Datastore({
                filename: 'data/datafile.json',
                autoload: true
            })
        }
        return ORM.database
    }

    static async find<T>(query: Partial<T>): Promise<T[]> {
        const db = await ORM.getDatabase()
        const docs = await db.findAsync(query)
        return docs
    }

    static async findOne<T>(query: Partial<T>): Promise<T | null> {
        const db = await ORM.getDatabase()
        const doc = await db.findOneAsync(query)
        return doc
    }

    static async update<T>(query: Partial<T>, update: Partial<T>, options?: any): Promise<number> {
        const db = await ORM.getDatabase()
        const { numAffected } = await db.updateAsync(query, { $set: update }, options)
        return numAffected
    }

    static async remove<T>(query: Partial<T>, options?: any): Promise<number> {
        const db = await ORM.getDatabase()
        const numRemoved = await db.removeAsync(query, options)
        return numRemoved
    }

    static async findById<T>(id: string): Promise<T | null> {
        const db = await ORM.getDatabase()
        const doc = await db.findOneAsync({ _id: id })
        return doc
    }


    static async count<T>(condition: any): Promise<number> {
        const db = await ORM.getDatabase()
        const count = await db.countAsync(condition)
        return count
    }
}
