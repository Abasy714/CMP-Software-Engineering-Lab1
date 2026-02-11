function fetchEmployees() {
  fetch("http://localhost:3000/api/v1/employee")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("dataTable");
      tableBody.innerHTML = "";
      const list = data.data;
      list.forEach((item) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteCell.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
          deleteEmployee(item.id);
        });

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

// TODO
// add event listener to submit button
document.getElementById("employeeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  createEmployee();
});

// TODO
// add event listener to update button
document
  .getElementById("updateEmployeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    updateEmployee();
  });

// TODO
// add event listener to delete button
document.getElementById("dataTable").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const row = e.target.closest("tr");
    const id = row.children[0].textContent;
    deleteEmployee(id);
  }
});

// TODO
function createEmployee() {
  // get data from input field
  // send data to BE
  // call fetchEmployees

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;

  fetch("http://localhost:3000/api/v1/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchEmployees();
    })
    .catch((error) => console.error("Error creating employee:", error));
}

// TODO
function deleteEmployee(id) {
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      fetchEmployees();
    })
    .catch((error) => console.error("Error Deleting Employee", error));
}

// TODO
function updateEmployee() {
  // get data from input field
  // send data to BE
  // call fetchEmployees
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("updateName").value;
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchEmployees();
    })
    .catch((error) => console.error("Error updating employee:", error));
}

fetchEmployees();
