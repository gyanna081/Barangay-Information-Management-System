document.addEventListener("DOMContentLoaded", () => {
  const personnelContainer = document.getElementById("personnelContainer");

  const fetchPersonnel = async () => {
    try {
      const response = await fetch("/brgy/personnel/");
      if (!response.ok) {
        throw new Error("Failed to fetch personnel");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching personnel:", error);
      personnelContainer.innerHTML =
        '<div class="alert alert-danger" role="alert">Failed to load personnel data.</div>';
    }
  };

  const renderPersonnel = (personnel) => {
    if (personnel.length === 0) {
      personnelContainer.innerHTML = "<p>No personnel found.</p>";
      return;
    }

    const table = document.createElement("table");
    table.className = "table table-striped table-hover glass-effect shadow-lg";
    table.innerHTML = `
      <thead>
        <tr class="text-center">
          <th>ID</th>
          <th>Name</th>
          <th>Position</th>
          <th>Contact Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${personnel
          .map(
            (person) => `
          <tr class="text-center">
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.position}</td>
            <td>${person.contact_number}</td>
            <td>
              <i class="fas fa-edit me-2 edit-personnel" data-personnel='${JSON.stringify(
                person
              )}' style="color: #28a745;" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Personnel"></i>
              <i class="fas fa-trash delete-personnel" data-personnel-id="${
                person.id
              }" style="color: #dc3545;" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Personnel"></i>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    `;

    personnelContainer.innerHTML = "";
    personnelContainer.appendChild(table);

    document.querySelectorAll(".edit-personnel").forEach((icon) => {
      icon.addEventListener("click", handleEditClick);
    });

    document.querySelectorAll(".delete-personnel").forEach((icon) => {
      icon.addEventListener("click", handleDeleteClick);
    });

    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  };

  const handleEditClick = (event) => {
    const person = JSON.parse(event.target.getAttribute("data-personnel"));

    document.getElementById("name").value = person.name;
    document.getElementById("position").value = person.position;
    document.getElementById("contactNumber").value = person.contact_number;

    document.getElementById("createPersonnelModalLabel").textContent =
      "Edit Personnel";
    document.querySelector(
      '#createPersonnelForm button[type="submit"]'
    ).textContent = "Update";

    document
      .getElementById("createPersonnelForm")
      .setAttribute("data-personnel-id", person.id);

    const modal = new bootstrap.Modal(
      document.getElementById("createPersonnelModal")
    );
    modal.show();
  };

  const handleDeleteClick = (event) => {
    const personnelId = event.target.getAttribute("data-personnel-id");
    document
      .getElementById("confirmDeleteBtn")
      .setAttribute("data-personnel-id", personnelId);
    const modal = new bootstrap.Modal(
      document.getElementById("deleteConfirmationModal")
    );
    modal.show();
  };

  const deletePersonnel = async (personnelId) => {
    try {
      const response = await fetch(`/brgy/personnel/${personnelId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete personnel");
      }

      alert("Personnel deleted successfully");
      fetchPersonnel().then(renderPersonnel);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", (event) => {
      const personnelId = event.target.getAttribute("data-personnel-id");
      deletePersonnel(personnelId);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteConfirmationModal")
      );
      modal.hide();
    });

  fetchPersonnel().then(renderPersonnel);
});

document
  .getElementById("createPersonnelForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const personnelId = event.target.getAttribute("data-personnel-id");

    const url = personnelId
      ? `/brgy/personnel/${personnelId}/`
      : "/brgy/personnel/";
    const method = personnelId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          position: position,
          contact_number: contactNumber,
        }),
      });

      if (!response.ok) {
        throw new Error(
          personnelId
            ? "Failed to update personnel"
            : "Failed to create personnel"
        );
      }

      alert(
        personnelId
          ? "Personnel updated successfully"
          : "Personnel created successfully"
      );
      location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  });

document
  .getElementById("createPersonnelModal")
  .addEventListener("hidden.bs.modal", (event) => {
    document.getElementById("createPersonnelModalLabel").textContent =
      "Create Personnel";
    document.querySelector(
      '#createPersonnelForm button[type="submit"]'
    ).textContent = "Submit";
    document
      .getElementById("createPersonnelForm")
      .removeAttribute("data-personnel-id");
    document.getElementById("createPersonnelForm").reset();
  });

const printPersonnelData = () => {
  const printWindow = window.open("", "_blank");
  const personnelTable = document
    .querySelector("#personnelContainer table")
    .cloneNode(true);

  const headers = personnelTable.querySelectorAll("th");
  const rows = personnelTable.querySelectorAll("tbody tr");
  headers[headers.length - 1].remove();
  rows.forEach((row) => row.deleteCell(-1));

  const printContent = `
    <html>
      <head>
        <title>Personnel Data</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h3>Personnel Table</h3>
        ${personnelTable.outerHTML}
      </body>
    </html>
  `;

  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
};

document
  .getElementById("printRecordBtn")
  .addEventListener("click", printPersonnelData);
