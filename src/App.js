import Router from "./components/routers/Router";
import MainContext from "./utils/context/MainContext";
import axios from 'axios'

//setup axios
axios.defaults.baseURL = "http://localhost:2727/"
axios.defaults.withCredentials = true

function App() {
  return (
    <MainContext>
      <Router />
    </MainContext>
  );
}

export default App;
