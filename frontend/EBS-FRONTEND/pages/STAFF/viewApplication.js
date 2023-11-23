import { useEffect, useState } from "react";
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import Router from "next/router";
import Link from "next/link";

const ViewApplication = ({ document, setViewApp }) => {
    useEffect(() => {
        console.log(document)
    })
    return (
        <>
            <div className="m-3">
                {/* approvals */}
                <div className="card rounded-2 shadow-sm">
                    <div className="d-flex align-items-center mt-5 mb-5">
                        <div className="d-flex flex-row">
                            <i class="bi bi-hourglass-split mx-2"></i>
                            <p className="text-primary"><strong>submitted</strong></p>
                        </div>
                        <hr className="flex-grow-1 mx-3 " />
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <i class="bi bi-gear-fill mx-2"></i>
                                    <p className="text-warning"><strong>RAB Approval</strong></p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    {document.RAB_Approval.approved ? <p className="text-success"><strong>Approved</strong></p> : <p className="text-danger"><strong>Pending</strong></p>}

                                </div>
                            </div>
                        </div>
                        <hr className="flex-grow-1 mx-3" />
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <i class="bi bi-gear-fill mx-2"></i>
                                    <p className="text-info"><strong>RSB Approval</strong></p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    {document.RSB_Approval.approved ? <p className="text-success"><strong>Approved</strong></p> : <p className="text-danger"><strong>Pending</strong></p>}
                                </div>
                            </div>
                        </div>
                        <hr className="flex-grow-1 mx-3" />
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <p className="text-primary mx-2"><strong>RICA Approval</strong></p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    {document.RICA_Approval.approved ? <p className="text-success"><strong>Approved</strong></p> : <p className="text-danger"><strong>Pending</strong></p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* content */}
                <div className="card rounded-2 shadow-sm mt-5">
                    <div className="row">
                        <div className="col-6">
                            <div className="m-2">
                                <div className="d-flex flex-row justify-content-center">
                                    <i class="bi bi-file-earmark-arrow-down-fill mx-2"></i>
                                    <p><strong>Company Information</strong></p>
                                </div>
                                <hr className="m-0" />
                                <div>
                                    <div className="d-flex flex-row">
                                        <i class="bi bi-info-circle mx-2"></i>
                                        <p className="lead text-sm-start"><small>Below is the company information</small></p>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-primary mb-0"><strong>Names</strong></p>
                                            <p className="fw-bold mb-0">{document.document.companyName}</p>
                                            <p className="text-primary mb-0"><strong>Phone No.</strong></p>
                                            <p className="fw-bold">{document.document.phone}</p>
                                        </div>
                                        <div className="col">
                                            <p className="text-primary mb-0"><strong>Email</strong></p>
                                            <p className="fw-bold">{document.document.email}</p>
                                            <p className="text-primary mb-0"><strong>Products type</strong></p>
                                            <p className="fw-bold">{document.document.psamples}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="m-2">
                                <div className="d-flex flex-row justify-content-center">
                                    <i class="bi bi-app-indicator mx-2"></i>
                                    <p><strong>Product Information</strong></p>
                                </div>
                                <hr className="m-0" />
                                <div>
                                    <div className="d-flex flex-row">
                                        <i class="bi bi-info-circle mx-2"></i>
                                        <p className="lead text-sm-start"><small>Below is the product details</small></p>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-dark mb-0"><strong>Upload time</strong></p>
                                            <p className="fw-light">{formatDateToCustomFormat(document.document.createdAt)}</p>
                                        </div>
                                        <div className="col">
                                            <p className="text-dark mb-0"><strong>Supporting documents</strong></p>
                                            <div className="d-flex flex-row">
                                                <i class="bi bi-filetype-pdf mx-3"></i>
                                                <Link href="">
                                                    <a onClick={() => { Router.push(`/Producer/view/${document._id}`) }}>
                                                        <p className="text-secondary" style={{ textDecoration: 'underline' }}><strong>View File</strong></p>
                                                    </a>
                                                </Link>
                                            </div>
                                            <p className="text-dark mb-0"><strong>Products type</strong></p>
                                            <p className="fw-light">{document.document.psamples}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" d-flex justify-content-center">
                            <button className="btn btn-warning m-3" onClick={() => { setViewApp(false) }} style={{ width: "80%" }}>Go back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewApplication;
