export interface PageText {
    label: string
    placeholder: string
    errorMessage: string
}

export interface InputProps {
    pageText: PageText
    id: string
    name: string
    showError: boolean
    inputDisabled?: boolean
    type?: string
    icon?: string | undefined
    onIconClick?: (email: string) => void
    requrired?: boolean
    pattern?: string | undefined
    spellCheck?: boolean
    minLength?: number | undefined
    maxLength?: number | undefined
    maxNumber?: string | number | undefined
    minNumber?: string | number | undefined
}