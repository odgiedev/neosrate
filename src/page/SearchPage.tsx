import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Axios} from "../lib/axios.ts";
import Post from "../component/Post.tsx";
import {CaretDoubleDown, Ghost, MagnifyingGlass} from "phosphor-react";

function SearchPage() {
    const [param] = useSearchParams();
    const searchQuery = param.get("q");

    const userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : -1

    const [showPosts, setShowPosts] = useState([]);
    const [userLikes, setUserLikes] = useState([]);

    const [notFoundSearch, setNotFoundSearch] = useState(false);

    const [toShowComment, setToShowComment] = useState([]);

    const [trigger, setTrigger] = useState(1)

    const [maxPerPage, setMaxPerPage] = useState(10);
    const [haveMorePost, setHaveMorePost] = useState(false);

    function fnTrigger() {
        setTrigger(old => old + 1);
    }

    useEffect(() => {
        Axios.get(`/post/search/${maxPerPage}/${userId}/${searchQuery}`)
            .then(data => {
                const {posts, userLikes, comments, totalPosts} = data.data;
                setShowPosts(posts);
                setUserLikes(userLikes);
                setToShowComment(comments);
                setNotFoundSearch(false);

                if (totalPosts === showPosts.length) {
                    setHaveMorePost(false)
                } else {
                    setHaveMorePost(true)
                }
            }
        )
            .catch(() => setNotFoundSearch(true))
    }, [trigger, searchQuery, maxPerPage]);

    return (
        <div className={"w-full bg-gradient-to-b from-violet-950 via-slate-900 to-violet-950"}>
            <div className="flex flex-col pt-12 items-center sm:w-1/2 min-h-screen mx-auto">
                <h1 className="font-bold text-xl flex items-center justify-center mb-4"> <MagnifyingGlass size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">SEARCH</span> </h1>
                <span className={"font-semibold text-lg"}>Showing results for "{searchQuery}".</span>
                {
                    !notFoundSearch
                    ?
                    <>
                        {showPosts.map(post => {
                            return (
                                <Post
                                    key={post.id}
                                    post={post}
                                    likeType={userLikes.find((user) => user.postId === post.id)?.["likeType"]}
                                    toShowComment={toShowComment} fnTrigger={fnTrigger}
                                />
                            )
                        })}
                        {
                            haveMorePost &&
                            <div className={"mb-6"}>
                                <button onClick={() => setMaxPerPage(maxPerPage + 10)}><CaretDoubleDown size={32} /></button>
                            </div>
                        }
                    </>
                    :
                    <div className="flex items-center h-full mt-20 text-xl">
                        <Ghost size={48} className={"mr-2"} />
                        <span>Nothing found.</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchPage;