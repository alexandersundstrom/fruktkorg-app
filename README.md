# fruktkorg-app


## INTERFACES module
This module represents the backend and is based on Spring Boot and Spring Security.

### Setup

* Install all maven dependencies
* For REST-calls, the request needs a Header called `X-PERSONR`. It needs to be set to one of the available persons `personNummer` in `PersonService`.
* This can be done through browser extensions, like [Modify Header Value](https://chrome.google.com/webstore/detail/modify-header-value-http/cbdibdfhahmknbkkojljfncpnhmacdek ) for Chrome.

### Run
* Launch Application.java

## WEB module
This is the GUI.

### Setup

* Install NPM 
* Run `npm install` under the web module

### Run
* `npm run dev` and open [localhost:8080](http://localhost:8080)


