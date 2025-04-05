import { EmployeeForm } from "./employee-form";

export default function NewEmployeePage() {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        <div className="flex-default">
          <h2>Add New Employee</h2>
        </div>
        <div className="max-w-2xl">
          <EmployeeForm />
        </div>
      </div>
    </div>
  );
}
