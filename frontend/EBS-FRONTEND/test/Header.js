import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const HeaderComponent = ({action}) => {
    
    return (
        <header className="border-bottom shadow" style={{ width: "100%" }}>
            <div className="container pt-1">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                       <p> Dashboard</p>
                    </div>
                    <UncontrolledDropdown group>
                        <p className='mt-2'>USERNAME</p>
                        <DropdownToggle
                            caret
                            color='default'
                        />
                        <DropdownMenu className='shadow rounded-3'>
                            <DropdownItem>
                                Update profile
                            </DropdownItem>
                            <DropdownItem>
                                Change passwords
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
