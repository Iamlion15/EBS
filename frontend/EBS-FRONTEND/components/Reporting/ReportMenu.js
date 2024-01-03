import { useState } from "react";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  TabPane,
} from "reactstrap";
import ItemReportStatus from "./ItemstatusReport";
import InvoiceReport from "./InvoiceReport";

const ReportMenu = ({ modalIsOpen, toggleModal, confirmHandler }) => {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (tabIndex) => {
    if (activeTab !== tabIndex) {
      setActiveTab(tabIndex);
    }
  };

  return (
    <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center" size="md">
      <ModalHeader>
                    <div className="m-2">
                        <h4 className="text-primary">Detailed report</h4>
                    </div>
                </ModalHeader>
      <div className="font-monospace">
        <div className="nav-wrapper mx-2 mt-2">
          <Nav 
          style={{cursor:"pointer"}}
            className="nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                aria-selected={activeTab === 1}
                className={`mb-sm-3 mb-md-0 ${activeTab === 1 ? "active" : ""}`}
                onClick={() => toggleTab(1)}
                role="tab"
              >
                Item status report
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={activeTab === 2}
                className={`mb-sm-3 mb-md-0 ${activeTab === 2 ? "active" : ""}`}
                onClick={() => toggleTab(2)}
                role="tab"
              >
                Invoice Report
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <Card className="my-2 mx-2">
          <CardBody>
            {activeTab === 1 && (
              <TabPane>
                <ItemReportStatus />
              </TabPane>
            )}
            {activeTab === 2 && (
              <TabPane>
                <InvoiceReport />
              </TabPane>
            )}
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default ReportMenu;
