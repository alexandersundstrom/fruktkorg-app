*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported Selenium2Library.
Library           Selenium2Library
Library             BrowserMobProxyLibrary
Library           Collections
Library           OperatingSystem

*** Variables ***
${SERVER}         localhost:8080
${BROWSER}        Chrome
${DELAY}          0
${FRUKT}          Päron
${BASE URL}      http://${SERVER}/
${SEARCH URL}    http://${SERVER}/#searchFrukt
${PROXY PATH}    ./browsermob-proxy-2.1.4/bin/browsermob-proxy




*** Keywords ***
Open Browser To Login Page
    ${PERSON HEADER}=       Create Dictionary   X-PERSONR="19880301-1234"
    ${PORT}=       Create Dictionary   port=${8082}
    Start Local Server  path=${PROXY PATH}      options=${PORT}
    ${BrowserMob_Proxy}=    Create Proxy
    Set Headers         headers=${PERSON HEADER}
    Create Webdriver        ${BROWSER}    ${BrowserMob_Proxy}
    Open Browser    ${BASE URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Welcome Page Should Be Open
    Stop Local Server

Input Username
    [Arguments]    ${username}
    Input Text    username_field    ${username}


Submit Credentials
    Click Button    login_button

Welcome Page Should Be Open
    Location Should Be    ${BASE URL}

Frukt Search Page Should Be Open
    Location Should Be  ${SEARCH URL}

