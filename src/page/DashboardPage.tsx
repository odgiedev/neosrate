import CommunityCreateModal from "../component/CommunityCreateModal.tsx";
import Post from "../component/Post.tsx";
import {useEffect, useState} from "react";
import {Axios} from "../lib/axios.ts";
import PostEdit from "../component/PostEdit.tsx";

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
                <img className="my-4 w-72 rounded-full" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e7ee321e-6f22-4e8b-8d29-2afb519141bb/dduwas1-b9f13643-dbd8-4e10-b19d-6b8d7e7b4e13.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U3ZWUzMjFlLTZmMjItNGU4Yi04ZDI5LTJhZmI1MTkxNDFiYlwvZGR1d2FzMS1iOWYxMzY0My1kYmQ4LTRlMTAtYjE5ZC02YjhkN2U3YjRlMTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XSvZRk4yJjj0Em0HkwJcqPkKfvYxS4VMIpNVFIZeVfg" />
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
                            <PostEdit key={post.id} postId={post.id} username={post.username} title={post.title} text={post.text} file={post.filePath} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default DashboardPage;