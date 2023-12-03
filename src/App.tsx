import SignUpPage from "./page/SignUpPage.tsx";
import SignInPage from "./page/SignInPage.tsx";
import HomePage from "./page/HomePage.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./component/Navbar.tsx";
import DashboardPage from "./page/DashboardPage.tsx";
import CommunityPage from "./page/CommunityPage.tsx";
import ProfilePage from "./page/ProfilePage.tsx";

function App() {
    const authenticated = localStorage.getItem("authenticated") ? localStorage.getItem("authenticated") : "false";
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="*" element={<h1>PAGE NOT FOUND.</h1>} />
                <Route path="/" element={<HomePage/>} />
                <Route path="/u/dashboard" element={authenticated === "true" ? <DashboardPage/> : <Navigate to="/" />} />
                <Route path="/u/signin" element={authenticated === "false" ? <SignInPage/> : <Navigate to="/" />} />
                <Route path="/u/signup" element={authenticated === "false" ? <SignUpPage/> : <Navigate to="/" />} />
                <Route path="/user/:username" element={<ProfilePage/>} />
                <Route path="/c/:community" element={<CommunityPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
