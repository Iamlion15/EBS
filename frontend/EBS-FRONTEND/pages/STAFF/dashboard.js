import { useState, useEffect } from "react";
import DashboardCard from "@/components/dashboardComponent/ItemDashboard";
import axios from "axios";


const Dashboard = () => {
    const [data, setData] = useState({
        pending: "",
        canceled: "",
        underReview: "",
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
            const response = await axios.get("http://localhost:4000/api/item/statistics", config);
            console.log(response.data);
            setData({
                pending: response.data.pending,
                approved: response.data.approved,
                underReview: response.data.underReview,
                canceled: response.data.canceled
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            <div className="row mt-5 mb-2">
                <DashboardCard color="#ff1900" message="Canceled request(s)" icon="bi-journal-check" number={data.canceled} className="mt-2" bgcolor="#fde9ea"/>
                <DashboardCard color="#4c97ff" message="Pending request(s)" icon="bi-stopwatch" number={data.pending } className="mt-2" bgcolor="#edecff"/>
                </div>
            <div className="row mt-5">
                <DashboardCard color="bg-primary" message="Under-review request(s)" icon="bi-binoculars-fill" number={data.underReview } />
                <DashboardCard color="bg-success" message="Approved request(s)" icon="bi-file-earmark-check-fill" number={data.approved } className="mt-2" bgcolor="#c7f9cc"/>
            </div>
        </>
    )
}



export default Dashboard;