# Deploying Using Node and Docker

## Prerequisite

All development setup is done with a Mac OS

- Requirements:
  - Node (V18)
  - Docker (Desktop, Ranger, Colima)
  - PGAdmin (not required but helpful)

Install brew if not already installed.

- Install mkcert tool for creating certificates `brew install mkcert`
- Only if using **Firefox**, Install nss`brew install nss`
- Create a self signed Certificate Authority `mkcert -install`

## Setup Local Repository and certs

### Download Source Code

`git clone https://github.com/bcgov/gdx-agreements-tracker.git`

### Setup Certificates

**All bash commands are assumed from root of repository** `./gdx-agreements-tracker`
A self signed certificate is required for local development deployments.

- in a terminal window go to the GDX agreements tracker repository `cd gdx-agreements-tracker`
- create a `.cert` directory in the frontend folder if not already created `mkdir -p ./frontend/.cert`
  - This is where your certificates will be saved.
  - This folder is also excluded from the repository via the .gitignore file.
- create a key and cert file `mkcert -key-file ./frontend/.cert/key.pem -cert-file ./frontend/.cert/cert.pem "localhost"`

## Set up and Deploy Database

The database is a postgres database, which needs to be deployed via docker compose.

- Add a `./backend/.env` by either creating a new file or using [sample.env](https://github.com/bcgov/gdx-agreements-tracker/blob/development/backend/sample.env) as the template
- Update/add all database environment variables

```sh
#/backend/.env
...
DATABASE_AUTO_DEPLOY=1
POSTGRES_DB=gat_db
POSTGRES_HOST=localhost
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=15432
POSTGRES_USER=postgres
...
```

- Start the database by running the docker compose command:

```bash
cd ./backend
docker volume create gdx-agreements-tracker_database # set up a volume to hold the database
docker compose up --build
```

- If the --build step fails you can manually build the image:

```bash
 docker build -t backend-db ./openshift/templates/images/postgres/
 docker compose up
```

## Set up Back-End API

- Use the [Set Up and Deploy Database](#set-up-and-deploy-database) instructions above to create your .env file, or Create`./backend/.env` _(see example below)_ using [sample.env](https://github.com/bcgov/gdx-agreements-tracker/blob/development/backend/sample.env) as a template:

```bash
# Refer here for configs: https://console.apps.silver.devops.gov.bc.ca/k8s/ns/acd38d-dev/configmaps/0-gdx-agreements-tracker-api-env-config/yaml
# Refer here for secrets: https://console.apps.silver.devops.gov.bc.ca/k8s/ns/acd38d-dev/secrets/pmo-secrets-7f57hmd56g/yaml

# JSON Web Key Set Universal Resource Identifier
JWKSURI=
# Node environment
NODE_ENV=development
# Database Config
DATABASE_AUTO_DEPLOY=1
POSTGRES_DATABASE=gat_db
POSTGRES_HOST=localhost
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=15432
POSTGRES_USER=postgres
# Common Component Token host/path used for CHES and CDOGS
COMMON_COMPONENT_TOKEN_HOST=
COMMON_COMPONENT_TOKEN_PATH=
# Common Hosted Documentation Generation API
CDOGS_CLIENT_ID=
CDOGS_SECRET=
COMMON_COMPONENT_CDOGS_API=
# Common Hosted Email Sending API
CHES_CLIENT_ID=
CHES_SECRET=
COMMON_COMPONENT_CHES_API=
# Single Sign-on API
SINGLE_SIGN_ON_API=
SINGLE_SIGN_ON_API_CLIENT_ID=
SINGLE_SIGN_ON_API_TOKEN_HOST=
SINGLE_SIGN_ON_API_TOKEN_PATH=
SINGLE_SIGN_ON_CLIENT_SECRET=
SINGLE_SIGN_ON_ENVIRONMENT=
SINGLE_SIGN_ON_INTEGRATION_ID=
# Deprecated
COMMON_COMPONENT_CLIENT_ID=
COMMON_COMPONENT_SECRET=
COMMON_COMPONENT_URL=
```

### Seed the production database and do migrations

- In order to fully seed the database with production data, the `./backend/src/database/production_seeds` folder needs to contain the \*.dat production seeds.
  - See the [pmo-mssql-converter README](https://apps.itsm.gov.bc.ca/bitbucket/projects/DES/repos/pmo-mssql-converter/browse/README.md?useDefaultHandler=true#50) on how to generate and copy seeds over.
    - **DO NOT COPY THE MIGRATIONS from the pmo-mssql-converter**!
      - those migrations will conflict with the picker options from the `08_picker_options.js` seeder!
- To perform the migration and seeding on your local database from the **gdx-agreements-tracker** directory:

```bash
cd ./backend
npx knex migrate:latest
npx knex seed:run --specific=999_production_seeder.js
```

### Set up PGAdmin to view and make queries

- You can generate a config file for pgAdmin with the following command:

```bash
cat << EOF > pgAdminConfig.JSON
{
    "Servers": {
        "1": {
            "Name": "GDX Agreements Tracker",
            "Group": "Servers",
            "Host": "localhost",
            "Port": 15432,
            "MaintenanceDB": "postgres",
            "Username": "postgres",
            "UseSSHTunnel": 0,
            "TunnelPort": "22",
            "TunnelAuthentication": 0,
            "KerberosAuthentication": false,
            "ConnectionParameters": {
                "sslmode": "prefer",
                "connect_timeout": 10
            }
        }
    }
}
EOF
```

> To use this file, simply open PGAdmin, click tools > Import / Export Servers > Import,
> select your pgAdminConfig.JSON file, and import it by following the prompts.

> If you want to configure PGAdmin without a JSON file, simply use the interface to create a new server using the database values from the JSON snippet above, or from **./backend/.env**.

### Run the Backend API

- check which version of Node you should be using.

```bash
 cd ./backend
 cat package.json | less
 # your version should look like this:
...
  "engineStrict": true,
  "engines": {
    "node": ">=18.18.0"
  },
...
```

- Switch to the correct (currently: v18.18.0) Node version:

```bash
cd ./backend
nvm list # find out what versions are available for you
nvm install  v18.18.0 # install matching version from package.json
nvm use v18.18.0 # switch to that version
nvm alias default v18.18.0 # Optional: set the default version
npm i # installs dependencies
npm run start # runs the backend API
```

---

---

## Frontend Setup and Deploy

### Set up Frontend App

- Create`./frontend/.env` using the example below as a template:
- the `REACT_APP_KEYCLOAK_URL`, `REACT_APP_KEYCLOAK_CLIENT_ID`, `REACT_APP_KEYCLOAK_REALM` will have to be updated according to your [keycloak server settings](https://console.apps.silver.devops.gov.bc.ca/k8s/ns/acd38d-dev/deployments/pmo-app-deployment/yaml)

```bash
# frontend .env
WDS_SOCKET_PORT=3000
REACT_APP_API_URL="http://localhost:8080/"
REACT_APP_KEYCLOAK_CLIENT_ID=# see note above for value
REACT_APP_KEYCLOAK_REALM=standard
REACT_APP_KEYCLOAK_URL=# see note above for value
```

- check which version of Node you should be using.

```bash
 cd ./frontend
 cat package.json | less
 # your version should look like this:
...
  "engineStrict": true,
  "engines": {
    "node": ">=18.18.0"
  },
...
```

- Switch to the correct (currently: v18.18.0) Node version:

```bash
cd ./frontend
nvm list # find out what versions are available for you
nvm install  v18.18.0 # install matching version from package.json
nvm use v18.18.0 # switch to that version
nvm alias default v18.18.0 # Optional: set the default version
yarn # installs dependencies
yarn start # runs the frontend App
```

- Your browser should open up at [localhost:3000](https://localhost:3000)

### Deploy the Application After Setup

```bash
cd ./backend
docker compose up # starts database container
npm run start # starts API backend
cd ../frontend
yarn start # starts APP frontend
```

---

---

### APPENDIX: How to delete your local database using PGAdmin

- make sure the db container is active:

```bash
cd ./backend
docker ps # If the database container is not running, do:
docker-compose up db
```

- In pgAdmin:
  - Navigate to Databases > Schemas > data
  - right-click data and select 'Delete'
  - Right click the GDX Agreements Tracker server > Remove Server
  - You will need to re-seed and migrate the database again before you can use it. See: [Seed the production database and do migrations](#seed-the-production-database-and-do-migrations)
  - Use the instructions in [Set up PGAdmin to view and make queries](#set-up-pgadmin-to-view-and-make-queries) to import settings again
