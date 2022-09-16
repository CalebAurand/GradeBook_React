import logo from './logo.svg';
import './App.css';
import NavBar from './containers/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Router from './Router';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
