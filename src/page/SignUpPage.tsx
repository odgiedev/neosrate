import {useState} from "react";
import {Axios} from "../lib/axios.ts";
import Message from "../component/Message.tsx";
import {Link} from "react-router-dom";

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    function handleSignUp(event) {
        event.preventDefault();

        Axios.post("/user/create", {username, email, passwd: password, role: "USERR"})
            .then(() => {
                setSuccessMsg("Account created.");
            })
            .catch(err => setErrorMsg(err.response.data || "An error occurred."));
    }

    return (
        <div className="h-screen flex items-center justify-end">
            <div className="w-9/12 h-3/5 md:h-fit xl:w-3/4 mx-auto md:mr-24 xl:mr-5 flex border-4 border-green-700 rounded-lg bg-gradient-to-r from-violet-800 to-violet-950">
                <div className="hidden xl:inline w-full xl:w-3/5 py-10 pl-10">
                    <img src="https://neosrate.s3.sa-east-1.amazonaws.com/signup.png" alt="Sign Up" className="w-11/12" style={{transform: `scaleX(-1)`}}/>
                </div>
                <form onSubmit={handleSignUp} className="flex flex-col w-full xl:w-2/5 items-center border-l-4 border-green-700 justify-center text-2meruemxl md:text-lg text-black">
                    <Message successMsg={successMsg} setSuccessMsg={setSuccessMsg} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
                    <h1 className="text-4xl mt-10 font-bold text-slate-100">Sign up</h1>

                    <input type="text" placeholder="Username" className="my-2 xl:w-3/4 p-2 rounded"
                           onChange={(event) => setUsername(event.target.value)}
                    />

                    <input type="text" placeholder="Email" className="my-2 xl:w-3/4 p-2 rounded"
                           onChange={(event) => setEmail(event.target.value)}
                    />

                    <input type="password" placeholder="Password" className="my-2 xl:w-3/4 p-2 rounded"
                           onChange={(event) => setPassword(event.target.value)}
                    />

                    <Link to="/u/signin" className="text-slate-200 text-base">Already have an account?</Link>

                    <button className="bg-green-500 p-2 w-3/4 rounded mt-2" type="submit">Submit</button>

                    <span className="text-sm text-slate-400 mt-2 mb-10">We will never share your data.</span>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;