import React, { useEffect, useRef, useState } from 'react'
import './FAQ.css'
import ChevronIcon from "../../Assets/chevron-down.svg";


interface FAQProps {
    question: string;
    answer: string;
}

interface FAQComponentProps {
    text: {
        questions: {
            question: string;
            answer: string;
        }[]
    }
}

export const FAQ = ({ question, answer }: FAQProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const answerElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        answerElement.current?.style.setProperty("margin-top", `-${answerElement.current?.scrollHeight}px`);
    }, [])

    useEffect(() => {
        if (!isOpen) {
            answerElement.current?.style.setProperty("margin-top", `-${answerElement.current?.scrollHeight + 10}px`);
        } else {
            answerElement.current?.style.setProperty("margin-top", "0px");
        }
    }, [isOpen]);

    return (
        <div className={`faq--component${isOpen ? " faq--component__selected" : ""}`}>
            <div className={`faq--box faq--question `} onClick={() => setIsOpen(!isOpen)}>
                <h6>{question}</h6>
                <img src={ChevronIcon} alt=">" className={`${isOpen ? "faq--icon__open" : ""}`} />
                <div className='faq--box faq--question faq--question__double'>
                    <div>
                        <h6>{question}</h6>
                        {/* <img src={ChevronIcon} alt=">" className={`${isOpen ? "faq--icon__open" : ""}`} /> */}
                    </div>
                </div>
            </div>
            <div className={`faq--answer__wrapper${isOpen ? " faq--answer__open" : ""}`}>
                <div ref={answerElement} className={`faq--box faq--answer`}>
                    <p>{answer}</p>
                </div>
            </div>

        </div>
    );
}

const FAQComponent = ({ text }: FAQComponentProps) => {
    return (
        <div className="faq--content">
            {
                text.questions.map(({ question, answer }, index) => {
                    return <FAQ key={index} question={question} answer={answer} />
                })
            }
        </div>
    )
}

export default FAQComponent;