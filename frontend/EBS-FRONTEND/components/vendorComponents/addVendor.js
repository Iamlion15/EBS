import { useState } from "react";

const AddVendor = ({ nextStep,data,setData }) => {
   
    const [showAlert, setShowAlert] = useState(false);
    const handleNext = () => {
        if (data.firstname.trim() === "" && data.lastname.trim() === "" && data.email.trim() === "") {
            setShowAlert(true)
        }
        else {
            setShowAlert(false)
            nextStep()
        }
    }

    return (
        <>
            <form className="mt-5" style={{ marginTop: "20px" }}>
                {showAlert && (<div className="alert alert-danger alert-dismissible m-0 p-0">
                    <p className="m-2">Please fill in data</p>
                </div>)}
                <div className="row m-3">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="itemName">FIRST NAME</label>
                            <input
                                type="text"
                                className="form-control my-3"
                                id="itemName"
                                placeholder="Vendor's first name"
                                value={data.firstname}
                                required
                                onChange={(e) => setData({ ...data, firstname: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="itemName">LAST NAME</label>
                            <input
                                type="text"
                                className="form-control my-3"
                                id="itemName"
                                placeholder="Vendor's last name"
                                value={data.lastname}
                                required
                                onChange={(e) => setData({ ...data, lastname: e.target.value })}
                            />
                        </div>
                        <div className="col-6 mb-3">
                        <button
                                className='btn btn-outline-primary btn-sm mx-2'
                                onClick={handleNext}
                            >
                                <span className='mx-2'>NEXT</span>
                            </button>
                            </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">EMAIL</label>
                            <input
                                type="email"
                                className="form-control my-3"
                                id="email"
                                placeholder="vendor's email"
                                value={data.email}
                                required
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="phone">PHONE NUMBER</label>
                                <input
                                    type="phone"
                                    className="form-control my-3"
                                    id="phone"
                                    placeholder="vendor's phone"
                                    value={data.phone}
                                    required
                                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                                />
                            </div>
                            </div>
                            <></>
                        </div>
                    </div>
            </form>
        </>
    )
}



export default AddVendor    