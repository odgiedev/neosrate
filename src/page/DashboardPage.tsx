import CommunityCreateModal from "../component/CommunityCreateModal.tsx";
import Post from "../component/Post.tsx";
import {useEffect, useState} from "react";
import {Axios} from "../lib/axios.ts";

function DashboardPage() {
    const username = localStorage.getItem("username");

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Axios.get(`/post/get/all/${username}`, {
            "headers": {
                "Authorization" : localStorage.getItem("token")
            }
        })
            .then(data => setPosts(data.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            {/*<CommunityCreateModal />*/}

            <div className="flex flex-col items-center w-1/2 min-h-screen mx-auto bg-slate-700">
                <img className="my-4 w-72 rounded-full" src="https://i.pinimg.com/474x/d5/07/32/d507327e88e76a275c0843281da4f1ac.jpg" />
                <span className="my-4">{username}</span>
                <p className="w-3/5 my-4 text-center">bio</p>

                {/*<select className="my-3 p-1 bg-slate-400 rounded">*/}
                {/*    <option value="option1">Programming</option>*/}
                {/*    <option value="option2">Food</option>*/}
                {/*    <option value="option3">Anime</option>*/}
                {/*</select>*/}

                {
                    posts
                    &&
                    posts.map((post) => {
                        return (
                            <Post key={post.id} username={post.username} title={post.title} text={post.text}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default DashboardPage;