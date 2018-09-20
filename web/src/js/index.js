import { MainPage } from './main/mainPage.jsx';
import { virtualDOM } from './main/transpiler';

// Entry point for the application
$.ajax({
  url: 'http://localhost:8090/loggedInPerson',
  success: function(result) {
    const rootElement = document.getElementById('app');
    rootElement.appendChild(MainPage(result));
    virtualDOM.init(rootElement);
  },
  error: function(error) {}
});
