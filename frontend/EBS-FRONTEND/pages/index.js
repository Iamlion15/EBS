import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from "./user/login";

const Index = () => {
    const wrapperStyle = {
        backgroundColor: '#4c97ff',
        height: '100vh',
        width: '100%',
    };

    return (
        <div style={wrapperStyle}>
            <UserLogin />
        </div>
    );
};

export default Index;
