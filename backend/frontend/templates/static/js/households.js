document.addEventListener('DOMContentLoaded', () => {
  const householdContainer = document.querySelector('.card-body')

  // Function to fetch household data
  const fetchHouseholds = async () => {
    try {
      const response = await fetch('/brgy/households/') // Adjust this URL to match your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch households')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching households:', error)
      householdContainer.innerHTML =
        '<div class="alert alert-danger" role="alert">Failed to load household data.</div>'
    }
  }

  // Function to render household data
  const renderHouseholds = (households) => {
    if (households.length === 0) {
      householdContainer.innerHTML = '<p>No households found.</p>'
      return
    }

    const table = document.createElement('table')
    table.className = 'table table-striped'
    table.innerHTML = `
      <thead>
        <tr>
        <th>ID</th>
          <th>Household ID</th>
          <th>Address</th>
          <th>Number of Members</th>
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
          </tr>
        `
          )
          .join('')}
      </tbody>
    `

    householdContainer.innerHTML = ''
    householdContainer.appendChild(table)
  }

  // Fetch and render households
  fetchHouseholds().then(renderHouseholds)
})


document.getElementById('createHouseholdForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const householdNumber = document.getElementById('householdNumber').value;
    const householdHead = document.getElementById('householdHead').value;
    const numberOfMembers = document.getElementById('numberOfMembers').value;

    try {
      const response = await fetch('/brgy/households/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          household_number: householdNumber,
          household_head: householdHead,
          number_of_members: numberOfMembers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create household');
      }

      alert('Household created successfully');
      location.reload();
    } catch (error) {
      console.error('Error creating household:', error);
      alert('Failed to create household');
    }
  });