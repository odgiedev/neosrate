import SignUpPage from "./page/SignUpPage.tsx";
import SignInPage from "./page/SignInPage.tsx";
import HomePage from "./page/HomePage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar.tsx";
import DashboardPage from "./page/DashboardPage.tsx";
import CommunityPage from "./page/CommunityPage.tsx";
import ProfilePage from "./page/ProfilePage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="*" element={<h1>PAGE NOT FOUND.</h1>} />
                <Route path="/" element={<HomePage/>} />
                <Route path="/u/dashboard" element={<DashboardPage/>} />
                <Route path="/u/signin" element={<SignInPage/>} />
                <Route path="/u/signup" element={<SignUpPage/>} />
                <Route path="/user/:username" element={<ProfilePage/>} />
                <Route path="/c/:community" element={<CommunityPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
