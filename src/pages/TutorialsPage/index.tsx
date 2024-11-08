import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import Page from '../../components/Page'
import Button from '../../components/Button'
import UseExample from '../../components/UseExample'

import { useParams, Navigate } from 'react-router-dom'

import NewAccountTutorial from './NewAccountTutorial'
import NewFeaturesTutorial from './NewFeaturesTutorial'

import './styles.scss'
export type TutorialsPageProps = {
    free?: boolean,
}
type TutorialsPageParams = {
    tutorial: string
}

export default function TutorialsPage(props: TutorialsPageProps) {
    const authContext = useContext(AuthContext)

    const { tutorial } = useParams<TutorialsPageParams>()

    function selectTutorial(tutorial?: string) {
        switch (tutorial) {
            case 'new-account':
                return <NewAccountTutorial />
            case 'new-features':
                return <NewFeaturesTutorial />
            default:
                return <Navigate to="/" replace />
        }
    }

    return (
        <Page id='tutorials-page' hideHeader hideBanners>
            {selectTutorial(tutorial)}
        </Page>
    )
}
