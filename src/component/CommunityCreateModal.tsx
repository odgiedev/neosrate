import {useState} from "react";
import {Axios} from "../lib/axios.ts";

function CommunityCreateModal() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [creator, setCreator] = useState("admin");

    function handleCreateCommunity(event) {
        event.preventDefault();

        Axios.post("/community/create", {name, description, creator})
            .then(data => console.log(data))
            .catch(err => console.log(err.response.data))
    }

    return (
        <>
            <form onSubmit={handleCreateCommunity} className="h-screen flex flex-col w-1/3 h-screen mx-auto items-center justify-center">
                <h1>Create community</h1>
                <input type="text" placeholder="Name*" className="my-2 w-3/4 p-2 rounded text-black"
                       onChange={(event) => setName(event.target.value)}
                />

                <textarea placeholder="Description" className="resize-none my-2 h-1/4 w-3/4 p-2 rounded text-black" autoComplete="off"
                    onChange={event => setDescription(event.target.value)}
                />

                <button className="rounded bg-green-500 p-2" type="submit">Create community</button>
            </form>
        </>
    )
}

export default CommunityCreateModal;