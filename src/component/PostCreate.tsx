function PostCreate(props) {
    return (
        <form onSubmit={props.handleCreatePost} className="flex flex-col items-center w-11/12 text-black mt-6">
            <h1 className="text-2xl text-slate-100">Create a post</h1>
            <span className="text-xl text-slate-100">At c/{props.community}</span>
            <input type="text" placeholder="Title" className="rounded p-2 my-2 w-2/3"
                   onChange={(event) => props.setTitle(event.target.value)}
            />
            <input type="text" placeholder="Text (optional)" className="rounded p-2 my-2 w-2/3"
                   onChange={(event) => props.setText(event.target.value)}
            />
            {/*<input type="file" />*/}
            <button className="bg-green-500 rounded py-2 my-2 w-1/2 text-slate-100">Post</button>
        </form>
    )
}

export default PostCreate;