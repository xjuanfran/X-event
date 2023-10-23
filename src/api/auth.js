const API = "localhost:3000/"

export const login = async (email, password) => {
    await fetch(`${API}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}

