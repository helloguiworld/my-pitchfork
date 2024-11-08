// import { ReactNode } from 'react'

import './styles.scss'
export type useExampleProps = {
    title?: string,
    description?: string,
    texts?: string[],
    img?: string,
    spacedTop?: boolean,
    spacedBottom?: boolean,
    textCenter?: boolean,
}

export default function UseExample(props: useExampleProps) {
    return (
        <div
            className={
                'example'
                + (props.spacedTop ? ' spaced-top' : '')
                + (props.spacedBottom ? ' spaced-bottom' : '')
            }
        >
            <div className={"text" + (props.textCenter ? ' center' : '')}>
                {props.title && <p className='title'>{props.title}</p>}
                {props.description && <p className='description'>{props.description}</p>}
                {props.texts?.map((text, index) => <p key={index}>{text}</p>)}
            </div>
            {
                props.img &&
                <div className="example-image-box">
                    <img src={props.img} alt="Use example" className='example' />
                </div>
            }
        </div>
    )
}
