function CommunityCard({community}) {
    const s3Url = "https://neosrate.s3.sa-east-1.amazonaws.com"

    return (
        <div className="rounded bg-gradient-to-b from-slate-800 to-black border-4 border-green-800 my-6 w-10/12">
            <div className="flex flex-col items-center justify-between">
                <div className="h-fit w-full">
                    <div className="flex flex-col justify-center px-6 pt-4 mb-2 text-violet-600">
                        <div className="flex text-center justify-around items-center text-xl">
                            <img className="h-24 w-24 object-cover rounded-full mr-2"
                                 src={`${s3Url}/community${community.name}`}  alt="Community pic"/>

                            <a href={`/user/${community.creator}`} className="hidden font-bold lg:inline">&nbsp;u/{community.creator}</a>
                            <span>&nbsp;{community.createdAt}</span>
                        </div>
                        <div className="text-violet-200 my-4 text-center">
                            <a href={`/c/${community.name}`} className="font-bold text-xl md:text-2xl">c/{community.name}</a>
                        </div>

                        {
                            community.description
                            &&
                            <pre className="whitespace-pre-wrap break-words ml-6 mb-4 text-violet-200">{community.description.slice(0,40)+"[...]"}</pre>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityCard;