// recieve username and password, return accessToken
const login = async (username, password) => {
  const loginInfo = { username, password }

  try {
    const res = await fetch("https://api.learnhub.thanayut.in.th/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    })
    const data = await res.json()

    if (data.statusCode === 401) {
      alert(data.message)
      return
    }

    return data.accessToken
  } catch (err) {
    console.log(err)
  }
}

const getPersonalInfo = async () => {
  const accessToken = localStorage.getItem("token")

  try {
    const res = await fetch("https://api.learnhub.thanayut.in.th/auth/me", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await res.json()

    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

const init = () => {
  const usernameInput = document.getElementById("username")

  const passwordInput = document.getElementById("password")

  const submitButton = document.getElementById("submit")

  submitButton.addEventListener("click", async (e) => {
    e.preventDefault()

    if (!passwordInput.value || !usernameInput.value) {
      alert("Please input something")
      return
    }

    const accessToken = await login(usernameInput.value, passwordInput.value)

    if (!accessToken) return

    localStorage.setItem("token", accessToken)

    getPersonalInfo()
  })
}

document.addEventListener("DOMContentLoaded", () => {
  init()
})
