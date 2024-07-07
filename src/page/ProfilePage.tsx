import {useEffect, useState} from "react";
import Post from "../component/Post";
import {Axios} from "../lib/axios";
import {useParams} from "react-router-dom";
import {CaretDoubleDown, User} from "phosphor-react";
import NothingYet from "../component/NothingYet.tsx";
import Message from "../component/Message.tsx";

function ProfilePage() {
    // const usernameLogged = localStorage.getItem("username");
    const userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : -1;

    const { username} = useParams();

    const [showPosts, setShowPosts] = useState([]);

    const [userProfile, setUserProfile] = useState([]);

    const [userNotFound, setUserNotFound] = useState(false)

    const [userLikes, setUserLikes] = useState([])

    const [toShowComment, setToShowComment] = useState([])

    const [communityOwner, setCommunityOwner] = useState([])

    const s3Url = "https://neosrate.s3.sa-east-1.amazonaws.com"

    const [trigger, setTrigger] = useState(1)

    const [maxPerPage, setMaxPerPage] = useState(10);
    const [haveMorePost, setHaveMorePost] = useState(false);

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    function fnTrigger() {
        setTrigger(old => old + 1);
    }

    useEffect(() => {
            const fetchData = async () => {
                Axios.get(`/userprofile/get/${username}`)
                    .then(data => {
                        setUserProfile(data.data)
                    })
                    .catch(err => setErrorMsg(err.response.data || "An error occurred."))

                Axios.get(`/community/get/owner/${username}`)
                    .then(data => {
                        setCommunityOwner(data.data.reverse())
                    })
                    .catch(err => setErrorMsg(err.response.data || "An error occurred."))

                Axios.get(`/post/get/all/user/${maxPerPage}/${userId}/${username}`)
                    .then(data => {
                        const {posts, userLikes, comments, totalPosts} = data.data;
                        setShowPosts(posts);
                        setUserLikes(userLikes);
                        setToShowComment(comments);

                        setUserNotFound(false)

                        if (totalPosts === showPosts.length) {
                            setHaveMorePost(false)
                        } else {
                            setHaveMorePost(true)
                        }
                    })
                    .catch(err => {
                        if (err.response.data.includes("UNF")) {
                            setUserNotFound(true)
                        }

                        // if (err.response.data.includes("PNF")) {
                        //     console.log("post doesnt exist")
                        // }
                    })
            }
            fetchData();
    }, [trigger, maxPerPage]);

    return (
        <div className="bg-gradient-to-r from-slate-950 via-violet-900 to-slate-950">
            <div className="flex flex-col pt-10 items-center sm:w-1/2 min-h-screen mx-auto">
                <h1 className="font-bold text-xl flex items-center justify-center mb-8"> <User weight={"fill"} size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">PROFILE</span> </h1>
                <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

                {
                    !userNotFound
                    ?
                        <>
                            <img className="my-4 w-72 h-72 object-cover rounded-full"
                                 src={`${s3Url}/user${username}`}  alt="Profile pic"/>
                            <span className="my-4">{username}</span>
                            {
                                userProfile.bio
                                &&
                                <pre className="whitespace-pre-wrap break-words w-3/5 my-4 text-center">{userProfile.bio}</pre>
                            }

                            <div id={"userData"} className="fixed right-0 top-0 mr-6 rounded-lg p-2 w-80 mt-20 hidden xl:flex flex-col justify-center items-center bg-slate-900">
                                <span className="font-bold text-lg">Owner:</span>
                                <div className={"flex flex-col overflow-y-scroll overflow-x-clip max-h-56 w-4/5 text-center mb-4"}>
                                    {
                                        communityOwner.map(community => {
                                            return (
                                                <a href={`/c/${community.name}`} key={community.id}>{community.name}</a>
                                            )
                                        })
                                    }
                                </div>

                                <span className="font-bold text-lg">Created at:</span>
                                <span className="mb-4">{userProfile.createdAt}</span>
                            </div>
                            {
                                showPosts.length > 0
                                ?
                                showPosts.map((post) => {
                                    return (
                                    <Post
                                            fnTrigger={fnTrigger}
                                            key={post.id}
                                            post={post}
                                            likeType={userLikes.find((user) => user.postId === post.id)?.["likeType"]}
                                            toShowComment={toShowComment}
                                        />
                                    )
                                })
                                :
                                <NothingYet />
                            }
                        </>
                    :
                    <>
                        <img className="my-4 w-72 h-72 object-cover rounded-full"
                             src={`${s3Url}/default.png`} alt="Profile pic"/>
                        <span className="my-4">{username}</span>

                        <div className="text-3xl font-bold mt-16">
                            <h1>USER NOT FOUND</h1>
                        </div>
                    </>
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


export default ProfilePage;