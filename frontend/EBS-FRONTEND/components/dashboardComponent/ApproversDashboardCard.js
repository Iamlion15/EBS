const DashboardCard = ({color,message,icon,number}) => {
    return (
        <>
            <div className="col-6">
                <div className="card rounded-3 shadow-sm">
                    <div className="d-flex flex-row">
                    <div className={`card rounded-3 shadow ${color}`} style={{ height: "50px",marginRight:'20px',marginLeft:'5px', marginBottom:"40px" }}>
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                            <i className={`bi ${icon} mx-4`}></i>
                            </div>
                        </div>
                        <div className="d-flex flex-column mt-2">
                            <p className="font-monospace text-dark">{message}</p>
                            <p className="font-monospace d-flex justify-content-end mx-4"><strong><em>{number}</em></strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardCard;
