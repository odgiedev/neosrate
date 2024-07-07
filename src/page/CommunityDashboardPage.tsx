import {useEffect, useState} from "react";
import {Axios} from "../lib/axios.ts";
import CommunityBanner from "../component/CommunityBanner.tsx";
import {Gear} from "phosphor-react";
import Message from "../component/Message.tsx";

function CommunityDashboardPage() {
    const [communityOwner, setCommunityOwner] = useState([])
    const [communityData, setCommunityData] = useState([])
    const [isEditing, setIsEditing] = useState(false)

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    function fnIsEditing() {
        setIsEditing(!isEditing)
    }

    const username = localStorage.getItem("username");

    useEffect(() => {
        Axios.get(`/community/get/owner/${username}`)
            .then(data => {
                setCommunityOwner(data.data.reverse())
            })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }, []);

    function handleEditCommunity(communityName: string) {
        Axios.get(`/community/get/community/${communityName}`, {
            "headers": {"Authorization": localStorage.getItem("token")}
        })
            .then(data => {
                setCommunityData(data.data)
                setIsEditing(true);
            })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }



    return (
        <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950">
            <h1 className="font-bold text-3xl flex items-center justify-center text-center mb-8 w-9/12 md:w-full"> <Gear size={24} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">COMMUNITY DASHBOARD</span> </h1>
            <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

            {
                !isEditing
                    ?
                        communityOwner.length > 0
                        ?
                        <div className={"text-center h-fit overflow-y-scroll mb-14"}>
                            {communityOwner.map(community => {
                                return (
                                    <div key={community.id}>
                                        <button className="text-2xl font-bold hover:text-white"
                                                onClick={() => handleEditCommunity(community.name)}>{community.name}</button>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <a href="/u/dashboard" className={"text-center border p-2 text-xl rounded-lg bg-black hover:bg-slate-900"}>
                            Create community
                        </a>
                    :
                    <>
                        <CommunityBanner fnIsEditing={fnIsEditing} community={communityData} />
                    </>
            }
        </div>
    )
}

export default CommunityDashboardPage;