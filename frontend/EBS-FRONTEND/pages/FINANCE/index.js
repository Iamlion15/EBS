import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "@/components/sideNav/sidebar"
import HeaderComponent from "../../components/Header/Header"
import MyRequests from "./myRequests";
import Feedback from "./feedBacks";
import Logout from "@/helpers/logout";
import Dashboard from "./dashboard";
import { useRouter } from 'next/router';
import FinanceReviewedRequestsInfo from "./ReviewedRequestsInfo";
import FinanceStatusModal from "@/components/Modals/financeSuccessStatusModal";
import FailureModal from "@/components/Modals/financeFailureStatusModal";

const Index = () => {
    const [page, setPage] = useState("Dashboard")
    const [msg,setMsg]=useState('')
    const router = useRouter();
    const [statusModal, setStatusModal] = useState(false);
    const [failureStatusModal, setFailureStatusModal] = useState(false);
    const toggleStatusModal = () => {
        setStatusModal(!statusModal)
    }
    const toggleFailureStatusModal = () => {
        setFailureStatusModal(!failureStatusModal)
    }
    useEffect(() => {
        console.log(page);
    }, [page])
    useEffect(() => {
        const { status } = router.query;
        if (status === 'success') {
            toggleStatusModal()
            setMsg("successfully ")
            console.log('Success message!');
        }
        else {
            if (status === "failure") {
                toggleFailureStatusModal()
                console.log('failure message!');
            }
        }
    }, [router.query]);
    return (
        <>
            <div className="row">
                <Sidebar page={page} setPage={setPage} logout={Logout} />
                <div className="col-9">
                    <HeaderComponent page={page} logout={Logout} />
                    <div className="mt-4 p-4">
                        {page === "Dashboard" && (
                            <Dashboard />
                        )}
                        {page === 'Review Requests' && (
                            <MyRequests />
                        )}
                        {page === 'Feedback' && (
                            <Feedback />
                        )}
                        {page === 'Past requests' && (
                            <FinanceReviewedRequestsInfo />
                        )}

                    </div>
                </div>
                <div>
                    {statusModal && <FinanceStatusModal toggleModal={toggleStatusModal} modalIsOpen={statusModal} />}
                    {failureStatusModal && <FailureModal toggleModal={toggleFailureStatusModal} modalIsOpen={failureStatusModal} />}
                </div>
            </div>

        </>
    )
}


export default Index