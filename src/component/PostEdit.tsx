import {Check, X, Pencil, Trash} from "phosphor-react";
import { Axios } from "../lib/axios";
import {useState} from "react";
import Message from "./Message.tsx";

function PostEdit({post, fnTrigger}) {
    const [toDelete, setToDelete] = useState(false);
    const [toEdit, setToEdit] = useState(false);

    const [title, setTitle] = useState(post.title);
    const [text, setText] = useState(post.text);
    const [file, setFile] = useState(post.filePath);

    const s3Url = "https://neosrate.s3.sa-east-1.amazonaws.com"

    let extension;

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    if (post.filePath !== null) {
        extension = post.filePath.split('.').pop();
    }

    function isImage(extension: string) {
        if (extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "gif") {
            return true;
        }
        return false;
    }

    function handleDeletePost() {
        Axios.delete(`/post/delete/${post.id}/${post.userId}`, {
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(() => fnTrigger())
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    function handleEditPost() {
        const dataJson = JSON.stringify({title, text});

        const blob = new Blob([dataJson], {
            type: 'application/json'
        });

        const formData = new FormData();

        formData.append('data', blob);

        if (file) {
            formData.append('file', file[0]);
        }

        Axios.put(`/post/update/${post.id}/${post.userId}`, formData, {
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(() => fnTrigger())
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    return (
        <div className="flex flex-col items-center border border-violet-800 py-4 rounded bg-slate-800 my-6 p-2 w-9/12 text-lg">
            <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

            <div className="border-b border-violet-800 pb-2 w-full flex justify-around pr-2 cursor-pointer">
                {
                    toDelete
                    ?
                    <>
                        <Check onClick={() => handleDeletePost()} size={30} color="#d20404" />
                        <X onClick={() => setToDelete(false)} size={30} color="#22c55e" />
                    </>
                    :
                    <Trash onClick={() => setToDelete(true)} className="hover:cursor-pointer" size={30} />
                }
                {
                    toEdit
                    ?
                    <>
                        <Check onClick={() => handleEditPost()} size={30} color="#1d4ed8" />
                        <X onClick={() => setToEdit(false)} size={30} color="#22c55e" />
                    </>
                    :
                    <Pencil onClick={() => setToEdit(true)} className="hover:cursor-pointer" size={30} />
                }
            </div>
            <div className="w-full overflow-auto">
                <div className="flex flex-col justify-center items-center pt-4 mb-2 text-sm text-violet-400">
                    <div className="flex">
                        <span className="font-bold">c/{post.community}</span>
                        <span className="hidden lg:inline">&nbsp;- u/{post.username}</span>
                        <span>&nbsp;{post.createdAt}</span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <input placeholder={"Title"} onChange={event => setTitle(event.target.value)} type={"text"} className="w-4/5 font-bold p-2 mb-2 rounded-lg bg-slate-900" value={title} />
                </div>
                {
                    post.filePath !== null
                    ?
                        <div className="flex justify-center">
                            {
                                isImage(extension)
                                    ?
                                    <div className="relative w-72 h-72 overflow-hidden">
                                        <img className="absolute inset-0 h-full w-full object-cover" src={`${s3Url}/${post.filePath}`} alt="Your Image"/>
                                        <input className="absolute inset-0 w-full h-full cursor-pointer opacity-0" type="file" onChange={e => setFile(e.target.files)}/>
                                    </div>
                                    :
                                    <div className="relative w-72 h-72 overflow-hidden">
                                        <video controls className="absolute inset-0 h-full w-full object-cover">
                                            <source
                                                src={`${s3Url}/${post.filePath}`}
                                                type="video/mp4"
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                        <input className="absolute inset-0 w-full h-full cursor-pointer opacity-0" type="file" onChange={e => setFile(e.target.files)}/>
                                    </div>

                            }
                        </div>
                    :
                    <div className="flex justify-center">
                        <textarea placeholder={"Text"} onChange={event => setText(event.target.value)} className="w-9/12 font-bold p-2 h-12 rounded-lg bg-slate-900" value={text}></textarea>
                    </div>
                }
            </div>
        </div>
    )
}

export default PostEdit;