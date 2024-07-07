import {Ghost} from "phosphor-react";

function NothingYet({msg}) {
    return (
        <div className="flex flex-col items-center mt-12 text-red-500 font-bold text-xl">
            <Ghost size={42} />
            <span>{msg ? msg : "Nothing yet."}</span>
        </div>
    )
}

export default NothingYet;