import {useState} from "react";
import {Axios} from "../lib/axios.ts";
import { jwtDecode } from "jwt-decode";

function SignInPage() {
    const [passwd, setPasswd] = useState("killua");
    const [email, setEmail] = useState("killua@killua.com");

    function handleSignIn(event) {
        event.preventDefault();

        Axios.post("/user/signin", {email, passwd})
            .then(data => {
                const token = data.data;

                const userData = token ? jwtDecode(token) : "";

                const userId = userData ? userData.userId : "";
                const username = userData ? userData.username : "";

                localStorage.setItem("authenticated", "true")
                localStorage.setItem("token", token)
                localStorage.setItem("userId", userId)
                localStorage.setItem("username", username)
            })
            .catch(err => console.log(err.response.data));
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-11/12 flex bg-violet-500 border-4 border-green-500 rounded-lg">
                <div className="w-3/5 py-10 pl-10">
                    <img src="/gonkillua.png" alt="bg" className="w-11/12" style={{transform: `scaleX(-1)`}}/>
                </div>
                <form onSubmit={handleSignIn} className="flex flex-col w-2/5 items-center border-l-4 border-green-500 justify-center text-lg text-black">
                    <h1 className="text-4xl mt-10 font-bold text-slate-100">Sign in</h1>

                    <input type="text" placeholder="Email" className="my-2 w-3/4 p-2 rounded"
                           onChange={(event) => setEmail(event.target.value)}
                    />

                    <input type="password" placeholder="Password" className="my-2 w-3/4 p-2 rounded"
                           onChange={(event) => setPasswd(event.target.value)}
                    />

                    <button className="bg-green-500 p-2 w-3/4 rounded mt-2 mb-10" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignInPage;