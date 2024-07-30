// import { } from 'react'

import Page from '../../components/Page'

import './styles.scss'
// export type MaintenancePageProps = {
// }

export default function MaintenancePage() {
    return (
        <Page id='maintenance-page' hideSearch hideAccess hideBanners>
            <div className='main'>
                <h2>We are under</h2>
                <h1 className='my-pitchfork'>🚧 MAINTENANCE 🚧</h1>
                <p>be right back 🤠</p>
            </div>
        </Page>
    )
}
