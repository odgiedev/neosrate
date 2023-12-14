import {Axios} from "../lib/axios.ts";
import {useEffect, useState} from "react";
import Post from "../component/Post.tsx";
import PostCreate from "../component/PostCreate.tsx";

function HomePage() {
    const userId = localStorage.getItem("userId");

    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        Axios.get(`/post/get/all/${userId}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(data => {
                const { posts, userLikes } = data.data;
                setPosts(posts);
                for (let i = 0; i < userLikes.length; i++) {
                    setLikedPosts(old => [...old, [userLikes[i].postId, userLikes[i].likeType]])
                }
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <div className="flex flex-col items-center w-1/2 min-h-screen mx-auto bg-slate-700">
                {
                    posts.map(post => {
                        return (
                            <Post key={post.id} postId={post.id} community={post.community} username={post.username}
                                  title={post.title} text={post.text} file={post.filePath}
                                  likeType={likedPosts.find(([postId]) => postId === post.id)?.[1]}
                                  likeCount={post.likeCount} dislikeCount={post.dislikeCount}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

export default HomePage;