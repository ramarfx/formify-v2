import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Question from "./Question";
import Responses from "./Response";

const DetailForm = () => {
    const [datas, setDatas] = useState({});
    const [isQuestion, setIsQuestion] = useState(false);
    const { slug } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`/forms/${slug}`);
            setDatas(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!datas) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <main>
            <div class="hero py-5 bg-light">
                <div class="container text-center">
                    <h2 class="mb-2">{datas.form?.name}</h2>
                    <div class="text-muted mb-4">{datas.form?.description}</div>
                    <div>
                        <div>
                            <small>For user domains</small>
                        </div>
                        <small>
                            <span class="text-primary">
                                {datas.form?.allowed_domains.join(", ")}
                            </span>
                        </small>
                    </div>
                </div>
            </div>

            <div class="py-5">
                <div class="container">
                    <div class="row justify-content-center ">
                        <div class="col-lg-5 col-md-6">
                            <div class="input-group mb-5">
                                <input
                                    type="text"
                                    class="form-control form-link"
                                    readonly
                                    value={`http://localhost:8000/forms/${slug}`}
                                />
                                <Link to={"#"} class="btn btn-primary">
                                    Copy
                                </Link>
                            </div>

                            <ul class="nav nav-tabs mb-2 justify-content-center">
                                <li class="nav-item">
                                    <button
                                        class={`nav-link ${isQuestion ? "active" : ""}`}
                                        onClick={() => setIsQuestion(true)}
                                    >
                                        Questions
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button
                                        class={`nav-link ${isQuestion ? "" : "active"}`}
                                        onClick={() => setIsQuestion(false)}
                                    >
                                        Responses
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        {isQuestion ? <Question /> : <Responses />}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DetailForm;
