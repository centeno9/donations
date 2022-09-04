import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../config/firebase";
import { questions } from "../AdQuestionsCard";

interface questionsProps {
    question: questions;
    differentUser: boolean;
}

export function Questions(props: questionsProps) {

    const [answer, setAnswer] = useState<string>("");

    const answerQuestion = async () => {
        const questionRef = doc(db, "questions", props.question.id);

        updateDoc(questionRef, {
            answer: answer
        }).then(() => {
            props.question.answer = answer;
            setAnswer("");
        })
    }

    return (
        <div className="question-container"  >
            <div className="question-text-container">
                <p>{props.question.question}</p>
            </div>
            {props.question.answer !== "" && (
                <div className="question-answer-container">
                    <div className="bullet-container">
                        <div className="bullet"></div>
                    </div>
                    <div className="answer-container">
                        <p>{props.question.answer}</p>
                    </div>
                </div>
            )}
            {props.question.answer === "" && !props.differentUser && (
                <div className="answer-question">
                    <div className="input-main-container">
                        <label htmlFor="answer">Responder</label>
                        <div className="input-container">
                            <input
                                name="answer"
                                id="answer"
                                type="text"
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                                placeholder="Escribe aquí tu respuesta"
                            />
                        </div>
                    </div>
                    <button type="button" onClick={answerQuestion} className="tertiary-action-btn">Responder</button>
                </div>
            )}
        </div>
    )
}