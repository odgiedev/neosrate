import {Axios} from "../lib/axios.ts";
import {useEffect, useState} from "react";
import Post from "../component/Post.tsx";
import PostCreate from "../component/PostCreate.tsx";

function HomePage() {
    const [userId, setUserId] = useState("202");
    const [community, setCommunity] = useState("tech");
    const [username, setUsername] = useState("admin");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Axios.get("/post/get/all")
            .then(data => {
                setPosts(data.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <div className="flex flex-col items-center w-1/2 min-h-screen mx-auto bg-slate-700">
                {
                    posts.map(post => {
                        return (
                            <Post id={post.id} username={post.username} title={post.title} text={post.text}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default HomePage;