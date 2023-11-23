import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "@/components/sideNav/sidebar"
import HeaderComponent from "../../components/Header/Header"
import RequestItem from "./requestItem"
import MyRequests from "./myRequests";
import Dashboard from "./dashboard";
import Logout from "@/helpers/logout";
import Feedback from "./feedBacks";

const Index = () => {
    const [page, setPage] = useState("Dashboard")

    useEffect(() => {
        console.log(page);
    }, [page])
    return (
        <>
            <div className="row" style={{ backgroundColor: "#f5f5f5", height: "100vh" }}>
                <Sidebar page={page} setPage={setPage} logout={Logout} />
                <div className="col-9">
                    <HeaderComponent page={page} logout={Logout} />
                    <div className="mt-4 p-4">
                        {page === "Dashboard" && (
                            <Dashboard />
                        )}
                        {page === "Request Item" && (
                            <RequestItem />
                        )}
                        {page === 'My Requests' && (
                            <MyRequests />
                        )}
                        {page === 'Feedback' && (
                            <Feedback />
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}


export default Index