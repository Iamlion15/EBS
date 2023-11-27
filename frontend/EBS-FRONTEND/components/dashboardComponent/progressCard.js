const DashboardCard = ({ color, message, icon, bgcolor,elevate }) => {
    return (
        <>
            <div className="col-3 m-3 mx-3">
                <div className={`card ${elevate} rounded-3`} style={{ backgroundColor: bgcolor, borderColor: bgcolor }}>
                    <div className="d-flex flex-row">
                        <div className="card rounded-3 shadow mt-2" style={{ height: "50px", marginRight: '20px', marginLeft: '5px', marginBottom: "40px",backgroundColor:color }}>
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                                <i className={`bi ${icon} mx-4`}></i>
                            </div>
                        </div>
                        <div className="d-flex flex-column mt-2">
                            <p className="font-monospace text-dark mt-1">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardCard;
