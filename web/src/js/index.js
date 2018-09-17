import {MainPage} from './main/mainPage.jsx';

// Entry point for the application
$.ajax({
  url: 'http://localhost:8090/loggedInPerson',
  success: function (result) {
    document.getElementById('app').appendChild(MainPage());
  },
  error: function (error) {

  }

});

