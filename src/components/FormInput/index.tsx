import { ChangeEventHandler, useEffect, useState } from 'react'

import flatErrors from '../../functions/flatErrors'

import './styles.scss'
export type FormInputProps = {
    type?: string,
    id: string,
    placeholder: string,
    label: string,
    message?: string,
    value: any,
    onChange: ChangeEventHandler<HTMLInputElement>,
    required?: boolean,
    errors?: string[],
    generalErrors?: string[],
    showGeneralErrors?: boolean,
    errorColor?: string,
}

export default function FormInput(props: FormInputProps) {
    const [shownErrors, setShownErrors] = useState<string[]>([])
    const [hasErrors, setHasErrors] = useState(false)

    useEffect(() => {
        if (props.errors?.length || props.generalErrors?.length) {
            setHasErrors(true)
            if (props.showGeneralErrors && props.generalErrors)
                setShownErrors(flatErrors(props.errors, props.generalErrors))
            else
                setShownErrors(props.errors || [])
        } else {
            setShownErrors([])
            setHasErrors(false)
        }
    }, [props.errors, props.generalErrors, props.showGeneralErrors])

    return (
        <div
            className='form-input'
            style={{ '--error-color': props.errorColor || '#ff3530' } as React.CSSProperties}
        >
            <label htmlFor={props.id}>
                <span className='label'>{props.label}</span>
                {props.message && <span className='message'>{props.message}</span>}
            </label>
            <input
                type={props.type || 'text'}
                id={props.id}
                className={hasErrors ? 'error' : ''}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
            />
            {
                shownErrors.length > 0 &&
                <div className='errors'>
                    {
                        shownErrors.map((error) =>
                            <>
                                <span className='error'>{error}</span>
                            </>
                        )
                    }
                </div>
            }
        </div>
    )
}
