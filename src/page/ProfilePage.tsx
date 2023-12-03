import { useEffect, useState } from "react";
import Post from "../component/Post";
import { useParams } from "react-router-dom";
import { Axios } from "../lib/axios";

function ProfilePage() {
    const { username } = useParams();

    const [userExist, setUserExist] = useState(false);
    const [posts, setPosts] = useState([false]);

    useEffect(() => {
        Axios.get(`/post/get/all/${username}`, {
            "headers": {
                "Authorization" : localStorage.getItem("token")
            }
        })
            .then(data => {
                console.log(data);
                setPosts(data.data);













                setUserExist(true);   
            })
            .catch(err => {
                console.log(err)
                setUserExist(true);   
            })
    }, [])

    return (
        <>
            {
                userExist
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
                    <h1>USER NOT FOUND</h1>
                </div>
            }
        </>
    )
}

export default ProfilePage;