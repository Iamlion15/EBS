import { useState } from "react";

const AddProduct = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        documents: "",
        totalSamples: "",
        totalWeight: "",
    });
    const linearGradientBackground={
        background:'linear-gradient(195deg, #49a3f1, #0057A3)',
        borderColor:'linear-gradient(195deg, #49a3f1, #0057A3)',
        width:"100%"
    }

    return (
        <>
            <div className="row">
                <div className="col-5 mx-3">
                    {/* Producer Details */}
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center">
                            <h3 className="lead">Producer details</h3>
                        </div>
                        <hr />
                        <form className="mt-3">
                            <div className="form-group">
                                <label htmlFor="company">NAME OF THE COMPANY</label>
                                <input
                                    type="text"
                                    className="form-control my-3"
                                    id="company"
                                    placeholder="Enter company name"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">EMAIL OF THE COMPANY</label>
                                <input
                                    type="email"
                                    className="form-control my-3"
                                    id="email"
                                    placeholder="Email address"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="phone">PHONE NUMBER</label>
                                <input
                                    type="text"
                                    className="form-control my-3"
                                    id="phone"
                                    placeholder="Phone number"
                                    value={data.phone}
                                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                                />
                            </div>
                            <div className='mt-auto mb-3'>
                                <button className='btn text-white' style={linearGradientBackground}>
                                    <strong className="mx-2">ADD DOCUMENT</strong>
                                    <i className="bi bi-cloud-plus"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-5">
                    {/* Sample Information */}
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center">
                            <h3 className="lead">Sample information</h3>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6 mt-3">
                                <div className="form-group">
                                    <label htmlFor="nsample">Total Number of samples</label>
                                    <input
                                        type="number"
                                        className="form-control my-3"
                                        id="nsample"
                                        placeholder="Number of samples"
                                        value={data.totalSamples}
                                        onChange={(e) => setData({ ...data, totalSamples: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                {/* Additional content for the other col-6 */}
                                {/* You can add more input fields or content here */}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="wsample">Total weight of samples</label>
                            <input
                                type="number"
                                className="form-control my-3"
                                id="wsample"
                                placeholder="Weight of samples"
                                value={data.totalWeight}
                                onChange={(e) => setData({ ...data, totalWeight: e.target.value })}
                            />
                        </div>
                        <div className="input-group mb-3 my-3">
                            <input type="file" className="form-control" id="upload" />
                            <label className="input-group-text" for="upload">Upload</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
