import { useEffect } from "react";
import { formatDateHTMLDATE } from "@/helpers/htmlFormDates";

const RenewContractDates = ({ contractData,newContract,setNewContract }) => {
    useEffect(()=>{
        setNewContract({...newContract,id:contractData._id})
    },[contractData])
    return (
        <>
            <div className="mt-3 mx-1">
                <div className="mt-2 mx-2">
                    <p>Renew <span className="text-primary">{contractData.firstname} {contractData.lastname}</span>'s contract</p>
                </div>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>new start date</td>
                            <td>
                                <input type="date"
                                    className="form-control"
                                    value={newContract.startDate}
                                    min={formatDateHTMLDATE(contractData.contract.endDate)}
                                    onChange={(e) => setNewContract({ ...newContract,startDate:e.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>new end date</td>
                            <td>
                                <input type="date"
                                    className="form-control"
                                    value={newContract.endDate}
                                    min={newContract.startDate}
                                    onChange={(e) => setNewContract({ ...newContract, endDate:e.target.value })}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default RenewContractDates;