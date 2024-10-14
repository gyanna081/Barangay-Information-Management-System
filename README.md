# Barangay Information Management System Features

1. Resident Management (`Person`)
   - Add/Update/Delete Resident Profiles: Manage the `Person` entity, capturing details like `Person_ID`, `Gender`, `IsSoloParent`, `IsSeniorCitizen`.
   - Resident Search and Filtering: Search residents based on personal attributes such as `Gender` or their special statuses (e.g., `IsSoloParent`).
   - Link Residents to Households: A `Person` can be assigned as the `HouseholdHead_ID` in the `Household` entity, linking individuals to their respective households.

2. Household Management (`Household`)
   - Add/Update/Delete Households: Manage the `Household` entity with details like `Household_ID`, `Address`, and `numberOfMembers`.
   - Link Household Members: Each household can link to multiple `Person` records through relationships.

3. Barangay Officials and Staff Management (`Official`)
   - Add/Update/Delete Barangay Officials: Manage the `Official` entity, capturing details like `Official_ID`, `Name`, `Position`, and the official’s term duration (`termStart`, `termEnd`).

4. Incident and Case Reporting (`Complaints`, `Blotter`)
   - Report Incidents: Use the `Complaints` and `Blotter` entities to track incidents with fields such as `dateFiled`, `IncidentDate`, `complaintDetails`, `IncidentDetails`, and `Status`.
   - Case Status Tracking: Monitor the `Status` of incidents in both the `Complaints` and `Blotter` tables.

5. Barangay Events Management (`Events`)
   - Add/Update/Delete Events: Manage the `Events` entity, with fields like `eventName`, `Date`, `Location`, and details.
   - Event Notifications: Residents or barangay officials can be notified about upcoming events based on records stored in this table.

6. Document Management (`Clearances`)
   - Generate Barangay Clearances: The `Clearances` entity captures details such as `Clearance_ID`, `Name`, `DateOfBirth`, and `Gender` to issue and manage various barangay clearances.
   - Track Issuance: Use the table to monitor when and to whom clearances are issued.

7. Business Permits and Management (`Businesses`)
   - Add/Update/Delete Business Information: Manage the `Businesses` entity, tracking `BusinessID`, `BusinessName`, `Type`, `PermitNumber`, and `DateIssued` to handle business registration and permit issuance.

8. Population Management (`Barangay`)
   - Add/Update/Delete Barangay Information: Manage general barangay information in the `Barangay` entity, capturing details like `Barangay_ID`, `Name`, `Address`, and `Population`.

9. Security and Access Control
   - User Authentication: Though not explicitly shown in the ERD, implement user roles (e.g., admin, staff) to ensure restricted access to sensitive operations such as adding officials or processing cases.

10. Audit and Logs
    - Activity Logs: Implement a mechanism to track changes made across entities like `Complaints`, `Blotter`, `Clearances`, and `Businesses` to ensure traceability and accountability.

11. Reports and Analytics
    - Generate Reports: Use data from tables like `Person`, `Household`, `Blotter`, `Businesses`, and `Clearances` to generate detailed reports and statistics (e.g., total population, household count, businesses registered).

## Links

- Gantt Chart: [Gantt Chart Link](https://cebuinstituteoftechnology-my.sharepoint.com/:x:/g/personal/geannaricci_pacana_cit_edu/Ef_6t0V0L5xIrbo-nFWUYRwBE-ALFo-Mt81vwhgoaGq4Kw?e=8UCLja)
- ERD: [ERD Link](https://www.figma.com/design/cGeJra3y2jRemYDJfZQise/System-UI%2FUX?node-id=0-1&t=oQljJVm1HXEpktex-1)
- UI/UX Design: [UI/UX Design Link](https://lucid.app/lucidchart/12304d27-045f-4494-a284-0830d7ddd8ae/edit?viewport_loc=718%2C144%2C1233%2C631%2C0_0&invitationId=inv_12ac53d9-1b79-44bb-a6d1-d866e6a50d95)
