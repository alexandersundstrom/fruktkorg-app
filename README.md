# Fruktkorg-app
This is a maven module based application that consists of both an client and a server.


## INTERFACES module
This module represents the backend and is based on Spring Boot and Spring Security.

### Setup

* Install all maven dependencies
* For REST-calls, the request needs a Header called `X-PERSONR`. It needs to be set to one of the available persons 
`personNummer` in `PersonService`.
* This can be done through browser extensions, like [Modify Header Value](https://chrome.google.com/webstore/detail/modify-header-value-http/cbdibdfhahmknbkkojljfncpnhmacdek ) for Chrome.

A precondition for running the tests is having 
[Robot Framework](http://robotframework.org/) and [SeleniumLibrary ](https://github.com/robotframework/SeleniumLibrary) 
installed, and they in turn require [Python](http://python.org/). Robot Framework installation instructions cover both 
Robot and Python installations, and SeleniumLibrary has its own installation instructions.

In practice it is easiest to install Robot Framework and SeleniumLibrary along with its dependencies using pip package 
manager. Once you have pip installed, all you need to do is running these commands:

```
sudo pip install robotframework
sudo pip install robotframework-seleniumlibrary
sudo pip install -U robotframework-browsermobproxylibraryi
```

For the Selenium test to work, you need to have an `WebDriver` installed, like the [ChromeDriver](http://chromedriver.chromium.org/getting-started). 
Edit the `$PATH` in your `bash_profile` and add 
the folder where this driver is located. 


### Run
* Launch Application.java
* for the 

## WEB module
This is the GUI. It's using webpack that compiles js and scss file, and starts a server that delivers the GUI.

### Setup

* Install NPM 
* Run `npm install` under the web module

This will install [Prettier](https://prettier.io/). It's used for formatting js, jsx and scss files.
Many IDEs, like IntelliJ also has a plugin that can be used for formatting together with *Prettier*. 

There is also a `post-commit` and `pre-commit` hook added. Install those and *Prettier* will executed when commiting. 

Npm also installs [JSDoc 3](https://www.npmjs.com/package/jsdoc). This creats html views for javascript documentation. 
The output folder is `web/out`. It's created once you run `npm run dev` or `npm run jsdoc`. 

### Run
* `npm run dev` and open [localhost:8080](http://localhost:8080)


