import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Responses = () => {
    const [datas, setDatas] = useState([]);
    const { slug } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`/forms/${slug}/responses`);
            setDatas(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div class="col-lg-10">
            <table class="table mt-3">
                <caption>Total Responses: 3</caption>
                <thead>
                    <tr class="text-muted">
                        <th>User</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Sex</th>
                        <th>Born Date</th>
                        <th>Hobbies</th>
                    </tr>
                </thead>
                <tbody>
                    {datas &&
                        datas.responses?.map((data) => (
                            <tr>
                                <td class="text-primary">{data.user?.email}</td>
                                <td>Budi Andrianto</td>
                                <td>Jakarta</td>
                                <td>Male</td>
                                <td>2000-09-09</td>
                                <td>Football, Coding, Guitar.</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Responses;
