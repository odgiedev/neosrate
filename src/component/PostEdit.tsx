import { TrashSimple } from "phosphor-react";
import { Axios } from "../lib/axios";

function PostEdit(post) {
    function handleDeletePost(postId: number) {
        Axios.delete(`/post/delete/${postId}`, {
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }   

    return (
        <div className="flex border rounded bg-slate-600 my-6 p-2 w-10/12 text-lg">
            <div className="border-r">
                <TrashSimple onClick={() => handleDeletePost(post.postId)} className="hover:cursor-pointer" size={30} />
            </div>
            <div className="ml-2">
                <span className="text-sm font-bold">c/{post.community} - </span>
                <span className="text-sm">Posted by u/{post.username} - 12/11/23 18:42:18</span> <br />
                <span className="font-bold">{post.title}</span>
                {
                    post.file !== null
                    ?
                    <div className="flex justify-center">
                        <img 
                            className="h-40"
                            src="/public/testimg.jpg"
                        />

                        {/* <video width="320" height="240">
                            <source src="/jean.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video> */}
                    </div>
                    :
                    <p className="">{post.text}</p>
                }
            </div>
        </div>
    )
}

export default PostEdit;