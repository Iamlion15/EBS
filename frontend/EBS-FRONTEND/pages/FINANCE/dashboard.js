import { useState, useEffect } from "react";
import DashboardCard from "@/components/dashboardComponent/ItemDashboard";
import axios from "axios";

const Dashboard = () => {
    const [data, setData] = useState({
        pending: "",
        approved: ""
    })
    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:4000/api/item/financestatistics", config);
            console.log(response.data);
            setData({
                pending: response.data.pending,
                approved: response.data.approved,
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
             <div className="row mt-5 mb-2">
                <div className="d-flex justify-content-around">
                    <DashboardCard color="#ff1900" message="approved request(s)" icon="bi-journal-check" number={data.approved} className="mt-2" bgcolor="#fde9ea" />
                    <DashboardCard color="#4c97ff" message="pending request(s)" icon="bi-stopwatch" number={data.pending} className="mt-2" bgcolor="#edecff" />
                </div>
            </div>
        </>
    )
}



export default Dashboard;