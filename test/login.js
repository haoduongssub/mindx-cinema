document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm")
  const loginField = document.getElementById("loginField")
  const password = document.getElementById("password")
  const passwordToggle = document.getElementById("passwordToggle")

  // Password visibility toggle
  passwordToggle.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password"
    password.setAttribute("type", type)

    // Update icon
    const eyeIcon = passwordToggle.querySelector(".eye-icon")
    if (type === "text") {
      eyeIcon.innerHTML =
        '<path d="m15 18-.722-3.25"/><path d="m2 8 1.669 2.5"/><path d="M2 12s3-7 10-7 10 7 10 7"/><path d="m5 12 2.5 2.5"/><path d="M8 12s3-7 10-7"/>'
    } else {
      eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
    }
  })

  // Form validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(fieldId + "Error")

    field.classList.add("error")
    errorElement.textContent = message
    errorElement.classList.add("show")
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(fieldId + "Error")

    field.classList.remove("error")
    errorElement.classList.remove("show")
  }

  // Clear errors on input
  loginField.addEventListener("input", () => clearError("loginField"))
  password.addEventListener("input", () => clearError("password"))

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    let isValid = true

    // Clear previous errors
    clearError("loginField")
    clearError("password")

    // Validate login field
    if (!loginField.value.trim()) {
      showError("loginField", "Username hoặc email là bắt buộc")
      isValid = false
    } else if (!validateEmail(loginField.value) && !validateUsername(loginField.value)) {
      showError("loginField", "Vui lòng nhập username hoặc email hợp lệ")
      isValid = false
    }

    // Validate password
    if (!password.value) {
      showError("password", "Mật khẩu là bắt buộc")
      isValid = false
    } else if (password.value.length < 6) {
      showError("password", "Mật khẩu phải có ít nhất 6 ký tự")
      isValid = false
    }

    if (isValid) {
      // Handle login logic here
      console.log("Login attempt:", {
        loginField: loginField.value,
        password: password.value,
      })
      alert("Đăng nhập thành công!")
    }
  })
})
