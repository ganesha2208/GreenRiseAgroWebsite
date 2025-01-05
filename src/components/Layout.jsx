/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WhatsupNotification from "./whatsupNotification";

const Layout = ({children}) => {
    return (
        <div>
            <Navbar/>
            <div className="main-content min-h-screen">
                {children}
            </div>
            <WhatsupNotification/>
            <Footer/>
        </div>
    );
}

export default Layout;