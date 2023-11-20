import CommunityCreateModal from "../component/CommunityCreateModal.tsx";

function DashboardPage() {
    return (
        <>
            <CommunityCreateModal />

            <div className="flex flex-col items-center w-1/2 min-h-screen mx-auto bg-slate-700">
                <img className="my-4 w-72 rounded-full" src="https://i.pinimg.com/474x/d5/07/32/d507327e88e76a275c0843281da4f1ac.jpg" />
                <span className="my-4">USERNAME</span>
                <p className="w-3/5 my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nibh nisl, pulvinar sit amet luctus quis, tempor id nunc. Suspendisse lobortis lobortis leo, ac varius ipsum tempor eget. In volutpat ac eros vel fringilla. Ut blandit, nisl in sodales vulputate, orci est pellentesque eros, non luctus quam mi non odio. Nam et augue non ex pulvinar varius in vel metus..</p>

                <select className="my-3 p-1 bg-slate-400 rounded">
                    <option value="option1">Programming</option>
                    <option value="option2">Food</option>
                    <option value="option3">Anime</option>
                </select>

                <div key={"post.id"} className="border rounded bg-slate-600 my-6 p-2 w-10/12 text-lg">
                    <span className="text-sm">c/programming - Posted by u/{"post.username"} - 12/11/23 18:42:18</span> <br />
                    <span className="font-bold">{"post.title"}</span>
                    <p className="">{"post.text"}</p>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;