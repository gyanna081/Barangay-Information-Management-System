document.addEventListener("DOMContentLoaded", () => {
  const householdContainer = document.querySelector(".card-body");

  const fetchHouseholds = async () => {
    try {
      const response = await fetch("/brgy/households/");
      if (!response.ok) {
        throw new Error("Failed to fetch households");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching households:", error);
      householdContainer.innerHTML =
        '<div class="alert alert-danger" role="alert">Failed to load household data.</div>';
    }
  };

  const renderHouseholds = (households) => {
    if (households.length === 0) {
      householdContainer.innerHTML = "<p>No households found.</p>";
      return;
    }

    const table = document.createElement("table");
    table.className = "table table-striped";
    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Household ID</th>
          <th>Address</th>
          <th>Number of Members</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${households
          .map(
            (household) => `
          <tr>
            <td>${household.id}</td>
            <td>${household.household_number}</td>
            <td>${household.household_head}</td>
            <td>${household.number_of_members}</td>
            <td>
              <i class="fas fa-edit me-2 edit-household" data-household='${JSON.stringify(
                household
              )}'></i>
              <i class="fas fa-trash delete-household" data-household-id="${
                household.id
              }"></i>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    `;

    householdContainer.innerHTML = "";
    householdContainer.appendChild(table);

    document.querySelectorAll(".edit-household").forEach((icon) => {
      icon.addEventListener("click", handleEditClick);
    });

    document.querySelectorAll(".delete-household").forEach((icon) => {
      icon.addEventListener("click", handleDeleteClick);
    });
  };

  const handleEditClick = (event) => {
    const household = JSON.parse(event.target.getAttribute("data-household"));

    document.getElementById("householdNumber").value =
      household.household_number;
    document.getElementById("householdHead").value = household.household_head;
    document.getElementById("numberOfMembers").value =
      household.number_of_members;

    document.getElementById("createHouseholdModalLabel").textContent =
      "Edit Household";
    document.querySelector(
      '#createHouseholdForm button[type="submit"]'
    ).textContent = "Update";

    document
      .getElementById("createHouseholdForm")
      .setAttribute("data-household-id", household.id);

    const modal = new bootstrap.Modal(
      document.getElementById("createHouseholdModal")
    );
    modal.show();
  };

  const handleDeleteClick = (event) => {
    const householdId = event.target.getAttribute("data-household-id");
    document
      .getElementById("confirmDeleteBtn")
      .setAttribute("data-household-id", householdId);
    const modal = new bootstrap.Modal(
      document.getElementById("deleteConfirmationModal")
    );
    modal.show();
  };

  const deleteHousehold = async (householdId) => {
    try {
      const response = await fetch(`/brgy/households/${householdId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete household");
      }

      alert("Household deleted successfully");
      fetchHouseholds().then(renderHouseholds);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", (event) => {
      const householdId = event.target.getAttribute("data-household-id");
      deleteHousehold(householdId);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteConfirmationModal")
      );
      modal.hide();
    });

  fetchHouseholds().then(renderHouseholds);
});

document
  .getElementById("createHouseholdForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const householdNumber = document.getElementById("householdNumber").value;
    const householdHead = document.getElementById("householdHead").value;
    const numberOfMembers = document.getElementById("numberOfMembers").value;
    const householdId = event.target.getAttribute("data-household-id");

    const url = householdId
      ? `/brgy/households/${householdId}/`
      : "/brgy/households/";
    const method = householdId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          household_number: householdNumber,
          household_head: householdHead,
          number_of_members: numberOfMembers,
        }),
      });

      if (!response.ok) {
        throw new Error(
          householdId
            ? "Failed to update household"
            : "Failed to create household"
        );
      }

      alert(
        householdId
          ? "Household updated successfully"
          : "Household created successfully"
      );
      location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  });

document
  .getElementById("createHouseholdModal")
  .addEventListener("hidden.bs.modal", (event) => {
    document.getElementById("createHouseholdModalLabel").textContent =
      "Create Household";
    document.querySelector(
      '#createHouseholdForm button[type="submit"]'
    ).textContent = "Submit";
    document
      .getElementById("createHouseholdForm")
      .removeAttribute("data-household-id");
    document.getElementById("createHouseholdForm").reset();
  });
