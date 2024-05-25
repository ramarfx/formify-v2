import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Question = () => {
    const [datas, setDatas] = useState({});
    const { slug } = useParams
    ();

    const fetchData = async () => {
        try {
            const response = await axios.get(`/forms/${slug}`);
            setDatas(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemove = async (id) => {
        try {
            const response = await axios.delete(
                `/forms/${slug}/questions/${id}`
            );
            alert("remove question success");
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div class="col-lg-5 col-md-6">
            {datas.questions?.map((question) => (
                <div
                    class="question-item  card card-default my-4"
                    key={question.id}
                >
                    <div class="card-body">
                        <div class="form-group my-3">
                            <input
                                type="text"
                                placeholder="Question"
                                class="form-control"
                                name="name"
                                value={question.name}
                                disabled
                            />
                        </div>

                        <div class="form-group my-3">
                            <select
                                name="choice_type"
                                class="form-select"
                                value={question.choice_type}
                                disabled
                            >
                                <option>Choice Type</option>
                                <option selected value="short answer">
                                    Short Answer
                                </option>
                                <option value="paragraph">Paragraph</option>
                                <option value="multiple choice">
                                    Multiple Choice
                                </option>
                                <option value="dropdown">Dropdown</option>
                                <option value="checkboxes">Checkboxes</option>
                            </select>
                        </div>
                        {question.choice_type == "multiple choice" ||
                        question.choice_type == "dropdown" ||
                        question.choice_type === "checkboxes" ? (
                            <div class="form-group my-3">
                                <textarea
                                    placeholder="Choices"
                                    class="form-control"
                                    name="choices"
                                    rows="4"
                                    disabled
                                >
                                    {question.choices}
                                </textarea>
                                <div class="form-text">
                                    Separate choices using comma ",".
                                </div>
                            </div>
                        ) : null}
                        <div class="form-check form-switch" aria-colspan="my-3">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="required"
                                disabled
                                checked={question.is_required}
                            />
                            <label class="form-check-label" for="required">
                                Required
                            </label>
                        </div>
                        <div class="mt-3">
                            <button
                                onClick={() => handleRemove(question.id)}
                                type="submit"
                                class="btn btn-outline-danger"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Question;
