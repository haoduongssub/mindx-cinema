document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm")
  const name = document.getElementById("name")
  const username = document.getElementById("username")
  const email = document.getElementById("email")
  const registerPassword = document.getElementById("registerPassword")
  const confirmPassword = document.getElementById("confirmPassword")
  const registerPasswordToggle = document.getElementById("registerPasswordToggle")
  const confirmPasswordToggle = document.getElementById("confirmPasswordToggle")

  // Password visibility toggles
  registerPasswordToggle.addEventListener("click", () => {
    togglePasswordVisibility(registerPassword, registerPasswordToggle)
  })

  confirmPasswordToggle.addEventListener("click", () => {
    togglePasswordVisibility(confirmPassword, confirmPasswordToggle)
  })

  function togglePasswordVisibility(passwordField, toggleButton) {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password"
    passwordField.setAttribute("type", type)

    const eyeIcon = toggleButton.querySelector(".eye-icon")
    if (type === "text") {
      eyeIcon.innerHTML =
        '<path d="m15 18-.722-3.25"/><path d="m2 8 1.669 2.5"/><path d="M2 12s3-7 10-7 10 7 10 7"/><path d="m5 12 2.5 2.5"/><path d="M8 12s3-7 10-7"/>'
    } else {
      eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
    }
  }

  // Validation functions
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
  }

  function validatePassword(password) {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
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
  name.addEventListener("input", () => clearError("name"))
  username.addEventListener("input", () => clearError("username"))
  email.addEventListener("input", () => clearError("email"))
  registerPassword.addEventListener("input", () => clearError("registerPassword"))
  confirmPassword.addEventListener("input", () => clearError("confirmPassword"))

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    let isValid = true

    // Clear previous errors
    clearError("name")
    clearError("username")
    clearError("email")
    clearError("registerPassword")
    clearError("confirmPassword")

    // Validate name
    if (!name.value.trim()) {
      showError("name", "Tên là bắt buộc")
      isValid = false
    } else if (name.value.trim().length < 2) {
      showError("name", "Tên phải có ít nhất 2 ký tự")
      isValid = false
    }

    // Validate username
    if (!username.value.trim()) {
      showError("username", "Username là bắt buộc")
      isValid = false
    } else if (!validateUsername(username.value)) {
      showError("username", "Username phải có 3-20 ký tự, chỉ chứa chữ cái, số và dấu gạch dưới")
      isValid = false
    }

    // Validate email
    if (!email.value) {
      showError("email", "Email là bắt buộc")
      isValid = false
    } else if (!validateEmail(email.value)) {
      showError("email", "Email không hợp lệ")
      isValid = false
    }

    // Validate password
    if (!registerPassword.value) {
      showError("registerPassword", "Mật khẩu là bắt buộc")
      isValid = false
    } else if (!validatePassword(registerPassword.value)) {
      showError("registerPassword", "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số")
      isValid = false
    }

    // Validate confirm password
    if (!confirmPassword.value) {
      showError("confirmPassword", "Xác nhận mật khẩu là bắt buộc")
      isValid = false
    } else if (registerPassword.value !== confirmPassword.value) {
      showError("confirmPassword", "Mật khẩu xác nhận không khớp")
      isValid = false
    }

    if (isValid) {
      // Handle registration logic here
      console.log("Registration attempt:", {
        name: name.value,
        username: username.value,
        email: email.value,
        password: registerPassword.value,
      })
      alert("Đăng ký thành công!")
    }
  })
})
