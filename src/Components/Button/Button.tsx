import React from 'react'
import './Button.css'

interface ButtonProps {
    children: string
    className: string
    border?: boolean
    onClick: () => void
}

function Button({ children, className, border = false, onClick }: ButtonProps) {
    return (
        <div className='button'>
            <button className={className} onClick={onClick}>{children}</button>
            <div className='button__double'>
                <button className={`${className}${border ? "-border" : ""}-hover`} onClick={onClick}>{children}</button>
            </div>
        </div>
    )
}

export default Button