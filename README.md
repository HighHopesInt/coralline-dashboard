# HighHopes

## Table of contents
- [Getting Started](#getting-started)
  * [Dependencies](#dependencies)
  * [Installation](#installation)
- [Documentation](#documentation)
  * [Run project](#run-project)
  * [Run in virtualenv](#run-in-virtualenv)

## Getting started

### Dependencies
#### This application works in conjunction with:
* https://github.com/Sergei-vb/docker_repositories
* https://github.com/Sergei-vb/async_test

### Installation
1. [Docker](https://docs.docker.com/install/ "Docker")
2. [Docker compose](https://docs.docker.com/compose/install/ "Docker compose")

## Documentation
### Run project
You need to go to the directory with the Dockerfile of the cloned repository, then:
1. Create Image: ```docker build -t NAME_YOUR_IMAGE .```
2. Enter the parameters of the docker-compose.yml:
   * ```image: ```NAME_YOUR_IMAGE
   * ```NAME=```
   * ```USER=```
   * ```PASSWORD=```
   * ```HOST=```
   * ```PORTDB=```
3. Run Container: ```docker-compose up```

### Run in virtualenv
* You need to fill in the file ```HighHopes/dev.py.template``` with your values
* Rename it to ```HighHopes/dev.py```
* Run the command: ```./manage.py migrate```
* Run the command: ```./manage.py runserver```
