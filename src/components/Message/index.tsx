import './styles.scss'
export type MessageProps = {
    title?: string
    children: JSX.Element | JSX.Element[]
}

export default function Message(props: MessageProps) {
    return (
        <div className="message">
            {props.title && <p className='title'>{props.title}</p>}
            {props.children}
        </div>
    )
}
