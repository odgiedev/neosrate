import Message from "../component/Message.tsx";
import {House, UsersThree} from "phosphor-react";
import {useEffect, useState} from "react";
import CommunityCard from "../component/CommunityCard.tsx";
import {Axios} from "../lib/axios.ts";

function CommunityListPage() {
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [community, setCommunity] = useState([]);

    useEffect(() => {
        Axios.get("/community/get/all/community")
            .then(data => setCommunity(data.data))
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }, []);

    return (
        <div className="flex flex-col w-full bg-gradient-to-r from-slate-950 via-violet-900 to-slate-950">
            <div className="flex flex-col pt-10 items-center sm:w-1/2 min-h-screen mx-auto">
                <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

                <h1 className="font-bold text-xl flex items-center justify-center"> <UsersThree size={20} className="mr-2 sm:mr-0 xl:mr-2"/> <span className="inline sm:hidden xl:inline">COMMUNITIES LIST</span> </h1>

                {
                    community.map(c => {
                        return (
                            <CommunityCard key={c.id} community={c} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CommunityListPage;