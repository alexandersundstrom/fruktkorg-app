# Fruktkorg-app
This is a maven module based application that consists of both an client and a server.


## INTERFACES module
This module represents the backend and is based on Spring Boot and Spring Security.

### Setup

* Install all maven dependencies
* For REST-calls, the request needs a Header called `X-PERSONR`. It needs to be set to one of the available persons `personNummer` in `PersonService`.
* This can be done through browser extensions, like [Modify Header Value](https://chrome.google.com/webstore/detail/modify-header-value-http/cbdibdfhahmknbkkojljfncpnhmacdek ) for Chrome.

### Run
* Launch Application.java

## WEB module
This is the GUI. It's using webpack that compiles js and scss file, and starts a server that delivers the GUI.

### Setup

* Install NPM 
* Run `npm install` under the web module

This will install [Prettier](https://prettier.io/). It's used for formatting js and scss files.
Many IDEs, like IntelliJ also has a plugin that can be used for formatting together with *Prettier*. 

There is also a `post-commit` and `pre-commit` hook added. Install those and *Prettier* will executed when commiting. 

Npm also installs [JSDoc 3](https://www.npmjs.com/package/jsdoc). This created html views for javascript documentation. 
The output folder is `web/out`. It's created once you run `npm run dev` or `npm run jsdoc`. 

### Run
* `npm run dev` and open [localhost:8080](http://localhost:8080)


