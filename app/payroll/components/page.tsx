import AddComponent from "./AddComponent";
import ComponentTable from "./component-table";

export default function PayrollComponents() {
  return (
    <div className="w-full p-4">
      <h1>Payroll Components</h1>
      <div className="mt-8">
        <ComponentTable />
        <AddComponent />
      </div>
    </div>
  );
}
