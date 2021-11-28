# Backend DevBook
### Tecnologias:
   - Typescript
   - Express
   - TypeORM
   - PostgreSQL
   - Json Web Token

# 
``` typescript
//Desenvolvimento/testes
module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   // "ssl" : true,
   // "extra": {
   //    "ssl": {
   //       rejectUnauthorized: false
   //    }
   // },
   "entities": ["src/entities/*.ts"],
   "migrations": ["src/database/migrations/*.ts"],
   "cli": {
      "migrationsDir": "src/database/migrations",
      "entitiesDir": "src/entities"
   },
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
}
```
``` txt 
"[src]" para "[dist]"
```
 
``` typescript
//Produção
module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "ssl" : true,
   "extra": {
      "ssl": {
         rejectUnauthorized: false
      }
   },
   "entities": ["dist/entities/*.js"],
   "migrations": ["dist/database/migrations/*.js"],
   "cli": {
      "migrationsDir": "src/database/migrations",
      "entitiesDir": "src/entities"
   },
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
}
```