# An app to manage Tutorials

## Feature
- Create a Tutorial
- Update a Tutorial by ID
- Delete a Tutorial by ID
- Get all Tutorials
- Able to search by Title
- Able to sort by crated/updated date (Default updated DESC)

## Installation
Tutorials Node Js requires [Node.js](https://nodejs.org/) v16+ to run.

```sh
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
$ nvm install 16.13.1
$ nvm use 8.1.2.
```

## Clone this repository (and cd to it.)
```sh
$ git clone https://github.com/ashishkava/NODEAPI.git
$ cd nodeJsDem0-tutorial
```

## Install the dependencies and dev Dependencies and start the server.

```sh
npm install
```
## Load env vars

```sh
MONGO_URL="mongodb://localhost:27017/Tutorials"
PORT = 8080
LOG_LEVEL = debug
```

Input the desired environmental variables in ```.env```

### Start the server
```sh
npm run start
```






