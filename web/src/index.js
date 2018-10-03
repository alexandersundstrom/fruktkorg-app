import { MainPage } from './components/pages/MainPage/MainPage.jsx';
import { virtualDOM } from './framework/Transpiler';

$.ajax({
  url: 'http://localhost:8090/loggedInPerson',
  success: function(result) {
    const rootElement = document.getElementById('app');
    rootElement.appendChild(MainPage(result));
    virtualDOM.init(rootElement);
  },
  error: function(error) {}
});
