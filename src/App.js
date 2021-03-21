import Router from "./components/routers/Router";
import MainContext from "./utils/context/MainContext";
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/css/style.min.css';
import './index.css';
import Define from "./utils/helpers/Define";


//setup axios
axios.defaults.baseURL = Define.API_BASE_URL
axios.defaults.withCredentials = true

function App() {
  return (
    <MainContext>
      <Router />
    </MainContext>
  );
}

export default App;
