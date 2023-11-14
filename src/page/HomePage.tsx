import {Axios} from "../lib/axios.ts";
import {useEffect, useState} from "react";

function HomePage() {
    const [userId, setUserId] = useState("202");
    const [username, setUsername] = useState("admin");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    function handleCreatePost(event: { preventDefault: () => void; }) {
        event.preventDefault();

        Axios.post("/post/create", {userId, username, title, text})
            .then(data => console.log(data))
            .catch(err => console.log(err.response));
    }

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
                <form onSubmit={handleCreatePost} className="flex flex-col items-center w-11/12 text-black">
                    <h1 className="text-2xl text-slate-100">Create a post</h1>
                    <select className="my-3">
                        <option value="option1">Programming</option>
                        <option value="option2">Food</option>
                        <option value="option3">Anime</option>
                    </select>
                    <input type="text" placeholder="Title" className="rounded p-2 my-2 w-1/2"
                           onChange={(event) => setTitle(event.target.value)}
                    />
                    <input type="text" placeholder="Text (optional)" className="rounded p-2 my-2 w-1/2"
                           onChange={(event) => setText(event.target.value)}
                    />
                    {/*<input type="file" />*/}
                    <button className="bg-green-500 rounded py-2 my-2 w-1/2 text-slate-100">Post</button>
                </form>
                {
                    posts.map(post => {
                        return (
                            <div key={post.id} className="border rounded bg-slate-600 my-6 p-2 w-10/12 text-lg">
                                <span className="text-sm">c/programming - Posted by u/{post.username} - 12/11/23 18:42:18</span> <br />
                                <span className="font-bold">{post.title}</span>
                                <p className="">{post.text}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default HomePage;