document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const residentsList = document.getElementById("residents-list");

  // Fetch and display residents
  fetchResidents();

  // Logout functionality
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/login/";
  });

  async function fetchResidents() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login/";
      return;
    }

    try {
      const response = await fetch("/brgy/residents/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const residents = await response.json();
        displayResidents(residents);
      } else {
        console.error("Failed to fetch residents");
        residentsList.innerHTML =
          "<p>Failed to load residents. Please try again later.</p>";
      }
    } catch (error) {
      console.error("Error fetching residents:", error);
      residentsList.innerHTML =
        "<p>An error occurred while loading residents. Please try again later.</p>";
    }
  }

  function displayResidents(residents) {
    if (residents.length === 0) {
      residentsList.innerHTML = "<p>No residents found.</p>";
      return;
    }

    const table = document.createElement("table");
    table.className = "table table-striped";
    table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                ${residents
                  .map(
                    (resident) => `
                    <tr>
                        <td>${resident.name}</td>
                        <td>${resident.age}</td>
                        <td>${resident.address}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        `;

    residentsList.appendChild(table);
  }
});
