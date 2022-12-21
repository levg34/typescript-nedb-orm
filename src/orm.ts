import Datastore from '@seald-io/nedb'

interface IID {
    _id?: string
}

interface IORM extends IID {
    save(): void
}

export class ORM<T> implements IORM {
    private static database: Datastore
    _id?: string

    constructor() {}

    async save(): Promise<T> {
        const db = await ORM.getDatabase()
        if (this._id) {
            const { numAffected } = await db.updateAsync<T>({ _id: this._id }, this.toDocument(), {})
            if (numAffected !== 1) throw Error(numAffected+' documents updated instead of one.')
            return this.toDocument()
        } else {
            const inserted = await db.insertAsync(this.toDocument())
            return inserted
        }
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

    static async getDocs<T>(query: any): Promise<T[]> {
        const db = await ORM.getDatabase()
        const docs = await db.findAsync(query)
        return docs
    }
}
