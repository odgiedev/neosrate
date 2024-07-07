import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Gear,
    Globe,
    House,
    ListDashes,
    MagnifyingGlass,
    SignIn, SignOut,
    User,
    UserCirclePlus, UserGear, UsersThree,

} from "phosphor-react";
import {Axios} from "../lib/axios.ts";

function Navbar() {
    const authenticated = localStorage.getItem("authenticated") ? localStorage.getItem("authenticated") : "false";

    const username = localStorage.getItem("username") ? localStorage.getItem("username") : "";

    const [searchQuery, setSearchQuery] = useState("");

    const [navBarDropdown, setNavBarDropdown] = useState(false);

    const [recentPost, setRecentPost] = useState([]);
    const [recentUser, setRecentUser] = useState([]);

    const navigate = useNavigate();

    const s3Url = "https://neosrate.s3.sa-east-1.amazonaws.com"

    const [enableRecent, setEnableRecent] = useState("xl:flex");

    const [imageSource, setImageSource] = useState('');

    useEffect(() => {
        setNavBarDropdown(false);
        
        if (window.location.pathname.includes("user") || window.location.pathname.includes("/c/") || window.location.pathname.includes("/u/signin") || window.location.pathname.includes("/u/signup")) {
            setEnableRecent("hidden");
        } else {
            setEnableRecent("xl:flex");
        }

        Axios.get("/post/get/recent")
            .then(data => setRecentPost(data.data.content))

        Axios.get("/user/get/recent")
            .then(data => setRecentUser(data.data.content))
    }, [window.location.pathname]);

    function handleSearch(event) {
        event.preventDefault();

        navigate(`/search?q=${searchQuery}`);
    }

    function handleLogOut() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
            <nav className="fixed z-50 top-0 right-5 hidden xl:flex justify-center items-center font-bold border-violet-500 py-2">
                <form onSubmit={handleSearch} className="flex items-center justify-center">
                    <MagnifyingGlass size={32} className="bg-slate-800 p-1 rounded-l-lg" />
                    <input type="text" placeholder="Search" className="px-2 py-1 rounded-r-lg bg-slate-800" onChange={event => setSearchQuery(event.target.value)} />
                </form>
            </nav>
            <button className="absolute" onClick={() => setNavBarDropdown(old => !old)}><ListDashes size={32} /></button>
            <nav className={`${navBarDropdown ? "inline" : "hidden"} sm:flex z-50 w-full sm:w-16 xl:w-80 border-r border-violet-800 fixed top-0 left-0 flex flex-col h-screen justify-around items-center font-bold bg-slate-900 py-2`}>
                {/*<img className="w-24 mt-4" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png"} />*/}
                {
                    authenticated == "true"
                    ?
                    <>
                        <button className="sm:hidden" onClick={() => setNavBarDropdown(old => !old)}><ListDashes size={32} /></button>
                        <Link to="/" className="hover:underline flex items-center"> <House size={20} weight="fill" className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">Home</span> </Link>
                        <Link to="/community/list" className="hover:underline flex items-center"> <UsersThree size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">Communities</span> </Link>
                        <Link to="/joined" className="hover:underline flex items-center"> <Globe size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">Joined</span> </Link>
                        <Link to={`/user/${username}`} className="hover:underline flex items-center"> <User size={20} weight="fill" className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">Profile</span> </Link>
                        <hr className={"border border-slate-700 w-3/4"}/>
                        <Link to="/u/dashboard/community" className="hover:underline flex items-center text-violet-500"> <Gear size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">COMMUNITY</span> </Link>
                        <Link to="/u/dashboard" className="hover:underline flex items-center text-violet-500"> <UserGear size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">PROFILE</span> </Link>
                        <button onClick={() => handleLogOut()} className="hover:underline flex items-center text-red-500"><SignOut size={26} weight="fill" className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">Log Out</span> </button>
                    </>
                    :
                    <>
                        <button className="sm:hidden" onClick={() => setNavBarDropdown(old => !old)}><ListDashes size={32} /></button>
                        <Link to="/" className="hover:underline flex items-center"> <House size={20} weight="fill" className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">Home</span> </Link>
                        <Link to="/community/list" className="hover:underline flex items-center"> <UsersThree size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">Communities</span> </Link>
                        <Link to="/u/signin" className="hover:underline flex items-center"> <SignIn size={28} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">Sign In</span> </Link>
                        <Link to="/u/signup" className="hover:underline flex items-center"> <UserCirclePlus size={28} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">Sign Up</span> </Link>
                    </>
                }
            </nav>
            <div id={"recentPost"} className={`hidden ${enableRecent} flex-col justify-center items-center fixed right-0 mr-6 rounded-lg px-2 py-4 w-80 min-h-60 mt-20 bg-slate-900`}>
                <span className="font-bold text-lg my-2">Recent posts</span>
                <div>
                    {
                        recentPost.length > 0
                        &&
                        recentPost.map(post => {
                            return (
                                <div className="flex" key={post.id}>
                                    <img className="h-8 w-8 object-cover rounded mr-2 mb-2"
                                         src={imageSource ? `${s3Url}/default.png` : `${s3Url}/user${post.username}`}  alt={post.username}
                                    />
                                    <a href={`http://localhost:5173/user/${post.username}`}>{`u/${post.username} -`}&nbsp;</a>
                                    <a href="http://localhost:5173/">{`${post.title}`}</a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div id={"recentUser"} className={`hidden ${enableRecent} flex-col justify-center items-center fixed right-0 bottom-0 mr-6 mb-8 rounded-lg px-2 py-4 w-80 h-60 mt-20 bg-slate-900`}>
                <span className="font-bold text-lg my-2">New users</span>
                <div>
                    {
                        recentUser.length > 0
                        &&
                        recentUser.map(user => {
                            return (
                                <div className="flex" key={user.id}>
                                    <img className="h-8 w-8 object-cover rounded mr-2 mb-2"
                                         src={imageSource ? `${s3Url}/default.png` : `${s3Url}/user${user.username}`}  alt={user.username}
                                    />
                                    <a href={`http://localhost:5173/user/${user.username}`}>{`u/${user.username}`}</a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar;