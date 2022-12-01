import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { AuthProvider, useAuth } from "../../Context/UserContext";
import "./AdQuestionsStyles.scss";
import { Questions } from "./subComponents/Questions";

interface questionFormElements extends HTMLFormControlsCollection {
    question: HTMLInputElement;
}

interface questionForm extends HTMLFormElement {
    readonly elements: questionFormElements;
}

export interface questions {
    question: string;
    answer: string;
    adId: string;
    userId: string;
    id: string;
}

export function AdQuestionsCard(props: any) {

    const [questions, setQuestions] = useState<Array<questions>>(new Array());
    const [loading, setLoading] = useState<boolean>(true);
    const user = useAuth().user;
    const differentUser = user.id !== props.adUserId ? true : false;


    const handleSubmit = async (e: React.FormEvent<questionForm>) => {
        e.preventDefault();

        const question = e.currentTarget.question.value;
        e.currentTarget.question.value = "";

        await addDoc(collection(db, "questions"), {
            question: question,
            answer: "",
            adId: props.adId,
            userId: user.id,
            createdAt: new Date()
        }).then(() => {
            getQuestions();
        });
    }

    const getQuestions = async () => {
        const questionsTempArray = new Array();
        const q = query(collection(db, "questions"), where("adId", "==", props.adId), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);

        snap.docs.map((question) => {
            console.log(question.id)
            questionsTempArray.push({ id: question.id, ...question.data() });
        });

        setQuestions(questionsTempArray);
        setLoading(false);
    }

    useEffect(() => {
        getQuestions()
    }, []);

    return (
        <div className="AdQuestionsCard-main-container">
            {loading ? (
                <div className="loading-container">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="header">
                        {differentUser ? (
                            <h2>Hacer una pregunta</h2>
                        ) : (
                            <h2>Preguntas</h2>
                        )}
                    </div>
                    {differentUser && (
                        <form onSubmit={handleSubmit} className="make-question-container">
                            <div className="input-main-container">
                                <label htmlFor="question">Escribir pregunta</label>
                                <div className="input-container">
                                    <input
                                        name="question"
                                        id="question"
                                        type="text"
                                        placeholder="Escribe aquí tu pregunta"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="tertiary-action-btn">Preguntar</button>
                        </form>
                    )}
                    {questions.length > 0 && (
                        questions.map((question, index) => {
                            return(
                                <Questions question={question} differentUser={differentUser} key={"ad-question-" + index} />
                            );
                        })
                    )}
                </>
            )}
        </div>
    );
}