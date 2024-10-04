fetch("/register/")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("register-placeholder").innerHTML = data;
  })
  .catch((error) => {
    console.error("Error loading register:", error);
  });
