
import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {routes} from './routes';

function App() {
  return (
    <Router>
     <Routes>
          {routes.map((route) => {
            const Page = route.page
            return(
              <Route key = {route.path}  path={route.path} element={
                <Page/>
              }/>
            )
          })}
        </Routes>
    </Router>);
}

export default App;
