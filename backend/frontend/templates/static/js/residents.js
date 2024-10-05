document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const residentsList = document.querySelector(".card-body");
  const createHouseholdForm = document.getElementById("createHouseholdForm");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const modalElement = document.getElementById("createHouseholdModal");
  const modalInstance = new bootstrap.Modal(modalElement);

  // Fetch and display residents
  fetchResidents();

  // Logout functionality
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/login/";
  });

  // Set form method dynamically (POST or PUT)
  function setFormMethod(method) {
    createHouseholdForm.dataset.method = method;

    if (method === "POST") {
      createHouseholdForm.reset(); // This clears all fields
      document.getElementById("residentId").value = ""; // Clear the hidden ID field
      document.getElementById("createHouseholdModalLabel").textContent = "Create Resident"; // Update modal title to "Create"
      document.getElementById("formErrorMessage").classList.add("d-none"); // Hide any error messages
    } else if (method === "PUT") {
      document.getElementById("createHouseholdModalLabel").textContent = "Edit Resident"; // Update modal title to "Edit"
    }
  }

  // Reset the form and modal title when modal is closed
  modalElement.addEventListener('hidden.bs.modal', () => {
    setFormMethod("POST"); // Reset to default "POST" (create) mode when modal closes
    createHouseholdForm.reset(); // Clear form fields
  });

  // Handle form submission for create/edit
  createHouseholdForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(createHouseholdForm);
    const data = Object.fromEntries(formData.entries());
    const method = createHouseholdForm.dataset.method || "POST";
    const url = method === "PUT" ? `/brgy/residents/${data.id}/` : "/brgy/residents/";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchResidents(); // Refresh the list
        createHouseholdForm.reset(); // Clear the form after successful save
        document.getElementById("formErrorMessage").classList.add("d-none");
        modalInstance.hide(); // Hide the modal on successful submission
      } else {
        const errorMsg = await response.json();
        document.getElementById("formErrorMessage").textContent =
          errorMsg.error || "Failed to save resident.";
        document.getElementById("formErrorMessage").classList.remove("d-none");
      }
    } catch (error) {
      console.error("Error saving resident:", error);
    }
  });

  // Handle delete confirmation
  confirmDeleteBtn.addEventListener("click", async () => {
    const residentId = confirmDeleteBtn.dataset.residentId;
    try {
      const response = await fetch(`/brgy/residents/${residentId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        fetchResidents(); // Refresh the list
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
        modal.hide();
      } else {
        console.error("Failed to delete resident");
      }
    } catch (error) {
      console.error("Error deleting resident:", error);
    }
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
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login/";
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
    const table = document.createElement("table");
    table.classList.add("table", "table-hover");

    table.innerHTML = `
      <thead>
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Civil Status</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
          ${residents
            .map(
              (resident) => `
              <tr>
                  <td>${resident.id}</td>
                  <td>${resident.first_name} ${resident.middle_name} ${resident.last_name}</td>
                  <td>${resident.birth_date}</td>
                  <td>${resident.gender}</td>
                  <td>${resident.civil_status}</td>
                  <td>${resident.contact_number}</td>
                  <td>${resident.address}</td>
                  <td>
                    <i class="fas fa-edit edit-icon" data-id="${resident.id}"></i>
                    <i class="fas fa-trash delete-icon" data-id="${resident.id}"></i>
                  </td>
              </tr>
          `
            )
            .join("")}
      </tbody>
    `;

    residentsList.innerHTML = "";
    residentsList.appendChild(table);

    // Add event listeners for edit and delete buttons
    residents.forEach((resident) => {
      const editIcon = document.querySelector(`.edit-icon[data-id="${resident.id}"]`);
      const deleteIcon = document.querySelector(`.delete-icon[data-id="${resident.id}"]`);

      if (editIcon) {
        editIcon.addEventListener("click", () => {
          setFormMethod("PUT");
          populateForm(resident);
          modalInstance.show();
        });
      }

      if (deleteIcon) {
        deleteIcon.addEventListener("click", () => {
          confirmDeleteBtn.dataset.residentId = resident.id;
          const modal = new bootstrap.Modal(document.getElementById("deleteConfirmationModal"));
          modal.show();
        });
      }
    });
  }

  function populateForm(resident) {
    document.getElementById("residentId").value = resident.id;
    document.getElementById("firstName").value = resident.first_name;
    document.getElementById("middleName").value = resident.middle_name;
    document.getElementById("lastName").value = resident.last_name;
    document.getElementById("birthDate").value = resident.birth_date;
    document.getElementById("gender").value = resident.gender;
    document.getElementById("civilStatus").value = resident.civil_status;
    document.getElementById("contactNumber").value = resident.contact_number;
    document.getElementById("address").value = resident.address;
  }
});
