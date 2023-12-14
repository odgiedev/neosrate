import CommunityCreateModal from "../component/CommunityCreateModal.tsx";
import Post from "../component/Post.tsx";
import {useEffect, useState} from "react";
import {Axios} from "../lib/axios.ts";
import PostEdit from "../component/PostEdit.tsx";

function DashboardPage() {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    const [posts, setPosts] = useState([]);
    const [userProfile, setUserProfile] = useState([]);

    const [bio, setBio] = useState("");

    const [communityCreateModalEnable, setCommunityCreateModalEnable] = useState(false);

    useEffect(() => {
        Axios.get(`/userprofile/get/${userId}`, {
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(data => {
                setUserProfile(data.data)
                setBio(data.data.bio)
            })
            .catch(err => console.log(err))

        Axios.get(`/post/get/all/user/${userId}`, {
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(data => {
                setPosts(data.data.posts)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <button className="bg-black" onClick={() => setCommunityCreateModalEnable(old => !old)}>Create community
            </button>

            {
                communityCreateModalEnable
                    ?
                    <CommunityCreateModal/>
                    :
                    null
            }

            <div className="flex flex-col items-center w-1/2 min-h-screen mx-auto bg-slate-700">
                <img className="my-4 w-72 rounded-full" src={`/${userProfile.pfpPath !== null ? userProfile.pfpPath : "hxh.jpeg"}`}/>
                <span className="my-4">{username}</span>
                <input className="w-3/5 my-4 text-center bg-black" onChange={event => setBio(event.target.value)}
                       value={bio}/>

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
                            <PostEdit key={post.id} postId={post.id} username={post.username} title={post.title}
                                      text={post.text} file={post.filePath}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default DashboardPage;