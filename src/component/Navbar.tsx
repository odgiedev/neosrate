import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex justify-around bg-violet-500 py-2">
            <Link to="/" className="hover:underline me-5">Home</Link>
            <Link to="/u/dashboard" className="hover:underline me-5">Dashboard</Link>
            <Link to="/c/tech" className="hover:underline me-5">c/tech</Link>
            <Link to="/u/signin" className="hover:underline me-5">Sign In</Link>
            <Link to="/u/signup" className="hover:underline me-5">Sign Up</Link>
        </nav>
    )
}

export default Navbar;