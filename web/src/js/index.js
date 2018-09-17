import { MainPage } from './main/mainPage.jsx';
import { navigate } from './util/Navigation';

// Entry point for the application
$.ajax({
  url: 'http://localhost:8090/loggedInPerson',
  success: function(result) {
    document.getElementById('app').appendChild(MainPage(result));
    navigate();
  },
  error: function(error) {}
});
