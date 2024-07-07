import {useEffect, useState} from "react";
import {Axios} from "../lib/axios.ts";
import Post from "../component/Post.tsx";
import NothingYet from "../component/NothingYet.tsx";
import {CaretDoubleDown, Globe} from "phosphor-react";
import Message from "../component/Message.tsx";

function JoinedPage() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [showPosts, setShowPosts] = useState([]);
    const [userLikes, setUserLikes] = useState([]);

    const [toShowComment, setToShowComment] = useState([]);

    const [trigger, setTrigger] = useState(1)

    const [maxPerPage, setMaxPerPage] = useState(10);
    const [haveMorePost, setHaveMorePost] = useState(false);

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        Axios.get(`/post/get/joined/${maxPerPage}/${userId}`,{
            "headers": {"Authorization": token}
        })
            .then(data => {
            const {posts, userLikes, comments, totalPosts} = data.data;
            console.log(data.data)
            setShowPosts(posts);
            setUserLikes(userLikes);
            setToShowComment(comments);

            if (totalPosts === showPosts.length) {
                setHaveMorePost(false)
            } else {
                setHaveMorePost(true)
            }
        })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }, [maxPerPage, trigger]);

    function fnTrigger() {
        setTrigger(old => old + 1);
    }

    return (
        <div className={"min-h-screen w-full bg-gradient-to-b from-slate-900 via-violet-900 to-violet-950"}>
            <div className="flex flex-col pt-12 items-center sm:w-1/2 min-h-screen mx-auto">
                <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

                <h1 className="font-bold text-xl flex items-center justify-center"> <Globe size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">JOINED</span> </h1>

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
                        <NothingYet msg={"Find an active community to join."} />
                }
                {
                    haveMorePost &&
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

export default JoinedPage;