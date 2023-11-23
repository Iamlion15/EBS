


const Footer = () => {
    return (
        <>
            <div className="align-items-center">
                <div className="copyright text-center text-xl-left text-muted">
                    <div
                        className="font-weight-bold ml-1"
                    >
                       © EBS-MANAGEMENT {new Date().getFullYear()}{" "} - All rights reserved
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;