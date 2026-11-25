import { useState } from "react"

function LoginPage() {
    const [username, setUsername] =useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    return (
        <div>
            <h1>Login</h1>

            <form>
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