function Footer() {
    return (
        <footer className={"flex bg-black py-6 w-full justify-center items-center font-bold tracking-widest"}>
            <span>{new Date().getFullYear()}</span>
            <span>&copy;&nbsp;</span>
            <span>by <a href={"https://github.com/odgiedev"}>ODGIEDEV.</a></span>
        </footer>
    )
}

export default Footer;