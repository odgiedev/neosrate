import {Axios} from "../lib/axios.ts";
import {useEffect, useState} from "react";
import Post from "../component/Post.tsx";
import NothingYet from "../component/NothingYet.tsx";
import {CaretDoubleDown, House} from "phosphor-react";
import Message from "../component/Message.tsx";

function HomePage() {
    const userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : -1;

    const [showPosts, setShowPosts] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const [toShowComment, setToShowComment] = useState([]);

    const [trigger, setTrigger] = useState(1);

    const [maxPerPage, setMaxPerPage] = useState(10);
    const [haveMorePost, setHaveMorePost] = useState(false);

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        Axios.get(`/post/get/all/${maxPerPage}/${userId}`)
            .then(data => {
                const {posts, userLikes, totalPosts} = data.data;
                setShowPosts(posts.content);
                setUserLikes(userLikes.reverse())

                if (totalPosts === showPosts.length) {
                    setHaveMorePost(false)
                } else {
                    setHaveMorePost(true)
                }
            })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))

        Axios.get("/comment/get/all")
            .then(data => {
                setToShowComment(data.data)
            })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."));
    }, [trigger, maxPerPage]);

    function fnTrigger() {
        setTrigger(old => old + 1);
    }

    return (
        <div className="flex flex-col w-full bg-gradient-to-b from-slate-900 via-violet-900 to-violet-950">
            <div className="flex flex-col pt-10 items-center sm:w-1/2 min-h-screen mx-auto">
                <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

                <h1 className="font-bold text-xl flex items-center justify-center"> <House weight={"fill"} size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">HOME</span> </h1>
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
                    <div className="flex items-center h-full pb-12">
                        <NothingYet />
                    </div>
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

export default HomePage;