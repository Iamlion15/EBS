import { Modal, ModalHeader } from "reactstrap";

const PropertiesView = ({ properties,modalIsOpen, toggleModal }) => {
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
            <div>
                <ModalHeader>
                    <div className="m-2">
                        <h4 className="text-primary">PROPERTIES</h4>
                    </div>
                </ModalHeader>
                <div>
                    <div className="m-3">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>Property name</th>
                                    <th>Property value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((property, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {property.title}
                                        </td>
                                        <td>
                                            {property.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};




export default PropertiesView