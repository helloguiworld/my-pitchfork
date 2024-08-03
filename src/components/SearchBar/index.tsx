import {
    ChangeEventHandler,
    FormEventHandler,
    MouseEventHandler,
    FormEvent,
    useRef
} from 'react'

import Button from '../Button'

import './styles.scss'
export type SearchBarProps = {
    value: string
    placeholder?: string
    maxLength?: number

    colorFilled?: boolean
    inactive?: boolean
    fetching?: boolean

    onChange: ChangeEventHandler
    onSubmit: FormEventHandler
    onClick?: MouseEventHandler
}

export default function SearchBar(props: SearchBarProps) {
    const searchInputRef = useRef<HTMLInputElement>(null)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        searchInputRef.current?.blur()
        props.onSubmit(event)
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder={props.placeholder || 'album or artist'}
                maxLength={props.maxLength || 50}
                value={props.value}
                onChange={props.onChange}
                ref={searchInputRef}
                required
            />
            <Button
                type={props.onClick ? 'button' : 'submit'}
                colorFilled={props.colorFilled}
                inactive={props.inactive}
                fetching={props.fetching}
                onClick={props.onClick}
            >
                SEARCH
            </Button>
        </form >
    )
}
