import {SmileySad} from "phosphor-react";

function NotFound() {
    return (
        <a href="/" className="h-screen flex flex-col text-2xl text-red-600 justify-center items-center bg-gradient-to-b from-slate-950 via-slate-800 to-slate-950">
            <SmileySad size={46} />
            <span>Page not found.</span>
        </a>
    )
}

export default NotFound;