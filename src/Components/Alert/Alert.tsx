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
                <h3 className='header__yellow'>{title}</h3>
                <p>{message}</p>
                <div className='alert--buttons'>
                    <Button
                        className='btn btn__primary btn__primary-border'
                        onClick={buttonOneAction}
                    >
                        {buttonOneText}
                    </Button>
                    {
                        (buttonTwoText && buttonTwoAction) &&
                        <Button
                            className='btn btn__secondary btn__secondary-border'
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