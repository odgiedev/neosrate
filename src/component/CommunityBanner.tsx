import {useState} from "react";
import {Axios} from "../lib/axios.ts";
import {ArrowUDownLeft, Warning} from "phosphor-react";
import Message from "./Message.tsx";

function CommunityBanner({community, fnIsEditing}) {
    const userId = localStorage.getItem("userId");

    const [communityName, setCommunityName] = useState(community.name);
    const [communityDescription, setCommunityDescription] = useState(community.description);

    const [deleteCommunity, setDeleteCommunity] = useState(false);

    const [pfpName, setPfpName] = useState(community.communityPic ? community.communityPic :"default.png");

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    function handleSetCommunityPic(pfp) {
        const formData = new FormData();
        formData.append('file', pfp[0]);

        const config = {
            headers: {
                'Authorization': localStorage.getItem("token"),
            },
        };

        Axios.post(`/community/update/communitypic/${communityName}/${userId}`, formData, config)
            .then(data => setSuccessMsg(data.data))
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    function handleUpdateCommunity() {
        Axios.post(`/community/update/${userId}`, {communityId: community.id, description: communityDescription}, {
            "headers": {"Authorization": localStorage.getItem("token")}
        })
            .then(data => setSuccessMsg(data.data))
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    function handleDeleteCommunity() {
        Axios.delete(`/community/delete/${communityName}/${userId}`, {
            "headers": {"Authorization": localStorage.getItem("token")}
        })
            .then(() => window.location.reload())
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    return (
        <>
            {
                community
                &&
                <div className="flex flex-col items-center">
                    <button className={"flex items-center mb-2"} onClick={() => fnIsEditing()}><ArrowUDownLeft size={32} className={"mr-2"} /> Back</button>

                    <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

                    <div className="relative w-60 h-60 overflow-hidden rounded-full border-2 border-violet-800">
                        <img className="absolute inset-0 h-full w-full object-cover" src={`https://neosrate.s3.sa-east-1.amazonaws.com/community${communityName}`} alt="Community Pic"/>
                        <input className="absolute inset-0 w-full h-full cursor-pointer opacity-0" type="file" onChange={e => handleSetCommunityPic(e.target.files)}/>
                    </div>

                    <span className="font-bold mt-3">Community: </span>
                    <input className="bg-slate-900 p-1 rounded" type="text" value={communityName} disabled/>

                    <span className="font-bold mt-3">Description: </span>
                    <textarea className="bg-slate-900 rounded p-2 w-80" value={communityDescription} onChange={event => {
                        setCommunityDescription(event.target.value)
                    }}></textarea>

                    <span className="font-bold mt-3">Created at:</span>
                    <span>{community.createdAt}</span>

                    <span className="font-bold mt-3">Owner:</span>
                    <a href={`/user/${community.creator}`}>{community.creator}</a>

                    <button onClick={handleUpdateCommunity} className="bg-amber-600 rounded p-2 font-bold my-2">Save</button>

                    <button onClick={() => setDeleteCommunity(old => !old)} className="bg-red-500 rounded p-2 font-bold mt-6 mb-14">Delete</button>

                    {
                        deleteCommunity
                        &&
                        <div className={"w-10/12 md:w-full mb-10 flex flex-col justify-center items-center text-center"}>
                            <div className={"px-3 py-6 rounded-lg bg-red-400 mb-3 font-bold text-center flex flex-col justify-center items-center"}>
                                <span className={"mb-2"}><Warning size={32} /></span>
                                <p>Community will be deleted forever without being able to recover again.</p>
                                <p>Including posts, comments and anything else related to it.</p>
                                <br />
                                <p>Delete?</p>
                            </div>

                            <div>
                                <button onClick={handleDeleteCommunity} className="bg-red-500 rounded p-3 font-bold mr-2">YES</button>
                                <button onClick={() => setDeleteCommunity(false)} className="bg-green-500 rounded p-3 font-bold">NO</button>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default CommunityBanner;