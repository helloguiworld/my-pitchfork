// import { } from 'react'

import './styles.scss'
export type useExampleProps = {
    title: string,
    description: string,
    img?: string,
}

export default function UseExample(props: useExampleProps) {
    return (
        <div className='use-example'>
            <div className="text">
                <p className='title'>{props.title}</p>
                <p>{props.description}</p>
            </div>
            <div className="example-image-box">
                <img src={props.img} alt="Use example" className='example' />
            </div>
        </div>
    )
}
