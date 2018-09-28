*** Settings ***
Resource          resource.robot

*** Test Cases ***
Valid Login
    Open Browser To Login Page
    Welcome Page Should Be Open
