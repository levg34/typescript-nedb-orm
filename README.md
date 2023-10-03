# typescript-nedb-orm

ORM for [@seald-io/nedb](https://github.com/seald/nedb) written in TypeScript

![Deploy NPM Package](https://github.com/levg34/typescript-nedb-orm/actions/workflows/npm-publish.yml/badge.svg)
[![codecov](https://codecov.io/gh/levg34/typescript-nedb-orm/graph/badge.svg?token=MDFK0S9ZBB)](https://codecov.io/gh/levg34/typescript-nedb-orm)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

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
await person.delete()
```

Update your objects in db:

```typescript
const updated: number = await Person.update<IPerson>(
    {
        name: 'Luc'
    },
    {
        email: 'luc@new.fr'
    }
)
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
const foundById: IPerson | null = await Person.findById<IPerson>('kpOBxczJlr2R5S68')
```

Count the number of objects in db:

```typescript
const count: number = await Person.count<IPerson>()
```

Have fun! :)

## Contributing

Thank you for your interest in contributing to the TypeScript-NEDB-ORM! Contributions are valued and help enhance this project.

### How to Contribute

1. Fork the repository and create your branch from `main`.
2. Clone the forked repository to your local machine.
3. Install the required dependencies using `npm install`.
4. Make your changes, following these coding style guidelines:
    - No semicolon at the end of lines.
    - Use single quotes instead of double quotes.
    - Indent with 4 spaces for TS and JS files, and 2 spaces for JSON or HTML.
5. Ensure that the code passes the coverage requirements:
    - Add tests for the changes made.
    - Run `npx jest -- --coverage` to check if the code passes the coverage requirements.
6. Update the documentation (`README.md`) to reflect your changes.
7. Commit your changes and push them to your forked repository.
8. Create a pull request to the `main` branch of the original repository.

### Reporting Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/levg34/typescript-nedb-orm/issues) on GitHub.

Thank you for your contributions! This project is maintained by one person, and your efforts are greatly appreciated.

## License

This project is licensed under the [GNU General Public License v3.0 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.en.html) - see the [LICENSE](LICENSE) file for details.
