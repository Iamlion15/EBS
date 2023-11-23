import { useState, useEffect } from "react";
import DashboardCard from "@/components/dashboardComponent/ApproversDashboardCard";
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
            const response = await axios.get("http://localhost:5000/api/document/rsbstatistics", config);
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
            <div className="row mt-5">
                <DashboardCard color="bg-warning" message="pending application(s)" icon="bi-stopwatch" number={data.pending} />
                <DashboardCard color="bg-success" message="approved application(s)" icon="bi-file-earmark-check-fill" number={data.approved} />
            </div>
        </>
    )
}



export default Dashboard;