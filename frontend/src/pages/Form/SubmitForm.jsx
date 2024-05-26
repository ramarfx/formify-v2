import axios from "axios";
import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";

const SubmitForm = () => {
    const [datas, setDatas] = useState({});
    const [formValues, setFormValues] = useState([]);
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formattedAnswers = Object.values(formValues).map((answer) => {
                if (Array.isArray(answer.value)) {
                  return {
                    ...answer,
                    value: answer.value.join(',') // Join array into a string with commas
                  };
                }
                return answer;
              });
            const response = await axios.post(`/forms/${slug}/responses`, {
                answers: formattedAnswers
            })
            alert('terima kasih, respon anda sudah terkirim!')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        console.log(formValues);
    }, [formValues])

    const handleChange = (e) => {
        const { name, value, type, checked, dataset } = e.target;
        const questionId = dataset.questionId;

        if (type === 'checkbox') {
            setFormValues((prevValues) => {
                const currentCheckboxValues = prevValues[questionId]?.value || [];
                if (checked) {
                    return { ...prevValues, [questionId]: { question_id: questionId, value: [...currentCheckboxValues, value] } };
                } else {
                    return { ...prevValues, [questionId]: { question_id: questionId, value: currentCheckboxValues.filter((v) => v !== value) } };
                }
            });
        } else {
            setFormValues({ ...formValues, [questionId]: { question_id: questionId, value: value } });
        }
    };

    return (
        <main>
            <div class="hero py-5 bg-light">
                <div class="container text-center">
                    <h2 class="mb-3">
                        {datas.form?.name}
                    </h2>
                    <div class="text-muted">
                        {datas.form?.description}
                    </div>
                </div>
            </div>

            <div class="py-5">
                <div class="container">

                    <div class="row justify-content-center ">
                        <div class="col-lg-5 col-md-6">

                            <div class="text-muted">
                                <span class="text-primary">{datas.form?.creator}</span> <small><i>(shared)</i></small>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {datas.questions?.map((question) => {
                                    if (question.choice_type === 'short answer') {
                                        return (
                                            <div class="form-item card card-default my-4">
                                                <div class="card-body">
                                                    <div class="form-group">
                                                        <label for="name" class="mb-1 text-muted">{question.name} {question.is_required ? <span class="text-danger">*</span> : ''}</label>
                                                        <input id="name" type="text" placeholder="Your answer" class="form-control" name={question.name} onChange={handleChange} data-question-id={question.id} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else if (question.choice_type === 'paragraph') {
                                        return (
                                            <div class="form-item card card-default my-4">
                                                <div class="card-body">
                                                    <div class="form-group">
                                                        <label for="address" class="mb-1 text-muted">{question.name} {question.is_required ? <span class="text-danger">*</span> : ''}</label>
                                                        <textarea id="address" rows="4" placeholder="Your answer" class="form-control" name={question.name} onChange={handleChange} data-question-id={question.id}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else if (question.choice_type === 'date') {
                                        return (
                                            <div class="form-item card card-default my-4">
                                                <div class="card-body">
                                                    <div class="form-group">
                                                        <label for={question.name} class="mb-1 text-muted">{question.name} {question.is_required ? <span class="text-danger">*</span> : ''}</label>
                                                        <input type="date" placeholder="Your answer" class="form-control" id={question.name} name={question.name} onChange={handleChange} data-question-id={question.id}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else if (question.choice_type === 'multiple choice') {
                                        const choices = question.choices?.split(',');
                                        return (
                                            <div class="form-item card card-default my-4">
                                                <div class="card-body">
                                                    <div class="form-group">
                                                        <label for="" class="mb-1 text-muted">{question.name} {question.is_required ? <span class="text-danger">*</span> : ''}</label>
                                                        {choices?.map((choice) => (
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" value={choice} id={choice} name={question.name} onChange={handleChange} data-question-id={question.id} />
                                                                <label class="form-check-label" for={choice}>
                                                                    {choice}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    } else if (question.choice_type === 'checkboxes') {
                                        const choices = question.choices?.split(',');
                                        return (
                                            <div class="form-item card card-default my-4">
                                                <div class="card-body">
                                                    <div class="form-group">
                                                        <label for="" class="mb-1 text-muted">{question.name} {question.is_required ? <span class="text-danger">*</span> : ''}</label>

                                                        {choices.map((choice) => (
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" value={choice} id={choice} name={question.name + '[]'} onChange={handleChange} data-question-id={question.id} />
                                                                <label class="form-check-label" for="hobbies-football">
                                                                    {choice}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}

                                <div class="mt-4">
                                    <button class="btn btn-primary">Submit</button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default SubmitForm;
