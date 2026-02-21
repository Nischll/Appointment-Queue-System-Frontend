import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
    useGetClinic,
    useGetDepartment,
    useGetDoctor,
} from "@/components/ApiCall/Api";
import { Label } from "@/components/ui/label";

/**
 * Cascading filter: only Clinic API on load.
 * Department API runs only after user selects a clinic.
 * Doctor API runs only after user selects a department.
 */
const AppointmentFilter = () => {
    const { register, control, setValue } = useFormContext();

    const clinicId = useWatch({ control, name: "clinicId" });
    const departmentId = useWatch({ control, name: "departmentId" });

    // Clinic: always fetched on mount
    const { data: clinicData } = useGetClinic();
    // Department: only when clinic is selected
    const { data: departmentData } = useGetDepartment(clinicId);
    // Doctor: only when department is selected
    const { data: doctorData } = useGetDoctor(departmentId);

    // Clear department and doctor whenever clinic selection changes
    useEffect(() => {
        setValue("departmentId", "");
        setValue("doctorId", "");
    }, [clinicId, setValue]);

    // Clear doctor whenever department selection changes
    useEffect(() => {
        setValue("doctorId", "");
    }, [departmentId, setValue]);

    return (
        <>
            {/* Clinic — fetched on load */}
            <div>
                <Label>Clinic</Label>
                <select
                    {...register("clinicId")}
                    className="w-full border rounded-md h-10 px-3"
                >
                    <option value="">Select Clinic</option>
                    {clinicData?.data?.map((clinic: any) => (
                        <option key={clinic.id} value={clinic.id}>
                            {clinic.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Department — fetched only after clinic selected */}
            <div>
                <Label>Department</Label>
                <select
                    {...register("departmentId")}
                    disabled={!clinicId}
                    className="w-full border rounded-md h-10 px-3"
                >
                    <option value="">Select Department</option>
                    {departmentData?.data?.map((dept: any) => (
                        <option key={dept.id} value={dept.id}>
                            {dept.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Doctor — fetched only after department selected */}
            <div>
                <Label>Doctor</Label>
                <select
                    {...register("doctorId")}
                    disabled={!departmentId}
                    className="w-full border rounded-md h-10 px-3"
                >
                    <option value="">Select Doctor</option>
                    {doctorData?.data?.map((doc: any) => (
                        <option key={doc.id} value={doc.id}>
                            {doc.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default AppointmentFilter;
