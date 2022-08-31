import './assets/App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./routeComponents/Home";
import EditorPage from './routeComponents/EditorPage';
// import ToasterComponent from 'components/ToasterComponent';

function App() {
  return (
    <>
      {/* <ToasterComponent /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomId' element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
