import { useState, FormEvent, useContext } from 'react'

import { AuthContext } from '../../../../contexts/AuthContext'

import Button from "../../../../components/Button"

import accessServices from '../../../../services/accessServices'
import { useNavigate } from 'react-router-dom'

// import './styles.scss'
// export type LoginFormProps = {
// }

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fetching, setFetching] = useState(false)

    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setFetching(true)
        await accessServices.login(username, password)
            .then((response) => {
                const token = response.data.token
                if (token) {
                    authContext?.login(token)
                    navigate('/')
                }
            }).finally(() => setFetching(false))
    }

    return (
        <>
            <div className="title">
                <h1>OMG hiiii!</h1>
                <h2>welcome back 😁</h2>
            </div>

            {
                authContext?.isAuth ?
                    < Button
                        type='submit'
                        color={"#ff9876"}
                        onClick={() => {
                            authContext.logout()
                        }}
                    >
                        LOGOUT
                    </Button>
                    :
                    <form className='login' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder='enter your username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder='enter your ********'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>


                        <Button
                            type='submit'
                            fetching={fetching}
                        >
                            LOGIN
                        </Button>
                        <Button
                            type='submit'
                            color={"#ff3530"}
                        >
                            CREATE ACCOUNT
                        </Button>
                    </form >
            }
        </>
    )
}
