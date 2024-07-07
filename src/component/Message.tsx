import {useEffect, useState} from "react";
import {Confetti, Warning} from "phosphor-react";

function Message({ successMsg, setSuccessMsg, errorMsg, setErrorMsg}) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (successMsg || errorMsg) {
            const timeoutId = setTimeout(() => {
                setSuccessMsg("");
                setErrorMsg("");
            }, 10000);

            return () => clearTimeout(timeoutId);
        }
    }, [successMsg, errorMsg]);

    return (
        <>
            {
                isVisible
                &&
                <>
                    {
                        successMsg
                        &&
                        <div className="w-full my-3 flex justify-center">
                            <span className="p-2 w-11/12 rounded bg-green-500 text-center font-bold text-slate-200 flex justify-center items-center"><Confetti size={28} className="mr-2" />{successMsg}</span>
                        </div>
                    }
                    {
                        errorMsg
                        &&
                        <div className="w-full my-3 flex justify-center">
                            <span className="p-2 w-11/12 rounded bg-red-500 text-center font-bold text-slate-200 flex justify-center items-center"><Warning size={28} className="mr-2" />{errorMsg}</span>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Message;