import React from 'react'
import './Select.css'

interface SelectProps {
    name: string
    id: string
    options: { value: string, text: string }[]
    inputDisabled: boolean
}

function Select({ name, id, options, inputDisabled }: SelectProps) {
    return (
        <select name={name} id={id} disabled={inputDisabled} className="input__element">
            {
                options.map((option, index) => {
                    return (
                        <option key={index} value={option.value}>{option.text}</option>
                    )
                })
            }
        </select>
    )
}

export default Select