# Units Dashboard DDD Express Back End

A API to create, read, update and delete **Units**, **Locations** and **Assets**. A Domain Driven Design API using MongoDB and Express. This project is related to Assets Dashboard Front End from Tractian Front End Engineer Challenge.

## Dependencies

<div>
  <img width="30" src="https://pics.freeicons.io/uploads/icons/png/14678610731551953708-512.png" /> TypeScript &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="30" src="https://pics.freeicons.io/uploads/icons/png/15056343581551942278-512.png" /> Node &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="30" src="https://pics.freeicons.io/uploads/icons/png/2160067051553750371-512.png" /> MongoDB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="30" src="https://pics.freeicons.io/uploads/icons/png/15889022741579517836-512.png" /> Docker
</div>

## Configuration

Make sure to fill correctly your environment variables

```
// .env

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root
MONGO_INITDB_DATABASE=unit

API_PORT=8001
API_HOST=units-api
DATABASE_HOST=units-database
DATABASE_PORT=27017
DATABASE_COLLECTION=unit
```

## Running the project

To start the project, you'll need to run this command:
`docker compose --env-file .env up`

## Next Steps

- [ ] Add integration tests
- [ ] Add jwt authentication
- [ ] Add ORM (like prisma or TypeORM)
