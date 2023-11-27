import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import AddpropertiesModal from '../Modals/addPropertiesModal';

const AddVendorItem = ({ nextStep, prevStep,items,setItems,property,setProperty }) => {
    const [checkEmpty, setCheckEmpty] = useState(false)
    const [index, setIndex] = useState("")
    const [activateNext, setActivateNext] = useState(false)
    
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const handleAddItem = () => {
        const lastItem = items[items.length - 1];
        console.log(items);
        if (lastItem.category === "") {
            lastItem.category = "ELECTRONICS"
        }
        if (lastItem.itemName.trim() !== "" && lastItem.itemPrice.trim() !== "" && lastItem.properties.length !== 0) {
            setItems([...items, {
                itemName: "", itemPrice: "", category: "", properties: [{
                    title: "",
                    value: ""
                }]
            }]);
            setCheckEmpty(false)
        } else {
            setCheckEmpty(true)
        }

    };

    const handleChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen)
    }

    const handleDelete = (index) => {
        // Implement delete logic here
        console.log(`Delete item at index ${index}`);
    };
    const showAddProperties = (index) => {
        setIndex(index)
        toggleModal();
    }
    useEffect(() => {
        if (items[0].itemName.trim() !== "" && items[0].itemPrice.trim() !== "" && items[0].properties.length !== 0) {
            setActivateNext(true)
        }
        else {
            setActivateNext(false)
        }
    }, [items])
    const handleNext=()=>{
        
    }

    return (
        <>
            <div className="m-2">
                {checkEmpty && (<div className="alert alert-danger alert-dismissible m-0 p-0">
                    <p className="m-2">Please fill in data</p>
                </div>)}
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>ITEM NAME</th>
                            <th>ITEM PRICE</th>
                            <th>ITEM CATEGORY</th>
                            <th>PROPERTIES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>

                                <td>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={item.itemName}
                                            onChange={(e) => handleChange(index, 'itemName', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={item.itemPrice}
                                            onChange={(e) => handleChange(index, 'itemPrice', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <select className="form-select" value={items.category} onChange={(e) => handleChange(index, 'category', e.target.value)}>
                                            <option value="ELECTRONICS">ELECTRONICS</option>
                                            <option value="OFFICE EQUIPMENT">OFFICE EQUIPMENT</option>
                                            <option value="COMPUTER FACILITY">COMPUTER FACILITY</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className='btn btn-primary btn-sm mx-1'
                                        onClick={() => showAddProperties(index)}
                                    >
                                        <span className='mx-2'>Add Properties</span>
                                    </button>
                                    <button
                                        className='btn btn-outline-light btn-sm mx-1'
                                        onClick={() => handleDelete(index)}
                                    >
                                        <i className="bi bi-trash" style={{ color: "red", fontSize: '1.3em', fontWeight: 'bold' }}></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-6'>
                        <div className='m-2'>
                            <div className='m-2'>
                                <button
                                    className='btn btn-outline-light btn-sm mx-2'
                                    onClick={handleAddItem}
                                >
                                    <span className='mx-2 text-primary'>Add Item</span>
                                    <i className="bi bi-file-plus-fill" style={{ fontSize: '1.2em', fontWeight: 'bold', color: "black" }}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='d-flex justify-content-between'>
                            <button
                                className='btn btn-secondary btn-sm mx-2'
                                onClick={prevStep}
                            >
                                <span className='mx-2'>PREVIOUS</span>
                            </button>
                            {activateNext && <div className='d-flex justify-content-end'>
                                <button
                                    className='btn btn-secondary btn-sm mx-2'
                                    onClick={nextStep}
                                >
                                    <span className='mx-2'>NEXT</span>
                                </button>
                            </div>
                        }
                        </div>
                    </div>
                </div>

                {/* add properties modal */}
                {modalIsOpen && (<AddpropertiesModal
                    toggleModal={toggleModal}
                    modalIsOpen={modalIsOpen}
                    data={items}
                    index={index}
                    setData={setItems}
                    property={property}
                    setProperty={setProperty}
                />)
                }
            </div>
        </>
    );
};

export default AddVendorItem;
