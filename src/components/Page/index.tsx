import { ReactNode } from 'react'

import Header from '../Header'
import Footer from '../Footer'

import './styles.scss'
export type PageProps = {
    children: ReactNode | ReactNode[],
    id: string,
}

export default function Page(props: PageProps) {
    return (
        <>
            <Header />
            <main className='page' id={props.id}>
                {props.children}
            </main>
            <Footer />
        </>
    )
}
