import Router from "next/router"

const Logout=()=>{
    localStorage.removeItem("token");
    Router.push("/")
}

export default Logout