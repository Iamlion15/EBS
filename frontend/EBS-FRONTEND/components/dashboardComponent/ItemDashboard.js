import formatDateToCustomFormat from "@/helpers/dateFormatter";
const DashboardCard = ({ color, message, icon, number, bgcolor }) => {
    return (
        <>
            <div className="col-4">
                <div className="card rounded-3" style={{ backgroundColor: bgcolor, borderColor: bgcolor }}>
                    <div className="d-flex flex-row mt-5 mx-3">
                        <div className="d-flex justify-content-left flex-column mx-4">
                            <p className="font-monospace text-dark" style={{ fontSize: '0.7em', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{message}</p>
                            <div className="mt-0">
                                <p className="font-monospace mx-1"><strong><em>{number} <span style={{ fontSize: '0.7em', fontWeight: 'bold', whiteSpace: 'nowrap' }}>item(s)</span></em></strong></p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-right align-items-center" style={{ height: "100%" }}>
                            <div  style={{ height: "70px", width: "70px", marginRight: '20px', marginLeft: '5px', marginBottom: "40px", borderRadius: "50%",backgroundColor:color }}>
                                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100%' }}>
                                    <i className={`bi ${icon}`} style={{ fontSize: '1.7em', fontWeight: 'bold' }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className=" mx-2 mb-0 d-flex row" style={{ fontSize: '0.7em', fontWeight: 'bold', whiteSpace: 'nowrap' }} >
                            <div className="col-6">
                                <p>© ebs-management</p>
                            </div>
                            <div className="col-6">
                                <div className="d-flex justify-content-end">
                                    {formatDateToCustomFormat(Date())}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardCard;
