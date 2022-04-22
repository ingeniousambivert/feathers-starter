# Feathers Starter

> Feathers server with basic user management and role based access control. 

This project was bootstrapped with [Feathers Generator](https://docs.feathersjs.com/guides/basics/generator.html).

## Getting Started

Getting up and running is simple.

Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/) and [PostgreSQL](https://www.postgresql.org/) installed.

```bash
npm install
npm start
```

## Configuration

The default configuration is generated automatically using the _Feathers Generator_.It consists of the default host, pagination options, authentication options. For the app to function correctly, you need to configure the necessary _environment variables_ in your system or in an `.env` file. The app requires the following environment variables:

```bash
# Server Configs
NODE_ENV=
PORT=
CLIENT_URL=

# Postgres Configs
POSTGRES_IP=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=


# Sendgrid Configs
SENDGRID_API_KEY=
SENDGRID_VERIFY=
SENDGRID_VERIFY_DONE=
SENDGRID_RESET=
SENDGRID_RESET_DONE=
SENDGRID_PASSWORD_CHANGE=
SENDGRID_EMAIL_CHANGE=
SENDGRID_INVITE=
FROM_EMAIL=

# Slack Webhook
SLACK_WEBHOOK_URL=
```

## Available Scripts

In the project directory, you can run the following scripts.

### `npm run dev`

Runs the app in the development mode with nodemon sets the `NODE_ENV` to _development_ and adds formatting to bunyan logs.

### `npm start`

Runs the app in the production mode sets the `NODE_ENV` to _production_ and adds formatting to bunyan logs.

### `npm run migrate:up`

Runs the sequelize cli and migrates the database models to upgrade to the generated migration up scripts in `src/database/migrations/scripts/`.

### `npm run migrate:down`

Runs the sequelize cli and migrates the database models to downgrade to the generated migration down scripts in `src/database/migrations/scripts/`.
<small>_[use carefully]_</small>

### `npm run format`

Runs the prettier formatter on the `src/` directory and formats your files.

### `npm run lint`

Runs the eslint configurations on the `src/` directory and lint your files.

### `npm run test`

Runs all your tests in the `test/` directory.

## Extra Configurations

The app is configured with the following module aliases:

- @app-> ./src/app
- @channels -> ./src/channels
- @database -> ./src/database
- @errors -> ./src/errors
- @hooks -> ./src/hooks
- @helpers -> ./src/helpers
- @integrations -> ./src/integrations
- @models -> ./src/models
- @middleware -> ./src/middleware
- @services -> ./src/services
- @utils -> ./src/utils

## Helpers

Thin communication layer for helper/utility methods. Helpers have same design as services and can be accessed using `app.helper("<name>")`

##### Request

`app.helper("request")`

## Integrations

Thin communication layer for external providers. Integrations have same design as services and can be accessed using `app.integration("<name>")`

All integrations expose several methods common among their channels apart from these mandatory methods:

- **build**: Initializes the integration. Integration has to be initialized with required arguments before using them.


##### Sendgrid

`app.integration("sendgrid")`


## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```bash
npm install -g @feathersjs/cli          # Install Feathers CLI

feathers generate service               # Generate a new Service
feathers generate hook                  # Generate a new Hook
feathers help                           # Show all commands
```

To setup a remote Postgres Database read the instructions in the file - [Database_Setup.md](./Database_Setup.md).
If the file does not exist read the instructions here - [https://betterprogramming.pub/how-to-provision-a-cheap-postgresql-database-in-aws-ec2-9984ff3ddaea](https://betterprogramming.pub/how-to-provision-a-cheap-postgresql-database-in-aws-ec2-9984ff3ddaea)

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
