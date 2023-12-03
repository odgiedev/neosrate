import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Axios} from "../lib/axios.ts";
import Post from "../component/Post.tsx";
import PostCreate from "../component/PostCreate.tsx";

function CommunityPage() {
    const { community } = useParams();
    const [posts, setPosts] = useState([]);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    const [communityExist, setCommunityExist] = useState(false);

    function handleCreatePost(event: { preventDefault: () => void; }) {
        event.preventDefault();

        Axios.post("/post/create", {userId, community, username, title, text}, {
            "headers": {
                "Authorization" : localStorage.getItem("token")
            }
        })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        Axios.get(`/post/get/all/community/${community}`, {
            "headers": {
                "Authorization" : localStorage.getItem("token")
            }
        })
            .then(data => {
                setPosts(data.data)
                setCommunityExist(true);
            })
            .catch(err => {
                console.log(err.response.data)
                setCommunityExist(false);
            })
    }, []);

    return (
        <>
            <div className="flex flex-col items-center w-1/2 min-h-screen mx-auto bg-slate-700">
                {
                    communityExist
                    &&
                    <PostCreate handleCreatePost={handleCreatePost} setTitle={setTitle} setText={setText} community={community} />
                }

                {
                    communityExist
                    ?
                        posts.length > 0
                        ?
                        posts.map(post => {
                            return (
                                <Post key={post.id} username={post.username} title={post.title} text={post.text}/>
                            )
                        })
                        :
                        <div className="mt-6">
                            <h1>Nothing yet.</h1>
                        </div>
                    :
                    <div>
                        <h1>COMMUNITY NOT FOUND</h1>
                    </div>
                }
            </div>
        </>
    )
}

export default CommunityPage;