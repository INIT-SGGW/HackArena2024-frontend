import React from 'react'
import './Alert.css'

interface Props {
    title: string,
    message: string,
    buttonOneText: string,
    buttonOneAction: () => void,
    buttonTwoText?: string,
    buttonTwoAction?: () => void
}

function Alert({
    title,
    message,
    buttonOneAction,
    buttonOneText,
    buttonTwoAction,
    buttonTwoText }: Props) {
    return (
        <div className='alert'>
            <div className="alert--content">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className='alert--buttons'>
                    <button
                        className='account--button account--button__secondary'
                        onClick={buttonOneAction}
                    >
                        {buttonOneText}
                    </button>
                    {
                        (buttonTwoText && buttonTwoAction) &&
                        <button
                            className='account--button account--button__primary'
                            onClick={buttonTwoAction}
                        >
                            {buttonTwoText}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Alert