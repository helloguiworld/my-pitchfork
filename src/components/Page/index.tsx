import { ReactNode } from 'react'

import Header from '../Header'
import Footer from '../Footer'
import UpdatesNotice from '../Notice/UpdatesNotice'
import Banner from '../Banner'

import './styles.scss'
export type PageProps = {
    children: ReactNode | ReactNode[],
    id: string,
    hideBanners?: boolean,
}

export default function Page(props: PageProps) {
    return (
        <>
            <Header />
            {
                !props.hideBanners &&
                <div className="banner-group" data-html2canvas-ignore={true}>
                    <UpdatesNotice ownSpace />
                    <Banner />
                </div>
            }
            <main className='page' id={props.id}>
                {props.children}
            </main>
            <Footer />
        </>
    )
}
