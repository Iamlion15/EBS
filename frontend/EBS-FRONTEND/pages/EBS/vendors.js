import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Vendors = () => {
    const [data, setData] = useState({
        ItemName: "",
        quantity: "",
        whenNeeded: "",
        itemType: "",
        purpose: "",
        file: ""
    });
    const toastId = useRef(null)
    const linearGradientBackground = {
        background: 'linear-gradient(195deg, #49a3f1, #0057A3)',
        borderColor: 'linear-gradient(195deg, #49a3f1, #0057A3)',
        width: "100%"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("Loading............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        const formdata = new FormData();
        formdata.append('ItemName', data.ItemName)
        formdata.append('whenNeeded', data.whenNeeded);
        formdata.append('quantity', data.quantity);
        formdata.append('itemType', data.itemType);
        formdata.append('purpose', data.purpose)
        formdata.append('file', data.file)
        const config = {
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:4000/api/item/save", formdata, config)
            toast.update(toastId.current, { render: "Successfully sent data", type: toast.TYPE.SUCCESS, autoClose: 2000 })

        } catch (error) {
            console.log(error)
            toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
        }
    }

    return (
        <>
            <div className="row font-monospace shadow-lg rounded-3 border-4" style={{backgroundColor:"#ffffff"}}>
                <div className="col-5 mx-3 mt-3"> 
                <div className="d-flex flex-row mx-2">
                    
                </div>
                <div className="card shadow m-2">

                </div>
                <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default Vendors;
