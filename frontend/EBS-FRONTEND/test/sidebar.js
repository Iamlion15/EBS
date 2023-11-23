import { useState, useEffect } from 'react';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import HeaderComponent from './Header';
import AddProduct from './addProduct';
import getSidebarItems from '@/constants/sidebarUtils';



const Sidebar = () => {
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
    }
    const handleHoveredItem = (item) => {
        setHoveredItem(item)
    }
    useEffect(() => {
        const role = "Producer"
        const dashboardItems = getSidebarItems(role)
        setSideBarItems(dashboardItems)

    }, [])

    return (
            <div className='col-3'>
                <div className="d-flex flex-column p-3 text-white fixed-top vh-100" style={{ width: "25.5%", backgroundColor: "#2A3F54" }}>
                    <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">

                        <span className="fs-4"><strong>RICMS- SYSTEM</strong></span>
                    </div>
                    <hr />
                    {/* list of items */}
                    <ul className="nav nav-pills flex-column">
                        {sideBarItems.map((item) => {
                            return (
                                <li className="nav-item" key={item.title}>
                                    {/* "nav-link active" */}
                                    <Link href="">
                                        <a className={`nav-link mt-2 text-white ${activeItem === `${item.title}` ? 'active' : ''}`}
                                            onClick={() => toggleScreens(`${item.title}`)}
                                            // i want to apply is hovered when and only if active is set to false
                                            style={{ backgroundColor: hoveredItem === `${item.title}` && activeItem !== `${item.title}` ? 'rgba(255, 255, 255, 0.2)' : '', }}
                                            onMouseEnter={() => handleHoveredItem(`${item.title}`)}
                                            onMouseLeave={() => handleHoveredItem('')}
                                        >
                                            {item.icon}
                                            {item.title}
                                        </a>
                                    </Link>
                                </li>
                            )
                        })}

                    </ ul>
                    <div className='mt-auto mb-3'>
                        <button className='btn text-white' style={linearGradientBackground}>
                            <strong>LOGOUT</strong>
                            <i className="bi bi-box-arrow-right mx-2" ></i>
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default Sidebar;
