import {useEffect, useState} from "react";
import Post from "../component/Post";
import {Axios} from "../lib/axios";

function ProfilePage() {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        Axios.get(`/post/get/all/user/${userId}`, {
            "headers": {
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
            {/*<CommunityCreateModal />*/}

            <div className="flex flex-col items-center w-1/2 min-h-screen mx-auto bg-slate-700">
                <img className="my-4 w-72 rounded-full"
                     src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e7ee321e-6f22-4e8b-8d29-2afb519141bb/dduwas1-b9f13643-dbd8-4e10-b19d-6b8d7e7b4e13.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U3ZWUzMjFlLTZmMjItNGU4Yi04ZDI5LTJhZmI1MTkxNDFiYlwvZGR1d2FzMS1iOWYxMzY0My1kYmQ4LTRlMTAtYjE5ZC02YjhkN2U3YjRlMTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XSvZRk4yJjj0Em0HkwJcqPkKfvYxS4VMIpNVFIZeVfg"/>
                <span className="my-4">{username}</span>
                <p className="w-3/5 my-4 text-center">bio</p>

                {
                    posts
                    &&
                    posts.map((post) => {
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

//     const { username } = useParams();

//     const [userExist, setUserExist] = useState(false);
//     const [posts, setPosts] = useState([false]);

//     useEffect(() => {
//         Axios.get(`/post/get/all/${username}`, {
//             "headers": {
//                 "Authorization" : localStorage.getItem("token")
//             }
//         })
//             .then(data => {
//                 console.log(data);
//                 setPosts(data.data);


//                 setUserExist(true);
//             })
//             .catch(err => {
//                 console.log(err)
//                 setUserExist(true);   
//             })
//     }, [])

//     return (
//         <>
//             {
//                 userExist
//                 ?
//                     posts.length > 0
//                     ?
//                     posts.map(post => {
//                         return (
//                             <Post key={post.id} username={post.username} title={post.title} text={post.text}/>
//                         )
//                     })
//                     :
//                     <div className="mt-6">
//                         <h1>Nothing yet.</h1>
//                     </div>
//                 :
//                 <div>
//                     <h1>USER NOT FOUND</h1>
//                 </div>
//             }
//         </>
//     )
// }

export default ProfilePage;