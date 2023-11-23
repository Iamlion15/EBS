import { useState, useEffect } from 'react';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import getSidebarItems from '@/constants/sidebarUtils';
import Image from 'next/image';

const Sidebar = ({page,setPage,logout}) => {
    const linearGradientBackground = {
        background: 'linear-gradient(195deg, #49a3f1, #0057A3)',
        borderColor: 'linear-gradient(195deg, #49a3f1, #0057A3)',
        width: "100%"
    }
    const [sideBarItems, setSideBarItems] = useState([])
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [hoveredItem, setHoveredItem] = useState('')
    const [isHovered, setIsHovered] = useState(false)
    const toggleScreens = (item) => {
        setActiveItem(item)
        setPage(item)
    }
    const handleHoveredItem = (item) => {
        setHoveredItem(item)
    }
    useEffect(() => {
        const role = JSON.parse(localStorage.getItem("user")).role
        const dashboardItems = getSidebarItems(role)
        setSideBarItems(dashboardItems)

    }, [])

    return (
            <div className='col-3'>
                <div className="d-flex flex-column p-3 text-white fixed-top vh-100" style={{ width: "25.5%", backgroundColor: "#223B54" }}>
                    <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <div className='d-flex flex-column'>
                        <div style={{ backgroundColor: '#ffffff' }} className='m-2'>
                        <Image
                                    src="/images/logo.png"
                                    width={300}
                                    height={100}       
                                />
                                </div>
                        <span className="fs-4 font-monospace mt-3 d-flex justify-content-center"><strong>EBS PROCUREMENT</strong></span>
                        </div>
                    </div>
                    <hr />
                    {/* list of items */}
                    <ul className="nav nav-pills flex-column">
                        {sideBarItems.map((item) => {
                            return (
                                <li className="nav-item" key={item.title}>
                                    {/* "nav-link active" */}
                                    <Link href="">
                                        <a className={`nav-link mt-2 text-white my-2 ${activeItem === `${item.title}` ? 'active' : ''}`}
                                            onClick={() => toggleScreens(`${item.title}`)}
                                            // i want to apply is hovered when and only if active is set to false
                                            style={{ backgroundColor: hoveredItem === `${item.title}` && activeItem !== `${item.title}` ? 'rgba(255, 255, 255, 0.2)' : '', }}
                                            onMouseEnter={() => handleHoveredItem(`${item.title}`)}
                                            onMouseLeave={() => handleHoveredItem('')}
                                        >
                                            {item.icon}
                                            <strong>{item.title}</strong>
                                        </a>
                                    </Link>
                                </li>
                            )
                        })}

                    </ ul>
                    <div className='mt-auto mb-3'>
                        <button className='btn text-white' 
                        onClick={()=>logout()}
                        style={linearGradientBackground}>
                            <strong>LOGOUT</strong>
                            <i className="bi bi-box-arrow-right mx-2" style={{ fontSize: '1.5em', fontWeight: 'bold' }}></i>
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default Sidebar;
