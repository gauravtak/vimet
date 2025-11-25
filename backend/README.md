To create a migration:

- npx typeorm migration:create ./src/migrations/create-user-table

To run a migration:

- npx typeorm-ts-node-esm migration:run -- -d ./src/data-source.ts
