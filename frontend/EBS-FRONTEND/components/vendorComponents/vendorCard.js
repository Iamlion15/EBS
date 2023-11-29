const VendorCard = ({ handleListOfVendors }) => {
    return (
        <>
            <div className="col-1 m-3 mx-3">
                <div >
                    <div className="d-flex flex-column">
                        <button className="btn btn-outline-primary" onClick={handleListOfVendors}>List of vendors</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VendorCard;
