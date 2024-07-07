import CommunityCreateModal from "../component/CommunityCreateModal.tsx";
import {useEffect, useState} from "react";
import {Axios} from "../lib/axios.ts";
import PostEdit from "../component/PostEdit.tsx";
import {CaretCircleDown, CaretDoubleDown, CheckCircle, UserGear, Warning} from "phosphor-react"
import Message from "../component/Message.tsx";
import NothingYet from "../component/NothingYet.tsx";

function DashboardPage() {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    const [showPosts, setShowPosts] = useState([]);
    const [userIdDashboard, setUserIdDashboard] = useState(null);

    const [bio, setBio] = useState("");

    const [communityCreateModalEnable, setCommunityCreateModalEnable] = useState(false);

    const [optionsEnable, setOptionsEnable] = useState(false);

    const [deleteUser, setDeleteUser] = useState(false);

    const [pfpName, setPfpName] = useState("default.png");
    const [newPfpName, setNewPfpName] = useState(pfpName);

    const [trigger, setTrigger] = useState(1)

    const [maxPerPage, setMaxPerPage] = useState(10);
    const [haveMorePost, setHaveMorePost] = useState(false);

    const s3Url = "https://neosrate.s3.sa-east-1.amazonaws.com"

    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
             Axios.get(`/userprofile/get/${username}`, {
                "headers": {
                    "Authorization": localStorage.getItem("token")
                }
            })
                .then(data => {
                    setBio(data.data.bio);
                    setUserIdDashboard(data.data.id);
                    if (data.data.pfpName) {
                        setPfpName(data.data.pfpName);
                    }
                })
                .catch(err => setErrorMsg(err.response.data || "An error occurred."))

             Axios.get(`/post/get/all/user/${maxPerPage}/${userId}/${username}`, {
                "headers": {
                    "Authorization": localStorage.getItem("token")
                }
            })
                .then(data => {
                    const {posts, totalPosts} = data.data;

                    setShowPosts(posts)

                    if (totalPosts === showPosts.length) {
                        setHaveMorePost(false)
                    } else {
                        setHaveMorePost(true)
                    }
                })
    }, [trigger, maxPerPage]);

    function fnTrigger() {
        setTrigger(old => old + 1);
    }

    function handleSetPfp(pfp) {
        setNewPfpName(pfp[0]["name"]);

        const formData = new FormData();
        formData.append('file', pfp[0]);

        const config = {
            headers: {
                'Authorization': localStorage.getItem("token"),
            },
        };

        Axios.post(`/userprofile/update/pfp/${userId}`, formData, config)
            .then(data => setSuccessMsg(data.data))
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    function handleSetBio(e) {
        e.preventDefault();

        Axios.put(`/userprofile/update/${userId}/${userIdDashboard}`, {bio}, {
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(data => setSuccessMsg(data.data || "Bio updated."))
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    function handleDeleteUser() {
        Axios.delete(`/user/delete/${userId}`, {
            "headers": {"Authorization": localStorage.getItem("token")}
        })
            .then(() => {
                localStorage.clear();
                window.location.reload();
            })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    return (
        <div className=" bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950">
            <div className="pt-10 flex flex-col items-center justify-center w-full md:w-1/2 min-h-screen mx-auto">
                <h1 className="font-bold text-3xl flex items-center justify-center mb-8"> <UserGear size={24} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">PROFILE DASHBOARD</span> </h1>
                <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

                <div className="relative w-60 h-60 overflow-hidden rounded-full">
                    <img className="absolute inset-0 h-full w-full object-cover" src={`${s3Url}/user${username}`} alt="Profile pic"/>
                    <input className="absolute inset-0 w-full h-full cursor-pointer opacity-0" type="file" onChange={e => handleSetPfp(e.target.files)}/>
                </div>

                <span className="my-4 font-bold text-lg">{username}</span>
                <form className="my-4 flex">
                    <textarea maxLength={255} value={bio} className="md:w-80 mr-2 p-2 text-center rounded-lg bg-slate-900" onChange={event => setBio(event.target.value)}></textarea>
                    <button onClick={() => handleSetBio(event)}><CheckCircle size={32} color={"#15803d"} /></button>
                </form>

                <button className="bg-green-500 hover:bg-green-600 border-4 border-black text-black rounded p-2 my-2 font-bold" onClick={() => setCommunityCreateModalEnable(old => !old)}>Create Community</button>

                {
                    communityCreateModalEnable
                        ?
                        <CommunityCreateModal/>
                        :
                        null
                }

                <button className={"my-4"} onClick={() => {
                    setOptionsEnable(old => !old);
                    setDeleteUser(() => false)
                }}><CaretCircleDown size={32} /></button>

                {
                    optionsEnable
                    &&
                    <button onClick={() => setDeleteUser(old => !old)} className="bg-red-500 rounded p-2 font-bold mb-14">Delete Account</button>
                }

                {
                    deleteUser
                    &&
                    <div className={"w-10/12 md:w-full mb-10 flex flex-col justify-center items-center text-center"}>
                        <div className={"px-3 py-6 rounded-lg bg-red-400 mb-3 font-bold text-center flex flex-col justify-center items-center"}>
                            <span className={"mb-2"}><Warning size={32} /></span>
                            <p>User will be deleted forever without being able to recover again.</p>
                            <p>Including communities, posts, comments and anything else related to it.</p>
                            <br />
                            <p>Delete?</p>
                        </div>

                        <div>
                            <button onClick={handleDeleteUser} className="bg-red-500 rounded p-3 font-bold mr-2">YES</button>
                            <button onClick={() => setDeleteUser(false)} className="bg-green-500 rounded p-3 font-bold">NO</button>
                        </div>
                    </div>
                }

                {
                    showPosts.length > 0
                    ?
                    showPosts.map((post) => {
                        return (
                            <PostEdit
                                fnTrigger={fnTrigger}
                                key={post.id}
                                post={post}
                            />
                        )
                    })
                    :
                    <NothingYet msg={"You haven't published anything yet!"}/>
                }
                {
                    haveMorePost &&
                    <div className={"mb-6"}>
                        <button onClick={() => setMaxPerPage(maxPerPage + 10)}><CaretDoubleDown size={32} /></button>
                    </div>
                }
            </div>
        </div>
    )
}

export default DashboardPage;