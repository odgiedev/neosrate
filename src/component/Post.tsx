import {ArrowFatLinesDown, PaperPlaneRight, ThumbsDown, ThumbsUp, TrashSimple} from "phosphor-react";
import {Axios} from "../lib/axios.ts";
import {useEffect, useState} from "react";
import Message from "./Message.tsx";

function Post({post, likeType, toShowComment, fnTrigger}) {
    const userId = localStorage.getItem("userId");

    const username = localStorage.getItem("username");

    const token = localStorage.getItem("token");

    const [comment, setComment] = useState("");

    const propPostId = post.id;

    const propCommunity = post.community;

    const s3Url = "https://neosrate.s3.sa-east-1.amazonaws.com"

    const [maxComments, setMaxComments] = useState(2);

    const toShowCommentFiltered = toShowComment.filter((comment) => comment.postId === propPostId).reverse();

    const slicedComments = toShowCommentFiltered.slice(0, maxComments)

    const [currentComments, setCurrentComments] = useState(slicedComments);

    const [haveMoreComment, setHaveMoreComment] = useState(true);

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    let extension;

    if (post.filePath !== null) {
        extension = post.filePath.split('.').pop();
    }

    useEffect(() => {
        setCurrentComments(slicedComments)

        if (slicedComments.length === toShowCommentFiltered.length) {
            setHaveMoreComment(false)
        } else {
            setHaveMoreComment(true)
        }

    }, [toShowComment, maxComments, haveMoreComment]);


    function handleLike(likeTrigger: number) {
        const dataJson = JSON.stringify({ likeTrigger, "userIdLiker": userId });

        const blob = new Blob([dataJson], {
            type: 'application/json'
        });

        const formData = new FormData();

        formData.append('data', blob);

        Axios.put(`post/update/${propPostId}/${userId}`, formData, {
            "headers": {"Authorization": token}
        })
            .then(() => fnTrigger())
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    function handleCreateComment(event) {
        event.preventDefault();

        Axios.post(`comment/create/${userId}`, {postId: propPostId, userId, "creator": username, comment, "community": propCommunity}, {
            "headers": {"Authorization": token}
        })
            .then(() => {
                setComment("");
                fnTrigger();
            })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    function handleDeleteComment(postId, commentOwner) {
        Axios.delete(`/comment/delete/${postId}/${commentOwner}`, {
            "headers": {"Authorization": token}
        })
            .then(() => fnTrigger())
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    function isImage(extension: string) {
        if (extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "gif") {
            return true;
        }
        return false;
    }

    return (
        <div className="rounded bg-slate-800 border border-violet-800 my-6 w-10/12 text-lg">
            <div className="flex flex-col items-center justify-between">
                <div className="h-fit w-full">
                    <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

                    <div className="flex flex-col justify-center px-6 pt-4 mb-2 text-sm text-violet-600">
                        <div className="flex flex-wrap">
                            <img className="h-12 w-12 object-cover rounded-full mr-2"
                                 src={`${s3Url}/community${propCommunity ? propCommunity : "community_default.png"}`}  alt="Community pic"/>

                            <a href={`/c/${post.community}`} className="font-bold">c/{post.community}</a>
                            <a href={`/user/${post.username}`} className="hidden font-bold lg:inline">&nbsp;- u/{post.username}</a>
                            <span className={"my-4 xl:m-0"}>&nbsp;{post.createdAt}</span>
                        </div>
                        <div className="text-violet-200 mt-2">
                            <span className="font-bold text-2xl">{post.title}</span>
                        </div>
                    </div>

                    {
                        post.filePath !== null
                            ?
                            <div className="h-fit flex justify-center">
                                {
                                    isImage(extension)
                                        ?
                                        <img
                                            className="w-full object-cover"
                                            src={`${s3Url}/${post.filePath}`}
                                            alt={"Post image"}
                                        />
                                        :
                                        <video controls className="w-full object-cover">
                                            <source
                                                src={`${s3Url}/${post.filePath}`}
                                                type="video/mp4"
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                }
                            </div>
                            :
                            <pre className="whitespace-pre-wrap break-words ml-6 mb-4 mt-6 text-xl">{post.text}</pre>
                    }
                </div>
                <div className="border-t border-violet-800 w-11/12">
                    <div className="flex flex-wrap justify-between items-center mt-3 sm:mx-2 sm:my-4">
                        <div className="flex justify-between items-center">
                            <span className="mr-2 font-bold">{post.likeCount}</span>
                            {
                                token !== null
                                ?
                                <>
                                    {
                                        likeType == 1
                                            ?
                                            <button onClick={() => handleLike(0)}><ThumbsUp size={32} color="#16a34a" weight="fill" /></button>
                                            :
                                            <button onClick={() => handleLike(1)}><ThumbsUp size={32} color="#16a34a" /></button>
                                    }
                                    {
                                        likeType == -1
                                            ?
                                            <button onClick={() => handleLike(0)}><ThumbsDown size={32} color="#dc2626" weight="fill" /></button>
                                            :
                                            <button onClick={() => handleLike(-1)}><ThumbsDown size={32} color="#dc2626" /></button>
                                    }
                                </>
                                :
                                <>
                                    <a href="/u/signin"><ThumbsUp size={32} color="#16a34a" /></a>
                                    <a href="/u/signin"><ThumbsDown size={32} color="#dc2626" /></a>
                                </>
                            }
                            <span className="ml-2 font-bold`">-{post.dislikeCount}</span>
                        </div>
                        <div className="mt-2 lg:mt-0 w-80">
                            {
                                token !== null
                                    ?
                                    toShowComment
                                        ?
                                        <>
                                            <form onSubmit={handleCreateComment} className="flex justify-between items-center text-black mt-2">
                                                <img className="h-8 w-8 object-cover rounded mr-2"
                                                     src={`${s3Url}/user${username}`}  alt="Authenticated pic"
                                                />
                                                <input className="px-2 py-1 w-full rounded-lg bg-violet-100" value={comment} onChange={event => setComment(event.target.value)} placeholder={`Reply as @${username}`}/>
                                                <button type="submit" ><PaperPlaneRight size={32} color="#6d28d9" weight="fill" /></button>
                                            </form>
                                        </>
                                        :
                                        <span>No comment.</span>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <>
                        {
                            toShowComment
                            &&
                            currentComments.map(comment => {
                                return (
                                    <div key={comment.id} className="my-2">
                                        {
                                            <div className="flex ml-4">
                                                <img className="w-8 h-8 object-cover rounded-full mr-2"
                                                     src={`${s3Url}/user${comment.creator}`}  alt="Authenticated pic"
                                                />
                                                <div className="flex flex-col border p-2 rounded-lg border-green-800">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <span className="font-bold text-green-500">{comment.creator} -</span>
                                                            <span className="font-bold text-green-500"> {comment.createdAt}</span>
                                                        </div>
                                                        {
                                                            comment.userId == userId
                                                            &&
                                                            <button className="ml-2" onClick={() => handleDeleteComment(comment.id, comment.userId)}> <TrashSimple size={24} color={"#b91c1c"} /> </button>
                                                        }
                                                    </div>
                                                    <span>{comment.comment}</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                        <div className="flex justify-center mb-3">
                            {
                                slicedComments.length != 0 && haveMoreComment &&
                                <>
                                    <button onClick={() => setMaxComments(maxComments + 2)}><ArrowFatLinesDown size={26} color="#6d28d9"/></button>
                                </>
                            }
                        </div>
                    </>
                </div>
            </div>
        </div>
    )
}

export default Post;