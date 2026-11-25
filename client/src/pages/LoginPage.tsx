import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const [username, setUsername] =useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setLoading(true)
        setError('')

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username, password})
                }
            )
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }

            localStorage.setItem('token', data.access_token)
            navigate('/')
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Something went wrong')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit" disabled={loading}>Login</button>

                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default LoginPage