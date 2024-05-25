import axios from "axios";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import { Link } from "react-router-dom";

const TopBar = () => {
    const [datas, setDatas] = useState({});
    const { setToken } = useStateContext();

    const fetchData = async () => {
        try {
            const response = await axios.get("/user");
            setDatas(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("/auth/logout");
            setToken(null);
            window.location.href = "/login";
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
            <div class="container">
                <Link class="navbar-brand" to={'/'}>
                    Formify
                </Link>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                            {datas.name}
                        </a>
                    </li>
                    <li class="nav-item">
                        <button
                            onClick={handleLogout}
                            href="index.html"
                            class="btn bg-white text-primary ms-4"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default TopBar;
