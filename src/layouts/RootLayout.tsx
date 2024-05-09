import { Outlet } from "react-router-dom";
import { Navbar } from "../components/landingpage/index.jsx";

const RootLayout = () => {
    return (
        <>
            <div className="font-dmsans bg-primary-50">
                <Navbar />
                <Outlet />
            </div>
        </>
    );
};

export default RootLayout;
