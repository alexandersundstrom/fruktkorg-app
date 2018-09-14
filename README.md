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

One of the plugins installed by npm is [Prettier](https://prettier.io/). It's used for formatting js and scss files.
Many IDEs, like IntelliJ also has a plugin that can be used for formatting together with *Prettier*. 

It's optional to install, but it's strongly recommended so that formatting is treated the same by all.
This will be added as an additional prepush hook, so that the IDE specific ide plugin won't be needed.

### Run
* `npm run dev` and open [localhost:8080](http://localhost:8080)


