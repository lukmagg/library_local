# librarymanager
This is a library management platform to get tracking of inventory, lending, and users as well. This is a work in progress and is not ready for production use. Enjoy is granted.

To build this project you will need to have the following installed:

- yarn
- turbo-cli


## Getting Started

To get started you will need to install the dependencies for the project. This can be done by running the following command at root of the project:

```bash
yarn
```

Once the dependencies are installed you can start the database by running the following command:

```bash
turbo db:generate
```

This will generate the database. You can then start the server by running the following command:

```bash
turbo dev
```

This will start the server and you can access the application at http://localhost:3001 for NextJS app, and http://localhost:3000/graphql for the GraphQL playground.


Excecute the "mutation" executeSeed, to populate the database


## Building

To build the project you can run the following command:

```bash
turbo build
```

This will build the project and output the files to the `dist` folder.