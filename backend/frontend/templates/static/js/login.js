fetch("/login/")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("login-placeholder").innerHTML = data;
  })
  .catch((error) => {
    console.error("Error loading login:", error);
  });
