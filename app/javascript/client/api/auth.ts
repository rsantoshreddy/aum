const signup = async (
  email: string,
  password: string,
  passwordConfirmation: string
) => {
  const response = await fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token":
        document.querySelector<HTMLMetaElement>('[name="csrf-token"]')
          ?.content || "",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    }),
  })
  return response.json()
}
const login = async (email: string, password: string) => {
  const response = await fetch("/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token":
        document.querySelector<HTMLMetaElement>('[name="csrf-token"]')
          ?.content || "",
    },
    body: JSON.stringify({ email, password }),
  })
  return response.json()
}

export { signup, login }
