import { useEffect, useRef } from 'react'
import './TitleAndDesc.css'

interface Props {
    text: {
        title: string,
        description: string
    }
}

function TitleAndDesc({ text }: Props) {
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = text.description
        }
    }, [])

    return (
        <div className="tad">
            <h2>{text.title}</h2>
            <p ref={descriptionRef}></p>
        </div>
    )
}

export default TitleAndDesc