import './assets/App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React, { Suspense } from 'react';
import Home from "./routeComponents/Home";
import Loading from 'components/Loading';
import PageNotFound from 'components/404';
// import EditorPage from './routeComponents/EditorPage';

const EditorPage = React.lazy(() => import('./routeComponents/EditorPage'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:sessionId' element={

            <Suspense fallback={<Loading />}>
              <EditorPage />
            </Suspense>

          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
