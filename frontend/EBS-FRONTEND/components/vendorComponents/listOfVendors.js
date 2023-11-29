import { useState } from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import ListOfVendorItems from './listOfVendorItems';


const ListOfVendors = ({ vendors,toggleView }) => {
    const [showVendorItems,setShowVendorItems]=useState(true)
    const [vendorId,setVendorId]=useState("")


    const showVendorItemsView=(id)=>{
        setShowVendorItems(false)
        setVendorId(id)
    }

    const ToggleActivateVendorItems=()=>{
        console.log("clicked");
        setShowVendorItems(!showVendorItems)
    }
    return (
        <>
        {showVendorItems ?(
            <>
            <div className='d-flex justify-content-start'>
            <button className='btn btn-primary m-2' onClick={toggleView}>Go back</button>
        </div>
            <table className="table table-borderless table-responsive table-hover">
                <thead>
                    <tr className='table-primary'>
                        <td>FIRST NAME</td>
                        <td>LAST NAME</td>
                        <td>EMAIL</td>
                        <td>PHONE</td>
                        <td className="text-primary">More Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((vendor) => {
                        return (
                            <>
                                <tr key={vendor._id} style={{ cursor: 'pointer' }} onClick={()=>showVendorItemsView(vendor._id)}>
                                    <td>{vendor.firstname}</td>
                                    <td>{vendor.lastname}</td>
                                    <td>{vendor.email}</td>
                                    <td>{vendor.phone}</td>
                                    <td>
                                        <div className='d-flex justify-content-center'>
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                role="button"
                                                size="sm"
                                                color=""
                                                onClick={(e) => {e.preventDefault()
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <i class="bi bi-three-dots-vertical"></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    onClick={() => showApproveItem(items)}
                                                >
                                                    <div className='d-flex flex-row'>
                                                        <i class="bi bi-pencil-square"></i>
                                                        <p className='mx-3 my-0 py-0'>Vendor Items</p>
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={() => showMessageModal(items)}
                                                >
                                                    <div className='d-flex flex-row'>
                                                        <i class="bi bi-chat-left-dots-fill"></i>
                                                        <p className='mx-3 my-0 py-0 text-muted'>Update</p>
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={() => showMessageModal(items)}
                                                >
                                                    <div className='d-flex flex-row'>
                                                        <i class="bi bi-chat-left-dots-fill"></i>
                                                        <p className='mx-3 my-0 py-0 text-muted'>Delete</p>
                                                    </div>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            </>
            ):(
                <ListOfVendorItems vendorId={vendorId} ToggleActivateVendorItems={ToggleActivateVendorItems}/>
            )}
        </>
    )
}


export default ListOfVendors;