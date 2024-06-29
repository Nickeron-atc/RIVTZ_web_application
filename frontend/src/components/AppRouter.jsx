import React from 'react'
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom'

import Authorization from "../pages/Authorization.jsx"
import Error from "../pages/Error.jsx"
import About from "../pages/About.jsx"
import WorkSession from "../pages/WorkSession.jsx"

//temp
import Test from "../pages/Test.jsx"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Authorization/>} />
            <Route path="/worksession" element={<WorkSession/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/test" element={<Test/>} />
            <Route path="*" element={<Error/>} />
        </Routes>
    );
};

export default AppRouter;
