import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Axios} from "../lib/axios.ts";
import Post from "../component/Post.tsx";
import PostCreate from "../component/PostCreate.tsx";
import Message from "../component/Message.tsx";
import {CaretDoubleDown} from "phosphor-react";
import NothingYet from "../component/NothingYet.tsx";

function CommunityPage() {
    const {community} = useParams();
    const [showPosts, setShowPosts] = useState([]);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState([]);

    const userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : -1;
    const username = localStorage.getItem("username");

    const [communityData, setCommunityData] = useState([false]);

    const [communityExist, setCommunityExist] = useState(false);

    const [userLikes, setUserLikes] = useState([]);

    const [toShowComment, setToShowComment] = useState([]);

    const [communityParticipants, setCommunityParticipants] = useState([]);

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [postCreateModal, setPostCreateModal] = useState(false);

    const s3Url = "https://neosrate.s3.sa-east-1.amazonaws.com"

    const [trigger, setTrigger] = useState(1)

    const [maxPerPage, setMaxPerPage] = useState(10);

    const [haveMorePost, setHaveMorePost] = useState(true);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            Axios.get(`/post/get/all/community/${maxPerPage}/${community}/${userId}`)
                .then(data => {
                    const {posts, userLikes, comments, totalPosts} = data.data;
                    setShowPosts(posts);
                    setUserLikes(userLikes);
                    setToShowComment(comments);
                    setCommunityExist(true);

                    if (totalPosts === showPosts.length) {
                        setHaveMorePost(false)
                    } else {
                        setHaveMorePost(true)
                    }
                })
                .catch(() => {
                    setCommunityExist(false);
                })

            Axios.get(`/community/get/community/${community}`)
                .then(data => {
                    setCommunityData(data.data);
                })
                .catch(err => setErrorMsg(err.response.data || "An error occurred."));

            Axios.get(`/community/get/participants/${community}`)
                .then(data => {
                    setCommunityParticipants(data.data)
                })
                .catch(err => setErrorMsg(err.response.data || "An error occurred."));
        }
        fetchData();
    }, [trigger, maxPerPage]);

    function fnTrigger() {
        setTrigger(old => old + 1);
    }

    function handleCreatePost(event: { preventDefault: () => void; }) {
        event.preventDefault();

        const dataJson = JSON.stringify({ community, username, title, text });
            
        const blob = new Blob([dataJson], {
            type: 'application/json'
        });

        const formData = new FormData();

        formData.append('data', blob);
        formData.append('file', file[0]);

        const headers = {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            }
        }

        Axios.post(`/post/create/${userId}`, formData, headers)
            .then(data => {
                setSuccessMsg(data.data)
                fnTrigger();
                setTitle("");
                setText("");
                setFile([]);

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."));
    }

    function handleJoinCommunity() {
        Axios.post(`/community/join/${userId}`, {username, community}, {
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(data => {
                setSuccessMsg(data.data);
                fnTrigger();
            })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."));
    }

    const alreadyJoined = communityParticipants.some(innerArray =>
        Object.values(innerArray).includes(username)
    );

    return (
        <div className="bg-gradient-to-b from-slate-900 via-violet-900 to-violet-950">
            <div className="flex flex-col pt-12 items-center sm:w-1/2 min-h-screen mx-auto">
                <div className="flex flex-wrap w-full py-12 justify-around items-center text-xl font-bold bg-gradient-to-r from-slate-950 via-violet-950 to-slate-950">
                    <img className="my-4 h-52 w-52 object-cover rounded-full"
                         src={communityExist ? `${s3Url}/community${community}` : `${s3Url}/community_default.png`}  alt="Community pic"/>
                    <span className={"mx-5 md:mx-0"}>c/{community}</span>

                    {
                    communityExist && localStorage.getItem("authenticated") === "true"
                        ?
                            alreadyJoined
                            ?
                            <button onClick={() => handleJoinCommunity() } className="bg-slate-200 text-black rounded p-2 mx-10 mt-4 md:mt-0 md:mx-0">Leave</button>
                            :
                            <button onClick={() => handleJoinCommunity() } className="bg-slate-200 text-black rounded p-2 mx-10 mt-4 md:mt-0 md:mx-0">Join</button>
                        :
                        null
                    }

                </div>
                {
                    communityExist && localStorage.getItem("authenticated") === "true"
                    &&
                    <button className="bg-green-500 border-4 border-black text-black font-bold rounded p-2 my-2" onClick={() => setPostCreateModal(old => !old)}>Create Post</button>
                }
                {
                    postCreateModal
                    &&
                    <>
                        <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

                        <PostCreate handleCreatePost={handleCreatePost}
                                    title={title}
                                    setTitle={setTitle}
                                    text={text}
                                    setText={setText}
                                    community={community}
                                    file={file}
                                    setFile={setFile}
                                    fileInputRef={fileInputRef}
                        />
                    </>
                }

                {
                    communityExist
                    ?
                    <>
                        <div className="fixed right-0 top-0 mr-6 rounded-lg px-2 py-6 w-80 mt-14 hidden xl:flex flex-col justify-center items-center bg-slate-900">
                            <span className="font-bold text-lg">Description:</span>
                            <p className={"w-10/12 text-center mb-4"}>{communityData.description}</p>

                            <span className="font-bold text-lg">Owner:</span>
                            <a href={`/user/${communityData.creator}`} className="mb-4">{communityData.creator}</a>

                            <span className="font-bold text-lg">Participants: {communityParticipants.length}</span>
                            <div className={"flex flex-col overflow-y-scroll overflow-x-clip max-h-56 w-4/5 text-center"}>
                                {
                                    communityParticipants.map(participant => {
                                        return (
                                            <a href={`/user/${participant.username}`} key={participant.id}>{participant.username}</a>
                                        )
                                    })
                                }
                            </div>

                            <span className="font-bold text-lg mt-4">Created at:</span>
                            <span>{communityData.createdAt}</span>
                        </div>

                        {
                            showPosts.length > 0
                            ?
                            showPosts.map(post => {
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
                    <div className="text-3xl font-bold mt-32">
                        <h1>COMMUNITY NOT FOUND</h1>
                    </div>
                }
                {
                    haveMorePost && communityExist &&
                    <div className={"mb-6"}>
                        <button onClick={() => {
                            setMaxPerPage(maxPerPage + 10)
                        }}><CaretDoubleDown size={32} /></button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommunityPage;