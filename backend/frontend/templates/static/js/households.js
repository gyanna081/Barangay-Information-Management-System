document.addEventListener("DOMContentLoaded", () => {
  const householdContainer = document.querySelector('.card-body');

  // Function to fetch household data
  const fetchHouseholds = async () => {
    try {
      const response = await fetch('/api/households/'); // Adjust this URL to match your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch households');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching households:', error);
      householdContainer.innerHTML = '<div class="alert alert-danger" role="alert">Failed to load household data.</div>';
    }
  };

  // Function to render household data
  const renderHouseholds = (households) => {
    if (households.length === 0) {
      householdContainer.innerHTML = '<p>No households found.</p>';
      return;
    }

    const table = document.createElement('table');
    table.className = 'table table-striped';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Household ID</th>
          <th>Address</th>
          <th>Number of Members</th>
        </tr>
      </thead>
      <tbody>
        ${households.map(household => `
          <tr>
            <td>${household.id}</td>
            <td>${household.address}</td>
            <td>${household.members_count}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    householdContainer.innerHTML = '';
    householdContainer.appendChild(table);
  };

  // Fetch and render households
  fetchHouseholds().then(renderHouseholds);
});
