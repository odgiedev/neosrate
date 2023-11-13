import {useState} from "react";
import {Axios} from "../lib/axios.ts";

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignUp(event) {
        event.preventDefault();

        Axios.post("/user/create", {username, email, passwd: password})
            .then(data => console.log(data))
            .catch(err => console.log(err.response.data));
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-11/12 flex bg-violet-500 border-4 border-green-500 rounded-lg">
                <div className="w-3/5 py-10 pl-10">
                    <img src="gonkillua2.png" alt="bg" className="w-11/12"/>
                </div>
                <form onSubmit={handleSignUp} className="flex flex-col w-2/5 items-center border-l-4 border-green-500 justify-center text-lg ">
                    <h1 className="text-4xl mt-10 font-bold">Sign up</h1>

                    <input type="text" placeholder="Username" className="my-2 w-3/4 p-2 rounded"
                           onChange={(event) => setUsername(event.target.value)}
                    />

                    <input type="text" placeholder="Email" className="my-2 w-3/4 p-2 rounded"
                           onChange={(event) => setEmail(event.target.value)}
                    />

                    <input type="password" placeholder="Password" className="my-2 w-3/4 p-2 rounded"
                           onChange={(event) => setPassword(event.target.value)}
                    />

                    <button className="bg-green-400 p-2 w-3/4 rounded mt-2 mb-10" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;