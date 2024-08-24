import React from 'react'
import './Alert.css'
import Button from '../Button/Button'

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
                    <Button
                        className='btn btn__secondary'
                        onClick={buttonOneAction}
                    >
                        {buttonOneText}
                    </Button>
                    {
                        (buttonTwoText && buttonTwoAction) &&
                        <Button
                            className='btn btn__primary'
                            onClick={buttonTwoAction}
                        >
                            {buttonTwoText}
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Alert