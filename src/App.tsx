import SignUpPage from "./page/SignUpPage.tsx";
import SignInPage from "./page/SignInPage.tsx";
import HomePage from "./page/HomePage.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./component/Navbar.tsx";
import DashboardPage from "./page/DashboardPage.tsx";
import CommunityPage from "./page/CommunityPage.tsx";
import ProfilePage from "./page/ProfilePage.tsx";
import {jwtDecode} from "jwt-decode";

function App() {
    function logOut() {
        localStorage.clear()
        console.log("logout")
    }

    let authenticated = localStorage.getItem("authenticated") ? localStorage.getItem("authenticated") : "false";

    const token = localStorage.getItem("token");

    if (token !== null) {
        try {
            const userData = jwtDecode(token);

            if (userData == null || userData.userId != localStorage.getItem("userId") || userData.username !== localStorage.getItem("username")) {
                authenticated = "false"
                logOut()
            }
        } catch {
            console.log("An error occured with the token.")
            logOut()
        }
    }


    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="*" element={<h1>PAGE NOT FOUND.</h1>} />
                <Route path="/" element={<HomePage/>} />
                <Route path="/u/dashboard" element={authenticated === "true" ? <DashboardPage/> : <Navigate to="/" />} />
                <Route path="/u/signin" element={authenticated !== "true" ? <SignInPage/> : <Navigate to="/" />} />
                <Route path="/u/signup" element={authenticated !== "true" ? <SignUpPage/> : <Navigate to="/" />} />
                <Route path="/user/:username" element={<ProfilePage/>} />
                <Route path="/c/:community" element={<CommunityPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
