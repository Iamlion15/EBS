


const defaultItem = { title: 'Dashboard', icon: <i className="bi bi-menu-button-wide mx-2"></i> };

const SidebarItems = {
    STAFF: {
        items: [
            {
                ...defaultItem,
                link: ""
            },
            {
                title: "Request Item",
                icon: <i className="bi bi-file-earmark-plus-fill mx-2"></i>,
                link: ""
            },
            {
                title: "My Requests",
                icon: <i className="bi bi-archive-fill mx-2"></i>,
                link: ""
            },
            {
                title: "Feedback",
                icon: <i class="bi bi-chat-left-fill mx-2"></i>,
                link: ""
            },
            {
                title: "Approved Item",
                icon: <i class="bi bi-card-checklist mx-2"></i>,
                link: ""
            },
        ]
    },
    EBS: {
        items: [
            {
                ...defaultItem,
                link: ""
            },
            {
                title: "Review Requests",
                icon: <i class="bi bi-binoculars-fill mx-2"></i>,
                link: ""
            },
            {
                title: "Feedback",
                icon: <i class="bi bi-chat-left-fill mx-2"></i>,
                link: ""
            },
            {
                title: "Vendors",
                icon: <i class="bi bi-receipt-cutoff mx-2"></i>,
                link: ""
            },
        ]
    },
    FINANCE: {
        items: [
            {
                ...defaultItem,
                link: ""
            },
            {
                title: "Review Requests",
                icon: <i class="bi bi-binoculars-fill mx-2"></i>,
                link: ""
            },
            {
                title: "Feedback",
                icon: <i class="bi bi-chat-left-fill mx-2"></i>,
                link: ""
            },
        ]
    }, 

}

const getSidebarItems=(role)=>{
    return SidebarItems[role].items || []
}

export default getSidebarItems;