import './assets/App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./routeComponents/Home";
import EditorPage from './routeComponents/EditorPage';

function App() {
  return (
    <>
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
