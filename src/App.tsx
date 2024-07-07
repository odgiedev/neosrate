import SignUpPage from "./page/SignUpPage.tsx";
import SignInPage from "./page/SignInPage.tsx";
import HomePage from "./page/HomePage.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./component/Navbar.tsx";
import DashboardPage from "./page/DashboardPage.tsx";
import CommunityPage from "./page/CommunityPage.tsx";
import ProfilePage from "./page/ProfilePage.tsx";
import {jwtDecode} from "jwt-decode";
import SearchPage from "./page/SearchPage.tsx";
import CommunityDashboardPage from "./page/CommunityDashboardPage.tsx";
import NotFound from "./page/NotFound.tsx";
import JoinedPage from "./page/JoinedPage.tsx";
import Footer from "./component/Footer.tsx";
import CommunityListPage from "./page/CommunityListPage.tsx";

function App() {
    function logOut() {
        localStorage.clear();
    }

    let authenticated = localStorage.getItem("authenticated") ? localStorage.getItem("authenticated") : "false";

    const token = localStorage.getItem("token");

    if (token !== null && authenticated === "true") {
        try {
            const userData = jwtDecode(token);

            if (userData == null || userData.userId != localStorage.getItem("userId") || userData.username !== localStorage.getItem("username")) {
                authenticated = "false"
                logOut()
            }
        } catch {
            logOut()
        }
    } else {
        logOut()
    }


    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<HomePage/>} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/joined" element={authenticated === "true" ? <JoinedPage/> : <Navigate to="/" />} />
                <Route path="/u/dashboard" element={authenticated === "true" ? <DashboardPage/> : <Navigate to="/" />} />
                <Route path="/u/signin" element={authenticated !== "true" ? <SignInPage/> : <Navigate to="/" />} />
                <Route path="/u/signup" element={authenticated !== "true" ? <SignUpPage/> : <Navigate to="/" />} />
                <Route path="/u/dashboard/community" element={authenticated === "true" ? <CommunityDashboardPage/> : <Navigate to="/" />} />
                <Route path="/community/list" element={<CommunityListPage />} />

                <Route path="/user/:username" element={<ProfilePage/>} />
                <Route path="/c/:community" element={<CommunityPage/>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;
