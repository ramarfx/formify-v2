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

    const answerKeys =
        datas.responses?.length > 0
            ? Object.keys(datas.responses[0].answers)
            : [];

    return (
        <div class="col-lg-10">
            <table class="table mt-3">
                <caption>Total Responses: 3</caption>
                <thead>
                    <tr class="text-muted">
                        <th>User</th>
                        {answerKeys.map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datas &&
                        datas.responses?.map((data) => (
                            <tr>
                                <td class="text-primary">{data.user?.email}</td>
                                {answerKeys.map((key) => (
                                    <td>{data.answers[key]}</td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Responses;
