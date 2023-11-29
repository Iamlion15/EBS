import { useState,useEffect } from 'react';
import axios from 'axios';
import PropertiesView from '../Modals/vendorItemPropertiesView';


const ListOfVendorItems = ({ vendorId,ToggleActivateVendorItems }) => {
    const [vendorItems,setVendorItems]=useState([])
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [properties,setProperties]=useState([])
    const toggleModal=()=>{
        setModalIsOpen(!modalIsOpen)
    }
    const showProperties=(property)=>{
        setProperties(property)
       setModalIsOpen(true)
    }
    useEffect(async()=>{
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get(`http://localhost:4000/api/vendor/vendoritems/${vendorId}`,config)
            for(let i=0;i<response.data.length;i++)
            {
                console.log(response.data);
            }
            setVendorItems(response.data)
        } catch (error) {
            console.log(error);
        }
    },[])
    return (
        <>
        <div className='d-flex justify-content-end'>
            <button className='btn btn-primary m-3' onClick={ToggleActivateVendorItems}>Go back</button>
        </div>
            <table className="table table-borderless table-responsive table-hover">
                <thead>
                    <tr className='table-primary'>
                        <td>ITEM NAME</td>
                        <td>ITEM PRICE</td>
                    </tr>
                </thead>
                <tbody>
                    {vendorItems.map((vendorItem) => {
                        return (
                            <>
                                <tr key={vendorItem._id} style={{ cursor: 'pointer' }} onClick={()=>showProperties(vendorItem.properties)}>
                                    <td>{vendorItem.itemName}</td>
                                    <td>{vendorItem.itemPrice}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            <div>
                {modalIsOpen && <PropertiesView toggleModal={toggleModal} modalIsOpen={modalIsOpen} properties={properties}/>}
            </div>
        </>
    )
}


export default ListOfVendorItems;