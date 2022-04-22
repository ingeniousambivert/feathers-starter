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

## Docker

> The app is containerized and configured to work with docker and docker compose.

<h5>To run the app containerized in development mode, execute the following command in the project directory :</h5>

```bash
docker-compose -f docker-compose.dev.yml up
```

More options :

```bash
# To run the containerized app in detached mode
docker-compose -f docker-compose.dev.yml up -d
```

<h5>To run the app containerized in production mode follow :</h5>

The app will run in a docker swarm with one manager node which is also a worker node by default.
To enable docker swarm, run the following command :

```bash
docker swarm init
```

**IMPORTANT** : To deploy the app you will need to build and push the server image to an image registry and pull it on production machine. Never build on production machine.

Set the environment variables in the system

```bash
 set -a; . ./.env; set +a
```

Expand the environment variables in the docker-compose file

- Server

  ```bash
  envsubst <docker-compose.prod.server.yml>docker-compose.prod.processed.server.yml
  ```

- Worker
  ```bash
  envsubst <docker-compose.prod.worker.yml>docker-compose.prod.processed.worker.yml
  ```

Deploy the app

- Server

  ```bash
  docker stack deploy -c docker-compose.prod.processed.server.yml {preferred_stack_name}
  ```

- Worker

  ```bash
  docker stack deploy -c docker-compose.prod.processed.worker.yml {preferred_stack_name}
  ```

More options :

```bash
# List the number of stacks currently deployed.
docker stack ls # --help for more information
```

By default in _development_ mode, the exposed port is `3030`. And the exposed port for postgresql is `5416`.
By default in _production_ mode, the exposed port is `80`.

For more details and configurations take a look at the following files :

- ./Dockerfile.dev
- ./Dockerfile.prod
- ./docker-compose.dev.yml
- ./docker-compose.prod.server.yml
- ./docker-compose.prod.worker.yml

#### Workflow

Build and push the image to [GitLab Container Registry](https://docs.gitlab.com/ee/user/packages/container_registry/).

- Login to [GitLab Container Registry](https://docs.gitlab.com/ee/user/packages/container_registry/)

  ```bash
  docker login registry.gitlab.com
  ```

- Build an image on the development machine

  ```bash
  # To build the image
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml build {service_name}
  ```

  <small>_[initial use - optional]_</small>

- Rename the image to make it registry specific

  ```bash
  # To get the image name
  docker image ls
  ```

  ```bash
  # To rename the image
  docker image tag {built_image_name} registry.gitlab.com/a7691/attrione-server/feathers:{version_tag}
  ```

- Push the updated image to the registry

  ```bash
  # To push the image
  docker push registry.gitlab.com/a7691/attrione-server/feathers:{version_tag}
  ```

  ```bash
  # To push the image with a selected service
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml push {service_name}
  ```

- Pull the image on the production machine

  ```bash
  # To pull the image
  docker pull registry.gitlab.com/a7691/attrione-server/feathers:{version_tag}
  ```

  ```bash
  # To pull the image with a selected service
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull {service_name}
  ```

  _version_tag : `1.0.0`_
  _service_name : `feathers`_

More options :

```bash
# Remove an image
docker rmi {image_name}
```

## Extra Configurations

The app is configured with the following module aliases:

- @app-> ./src/app
- @channels -> ./src/channels
- @database -> ./src/database
- @errors -> ./src/errors
- @hooks -> ./src/hooks
- @helpers -> ./src/helpers
- @integrations -> ./src/integrations
- @automations -> ./src/automations
- @workers -> ./src/workers
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

##### Stripe

`app.integration("stripe")`

##### Sendgrid

`app.integration("sendgrid")`

## Automations

Thin communication layer for automation providers. Automations have same design as services and can be accessed using `app.automation("<name>")`

All automations have a `queue`, and a `processor` to help the automation:

- **queue**: Initializes the automation queue.
- **processor**: Processor for the automation queue - job.

##### Sync

`app.automation("sync")`

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
