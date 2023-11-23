import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import axios from "axios";


const ViewPDF = ({ router }) => {
    const [fileData, setFileData] = useState(null)
    useEffect(async () => {
        const id = router.query.pdfid;
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/document/get/${id}`, config)
            const blob = new Blob([response.data], { type: 'application/pdf' }); // Adjust 'application/pdf' to the appropriate content type
            // Create a URL for the Blob
            const fileURL = URL.createObjectURL(blob);
            setFileData(fileURL)
        } catch (error) {
            console.log(error)
        }
    }, [router])
    return (
        <>
            <div>
                {fileData ? (
                    <iframe title="File Viewer" src={fileData} width="100%" height="600"></iframe>
                ) : (
                    <p>Loading file...</p>
                )}
            </div>

        </>
    )
}

export default withRouter(ViewPDF);