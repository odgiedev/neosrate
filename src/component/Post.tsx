import {PaperPlaneRight, ThumbsDown, ThumbsUp} from "phosphor-react";
import {Axios} from "../lib/axios.ts";
import {useState} from "react";

function Post(post) {
    const userId = localStorage.getItem("userId");

    const [comment, setComment] = useState("");

    function handleLike(likeTrigger: number) {
        Axios.put(`post/update/${post.postId}`, {likeTrigger, "userIdLiker": userId}, {
            "headers": {"Authorization": localStorage.getItem("token")}
        })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    function handleComment(event) {
        event.preventDefault();

        console.log(comment)
    }

    return (
        <div className="border rounded bg-slate-600 my-6 p-2 w-10/12 text-lg">
            <div className="flex">
                <div className="flex flex-col justify-center items-center mx-2">
                    <span>{post.likeCount}</span>
                    {
                        post.likeType == 1
                        ?
                        <button onClick={() => handleLike(0)}><ThumbsUp size={32} color="#d20404" weight="fill" /></button>
                        :
                        <button onClick={() => handleLike(1)}><ThumbsUp size={32} color="#d20404" /></button>
                    }
                    {
                        post.likeType == -1
                        ?
                        <button onClick={() => handleLike(0)}><ThumbsDown size={32} color="#d20404" weight="fill" /></button>
                        :
                        <button onClick={() => handleLike(-1)}><ThumbsDown size={32} color="#d20404" /></button>
                    }

                    <span>-{post.dislikeCount}</span>
                </div>
                <div>
                    <span className="text-sm font-bold">c/{post.community} - </span>
                    <span className="text-sm">Posted by u/{post.username} - 12/11/23 18:42:18</span> <br />
                    <span className="font-bold">{post.title}</span>
                    {
                        post.file !== null
                        ?
                        <div className="flex justify-center">
                            <img
                                className="h-96"
                                src="/public/testimg.jpg"
                            />

                            {/* <video controls>
                                <source src="/4k.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video> */}
                        </div>
                        :
                        <p className="">{post.text}</p>
                    }
                </div>
            </div>
            <form onSubmit={handleComment} className="flex justify-center items-center text-black">
                <input onChange={event => setComment(event.target.value)} placeholder="reply..."/>
                <button type="submit" ><PaperPlaneRight size={32} color="#d20404" weight="fill" /></button>
            </form>
        </div>
    )
}

export default Post;