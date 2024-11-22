import {Outlet} from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent.tsx";

const MainLayout = () => {
    return (
        <div>
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;