import {
  Employee,
  EmployeeSalaryStructure,
  PayComponent,
  PayrollRecord,
  PayrollRun,
  SalaryStructure,
} from "@prisma/client";

export interface EmployeeComponent extends PayComponent {
  [x: string]: any;
  baseComponent?: PayComponent;
  calculatedAmount?: number;
}

export interface EmployeeWithDetails extends Employee {
  salaryStructures: EmployeeSalaryStructureWithDetails[];
}

export interface EmployeeSalaryStructureWithDetails
  extends EmployeeSalaryStructure {
  salaryStructure: SalaryStructure & {
    components: EmployeeComponent[];
  };
}

export interface PayrunWithDetails extends PayrollRun {
  PayrollRecord: PayrollRecord[];
}
