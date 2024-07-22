import { ReactNode } from 'react'

import Header from '../Header'
import Footer from '../Footer'
import UpdatesNotice from '../UpdatesNotice'

import './styles.scss'
export type PageProps = {
    children: ReactNode | ReactNode[],
    id: string,
}

export default function Page(props: PageProps) {
    return (
        <>
            <Header />
            <UpdatesNotice ownSpace/>
            <main className='page' id={props.id}>
                {props.children}
            </main>
            <Footer />
        </>
    )
}
