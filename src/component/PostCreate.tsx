function PostCreate(props) {
    return (
        <form onSubmit={props.handleCreatePost} className="border-2 border-green-900 px-2 py-6 rounded-lg text-violet-200 flex flex-col items-center justify-center w-11/12 mt-6  bg-gradient-to-r from-violet-950 via-slate-950 to-violet-950">
            <h1 className="text-2xl text-slate-100">Create a post</h1>
            <span className="text-xl text-slate-100">At c/{props.community}</span>
            <input maxLength={22} type="text" value={props.title} placeholder="Title" className="rounded p-2 my-2 w-2/3 bg-slate-900"
                   onChange={(event) => props.setTitle(event.target.value)}
            />
            {
                props.file.length == 0
                &&
                <input maxLength={255} type="text" value={props.text} placeholder="Text (optional)" className="rounded p-2 my-2 w-2/3 bg-slate-900"
                       onChange={(event) => props.setText(event.target.value)}
                />
            }

            <input ref={props.fileInputRef} className="w-2/3 rounded-full text-center bg-slate-900" type="file" onChange={e => props.setFile(e.target.files)}/>
            <button className="bg-green-600 rounded py-2 my-2 w-2/3 text-slate-100">Post</button>
        </form>
    )
}

export default PostCreate;