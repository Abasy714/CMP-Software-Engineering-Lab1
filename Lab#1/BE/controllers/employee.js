const employee = [{ id: "1", name: "Mohamed Sayed" }];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const index = employee.findIndex((emp) => emp.id === id);
  if (index === -1) {
    console.log("Employee not found");
    return res.status(404).json({ message: "Employee not found" });
  }
  employee.splice(index, 1);
  res.status(200).json({ message: "Employee deleted successfully" });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  if (!id || !name) {
    console.log("ID and name are required");
    return res.status(400).json({ message: "ID and name are required" });
  }
  const existingEmployee = employee.find((emp) => emp.id === id);
  if (existingEmployee) {
    console.log("Employee with this ID already exists");
    return res
      .status(400)
      .json({ message: "Employee with this ID already exists" });
  }
  const newEmployee = { id, name };
  employee.push(newEmployee);
  res
    .status(201)
    .json({ message: "Employee created successfully", data: newEmployee });
};

// TODO
exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params;

  let employeeToUpdate = employee.find((emp) => emp.id === id);

  if (!employeeToUpdate) {
    console.log("Employee not found");
    return res.status(404).json({ message: "Employee not found" });
  }

  const { name } = req.body;
  if (!name) {
    console.log("Name is required");
    return res.status(400).json({ message: "Name is required" });
  }

  employeeToUpdate.name = name;
  res
    .status(200)
    .json({ message: "Employee updated successfully", data: employeeToUpdate });
};
