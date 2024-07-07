import {useState} from "react";
import {Axios} from "../lib/axios.ts";
import Message from "./Message.tsx";

function CommunityCreateModal() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const userId = localStorage.getItem("userId");
    const creator = localStorage.getItem("username");

    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    function handleCreateCommunity(event) {
        event.preventDefault();

        Axios.post(`/community/create/${userId}`, {name, description, creator}, {
            "headers": {
                "Authorization" : localStorage.getItem("token")
            }
        })
            .then(data => setSuccessMsg(data.data || "COMMUNITY CREATED."))
            .catch(err => setErrorMsg(err.response.data || "An error occurred."))
    }

    return (
        <>
            <form onSubmit={handleCreateCommunity} className="border-2 border-green-900 px-2 py-6 w-2/3 rounded-lg text-violet-200 flex flex-col items-center justify-center my-6 bg-gradient-to-r from-violet-950 via-slate-950 to-violet-950">
                <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
                <h1 className="text-2xl font-bold">Create a community</h1>
                <input maxLength={22} type="text" placeholder="Name*" className="my-2 w-3/4 p-2 rounded bg-slate-800"
                       onChange={(event) => setName(event.target.value)}
                />
                <small className={"mb-3 font-bold text-slate-400"}>Can't change later.</small>

                <textarea maxLength={255} placeholder="Description" className="my-2 h-1/4 w-3/4 p-2 rounded bg-slate-800" autoComplete="off"
                    onChange={event => setDescription(event.target.value)}
                />

                <button className="bg-green-500 hover:bg-green-600 rounded py-2 my-2 w-2/3 text-slate-100 font-bold" type="submit">Create community</button>
            </form>
        </>
    )
}

export default CommunityCreateModal;