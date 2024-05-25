import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [forms, setForms] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("/forms");
            setForms(response.data.forms);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main>
            <div class="hero py-5 bg-light">
                <div class="container">
                    <Link to={"/form/create"} class="btn btn-primary">
                        Create Form
                    </Link>
                </div>
            </div>

            <div class="list-form py-5">
                <div class="container">
                    <h6 class="mb-3">List Form</h6>
                    {forms &&
                        forms.map((form) => (
                            <Link
                                to={`/form/${form.slug}`}
                                class="card card-default mb-3"
                                key={form.id}
                            >
                                <div class="card-body">
                                    <h5 class="mb-1">
                                        {form.name}
                                    </h5>
                                    <small class="text-muted">
                                        @{form.slug} {form.limit_one_response != 0 && ("( limit for 1 response )")}
                                    </small>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </main>
    );
};

export default Home;
