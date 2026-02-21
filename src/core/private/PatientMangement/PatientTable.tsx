import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Patient } from "@/core/private/PatientMangement/type.ts";
import { useGetPatient, useDeletePatient } from "@/components/ApiCall/Api";
import { Button } from "@/components/ui/button";
import Table, { Column } from "@/components/ui/table";

const dobFromRow = (row: Patient) =>
  (row.date_of_birth ?? row.dob) ?? "";

/** Display DOB and/or Age in one cell: "DOB · Age" or whichever is available */
function formatDobAge(row: Patient): string {
  const dob = dobFromRow(row);
  const hasDob = dob !== "" && String(dob).trim() !== "";
  const numAge = row.age;
  const hasAge =
    numAge != null && typeof numAge === "number" && !isNaN(numAge) && numAge >= 0;
  if (hasDob && hasAge) return `${dob} · ${numAge} yr`;
  if (hasDob) return String(dob);
  if (hasAge) return `${numAge} yr`;
  return "—";
}

function formatGender(gender: "M" | "F" | undefined | null): string {
  if (gender === "M") return "Male";
  if (gender === "F") return "Female";
  return gender ?? "—";
}

const PatientTable = () => {
  const navigate = useNavigate();
  const { data, refetch } = useGetPatient();
  const deletePatient = useDeletePatient();

  const handleAddPatient = () => {
    navigate("/patient-management/add");
  };

  const handleEditPatient = (row: Patient) => {
    if (row.id != null) navigate(`/patient-management/edit/${row.id}`);
  };

  const handleDeletePatient = (row: Patient) => {
    if (row.id == null) return;
    deletePatient.mutate({ id: row.id } as any, {
      onSuccess: () => refetch(),
    });
  };

  const columns: Column<Patient>[] = useMemo(
    () => [
      { header: "Full Name", accessor: "full_name" },
      { header: "Email", accessor: "email" },
      { header: "Phone", accessor: "phone" },
      { header: "Gender", accessor: (row) => formatGender(row.gender) },
      { header: "Blood Group", accessor: "blood_group" },
      {
        header: "DOB / Age",
        accessor: (row) => formatDobAge(row),
      },
      { header: "Address", accessor: "address" },
    ],
    [],
  );

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Patient Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage patients in the system
          </p>
        </div>
        <Button onClick={handleAddPatient}>Add Patient</Button>
      </div>

      <Table
        data={(data?.data || []).filter((p): p is Patient & { id: number } => p.id != null)}
        columns={columns}
        fitToViewport={true}
        onDelete={handleDeletePatient}
        onEdit={handleEditPatient}
      />
    </div>
  );
};

export default PatientTable;
