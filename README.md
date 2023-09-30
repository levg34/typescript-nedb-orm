# typescript-nedb-orm
ORM for [@seald-io/nedb](https://github.com/seald/nedb) written in TypeScript

![Deploy NPM Package](https://github.com/levg34/typescript-nedb-orm/actions/workflows/npm-publish.yml/badge.svg)

[![codecov](https://codecov.io/gh/levg34/typescript-nedb-orm/graph/badge.svg?token=MDFK0S9ZBB)](https://codecov.io/gh/levg34/typescript-nedb-orm)

## How to install

```bash
npm install typescript-nedb-orm
```

or

```bash
yarn add typescript-nedb-orm
```

or

```bash
pnpm add typescript-nedb-orm
```

## How to use

Create an objet extending ORM, parametrised with your class fields interface

Example:

```typescript
import { IID, ORM } from 'typescript-nedb-orm'

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
```

Then, you can use it.

Create your object as you would normaly:

```typescript
const person = new Person({
    name: 'Luc',
    email: 'luc@luc.fr'
})
```

Save your object:

```typescript
const savedPerson: IPerson = await person.save()
```

Fetch your objects in db:

```typescript
const retrievedPersons: IPerson[] = await Person.find<IPerson>({
    email: 'luc@luc.fr'
})
```

Delete your object:

```typescript
const deleted: boolean = await person.delete()
```

Update your objects in db:

```typescript
const updated: number = await Person.update<IPerson>({
    name: 'Luc'
}, {
    email: 'luc@new.fr'
})
```

Remove your objects in db:

```typescript
const removed: number = await Person.remove<IPerson>({
    email: 'luc@new.fr'
})
```

Find one object in db:

```typescript
const found: IPerson | null = await Person.findOne<IPerson>({
    name: 'Luc'
})
```

Find an object by id in db:

```typescript
const foundById: IPerson | null = await Person.findById<IPerson>('1234567890')
```

Count the number of objects in db:

```typescript
const count: number = await Person.count<IPerson>()
```

Have fun! :)
