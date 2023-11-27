import { useState, useEffect } from "react";
import { Modal, ModalHeader } from "reactstrap";

const AddpropertiesModal = ({ modalIsOpen, toggleModal, data, setData, index,property,setProperty }) => {
    const [checkEmpty, setCheckEmpty] = useState(false)
    const [activateConfirm, setActivateConfirm] = useState(false);

    const handleAddPropertiesToItem = (e) => {
        e.preventDefault();
        const itemToAddOn = [...data]
        itemToAddOn[index].properties = property
        setData(itemToAddOn);
        toggleModal();
    };

    const handleAddProperty = () => {
        const lastProperty = property[property.length - 1];

        if (lastProperty.title.trim() !== "" && lastProperty.value.trim() !== "") {
            setProperty([...property, { title: "", value: "" }]);
            setCheckEmpty(false)
        } else {
            console.warn("Cannot add property with empty fields.");
            setCheckEmpty(true)
        }
    };
    const handleDeleteProperty = (index) => {
        const updatedProperties = property.filter((_, i) => i !== index);
        setProperty(updatedProperties);
    };


    const handleChange = (index, field, value) => {
        const updatedProperties = [...property];
        updatedProperties[index][field] = value;
        setProperty(updatedProperties);
    };
    useEffect(() => {
        if (property[0].title.trim() !== "" && property[0].value.trim() !== "") {
            setActivateConfirm(true)
        }
        else {
            setActivateConfirm(false)
        }
    }, [property])

    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
            <div>
                <ModalHeader>
                    <div className="m-2">
                        <h4 className="text-primary">Add properties</h4>
                    </div>
                </ModalHeader>
                <div>
                    <div className="m-3">
                        {checkEmpty && (<div className="alert alert-danger alert-dismissible m-0 p-0">
                            <p className="m-2">Please fill in data</p>
                        </div>)}
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>Property name</th>
                                    <th>Property value</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {property.map((propert, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={propert.title}
                                                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={propert.value}
                                                    onChange={(e) => handleChange(index, 'value', e.target.value)}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            {property.length - 1 !== index ? (
                                                <button
                                                    className='btn btn-outline-light btn-sm mx-1'
                                                    onClick={() => handleDeleteProperty(index)}
                                                >
                                                    <i className="bi bi-trash" style={{ color: "red", fontSize: '1.3em', fontWeight: 'bold' }}></i>
                                                </button>
                                            ) : (
                                                <button
                                                    className='btn btn-primary btn-sm mx-1'
                                                    onClick={handleAddProperty}
                                                >
                                                    <span className='mx-2'>Add</span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className={`btn ${activateConfirm ? 'btn-primary' : 'btn-light'}`} disabled={!activateConfirm} onClick={handleAddPropertiesToItem}>Save</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AddpropertiesModal;
