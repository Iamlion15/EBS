



const PaymentMethod = ({nextStep,prevStep,handleSaveVendor}) => {
    const saveVendor=()=>{

    }
    return (
        <>
            <div className="d-flex justify-content-center align-content-center" style={{ }}>
                <div className=" card shadow d-flex flex-column m-5">
                    <div className="form-group m-5">
                        <label htmlFor="itemType" className="mb-2">PAYMENT METHOD</label>
                        <select className="form-select" >
                            <option value="MTN">MOMO</option>
                        </select>
                    </div>
                    <div className="m-5">
                    <button
                        className='btn btn-primary btn-sm mx-2'
                        onClick={handleSaveVendor}
                    >
                        <span className='mx-2'>SAVE VENDOR INFORMATION</span>
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default PaymentMethod