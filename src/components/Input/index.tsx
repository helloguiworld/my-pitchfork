import { ChangeEventHandler } from 'react'

// import 

import './styles.scss'
export type InputProps = {
    type?: string,
    id: string,
    label: string,
    message: string,
    placeholder: string,
    value: any,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    color?: string,
    rows?: number,
    required?: boolean,
    maxLength?: number,
}

export default function Input(props: InputProps) {
    return (
        <div
            className="input-component"
            style={{ '--color': props.color || 'var(--color-black)' } as React.CSSProperties}
        >
            <label htmlFor={props.id}>
                <span className='label'>{props.label}</span>
                {props.message && <span className='message'>{props.message}</span>}
            </label>
            {
                props.type == "textarea" ?
                    <textarea
                        id={props.id}
                        name={props.id}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        required={props.required}
                        maxLength={props.maxLength}
                        rows={props.rows || 5}

                    />
                    :
                    <input
                        type={props.type || 'text'}
                        id={props.id}
                        name={props.id}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        required={props.required}
                        maxLength={props.maxLength}
                    />
            }
        </div>
    )
}
