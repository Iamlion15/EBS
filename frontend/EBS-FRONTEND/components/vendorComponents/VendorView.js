import { useState, useEffect } from "react"
import ListOfVendors from "./listOfVendors"
import axios from "axios"

const VendorView = ({toggleView}) => {
    const [vendors, setVendors] = useState([])  
    useEffect(async() => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:4000/api/vendor/vendors",config)
            setVendors(response.data)
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <>
            <div className="font-monospace  rounded-3 border-4" style={{ backgroundColor: "#ffffff" }}>
                <div className="row m-3">
                    <div className="d-flex justify-content-center">
                        <p className="display-5 text-primary">List of vendors</p>
                    </div>
                </div>
            </div>
            <div className="font-monospace mt-5 card " style={{ backgroundColor: "#ffffff" }}>
                <ListOfVendors vendors={vendors} toggleView={toggleView}/>
            </div>
        </>
    )
}

export default VendorView