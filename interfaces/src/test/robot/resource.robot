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
    Open Browser    ${BASE URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Welcome Page Should Be Open

Input Username
    [Arguments]    ${username}
    Input Text    username_field    ${username}


Submit Credentials
    Click Button    login_button

Welcome Page Should Be Open
    Location Should Be    ${BASE URL}

Frukt Search Page Should Be Open
    Location Should Be  ${SEARCH URL}

