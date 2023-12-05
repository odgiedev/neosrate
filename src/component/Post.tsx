function Post(post) {
    return (
        <div className="border rounded bg-slate-600 my-6 p-2 w-10/12 text-lg">
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
    )
}

export default Post;