function Post(post) {
    return (
        <div className="border rounded bg-slate-600 my-6 p-2 w-10/12 text-lg">
            <span className="text-sm">c/programming - Posted by u/{post.username} - 12/11/23 18:42:18</span> <br />
            <span className="font-bold">{post.title}</span>
            <p className="">{post.text}</p>
        </div>
    )
}

export default Post;