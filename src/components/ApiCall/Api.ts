import {UserGet} from "@/core/private/UserManagement/StaffManagement/staffTypes";
import {API_ENDPOINTS} from "../constants/ApiEndpoints/apiEndpoints";
import {UserData} from "../ContextApi/AuthContext";
import {useApiGet} from "./ApiGet";
import {useApiMutation} from "./ApiMutation";
import {PermissionApiItem, RoleResponse} from "@/core/private/UserManagement/RoleManagement/roleTypes.ts";
import {Patient} from "@/core/private/PatientMangement/type.ts";
import { Clinic, Doctor } from "@/core/private/Patient/MyAppointments/appointmentTypes";
import { PatientProfileResponse } from "@/core/private/Patient/Profile/profileTypes";
import { StaffProfileResponse } from "@/core/private/Profile/staffProfileTypes";
import { AppointmentTypeEnum } from "@/enums/AppointmentEnum";

export type ApiListResponse<T> = {
    statusCode: number;
    message: string;
    data: T[];
};

export type ApiPaginatedResponse<T> = {
    statusCode: number;
    message: string;
    data: {
        data: T[];
        pagination?: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        };
        total?: number; // Fallback for different API structures
        page?: number;
        limit?: number;
    };
};

export type ApiSingleResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};

export const useGetInit = () => {
    return useApiGet<ApiListResponse<UserData>>("/api/init", {
        retry: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};
export const useGetStaff = () =>
    useApiGet<ApiListResponse<UserGet>>(API_ENDPOINTS.STAFF.GET_STAFF, {
        retry: 0
    });

export const useCreateUser = () =>
    useApiMutation("post", API_ENDPOINTS.STAFF.ADD_STAFF);
export const useUpdateUser = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.STAFF.UPDATE_STAFF(id));
export const useGetRole = () =>
    useApiGet<ApiListResponse<RoleResponse>>(API_ENDPOINTS.ROLE.GET_Role)
export const useAddRole = () =>
    useApiMutation("post", API_ENDPOINTS.ROLE.ADD_ROLE);
export const useUpdateRole = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.ROLE.UPDATE_ROLE(id));
export const useGetPermissions = (id: string | number | undefined) =>
    useApiGet<ApiListResponse<PermissionApiItem>>(API_ENDPOINTS.ROLE.GET_PERMISSIONS(id));
export const useUpdatePermissions = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.ROLE.UPDATE_PERMISSIONS(id));
export const useGetClinic = () =>
    useApiGet<ApiListResponse<Clinic>>(API_ENDPOINTS.CLINIC.GET_CLINIC);
export const useUpdateClinic = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.CLINIC.UPDATE_CLINIC(id))
export const useDeleteClinic = (id: string | number | undefined) =>
    useApiMutation("delete", API_ENDPOINTS.CLINIC.DELETE_CLINIC(id))
export const useAddClinic = () =>
    useApiMutation("post", API_ENDPOINTS.CLINIC.ADD_CLINIC)
export const useGetDoctor = (id: string | number | undefined) =>
    useApiGet<ApiListResponse<Doctor>>(API_ENDPOINTS.DOCTOR.GET_DOCTOR, {
        queryParams: {departmentId: id},
        enabled: !!id,

    });
export const useAddDoctor = () =>
    useApiMutation("post", API_ENDPOINTS.DOCTOR.ADD_DOCTOR);
export const useUpdateDoctor = (id: string | number | undefined,) =>
    useApiMutation("put", API_ENDPOINTS.DOCTOR.UPDATE_DOCTOR(id))
export const useGetDoctorById = (id: string | number | undefined) =>
    useApiGet(API_ENDPOINTS.DOCTOR.GET_DOCTOR_BY_ID(id))
export const useDeleteDoctor = (doctorId: string | number | undefined, departmentId: string | number | undefined) =>
    useApiMutation("delete", API_ENDPOINTS.DOCTOR.DELETE_DOCTOR(doctorId, departmentId))

export const useAddDepartment = () =>
    useApiMutation("post", API_ENDPOINTS.DEPARTMENT.ADD_DEPARTMENT);

export const useGetDepartment = (id: string | number | undefined) =>
    useApiGet(API_ENDPOINTS.DEPARTMENT.GET_DEPARTMENT, {
        queryParams: {clinicId: id},
        enabled: !!id,
    });
export const useUpdateDepartment = (departmentId: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.DEPARTMENT.UPDATE_DEPARTMENT(departmentId))
export const useGetDepartmentById = (id: string | number | undefined) =>
    useApiGet(API_ENDPOINTS.DEPARTMENT.GET_DEPARTMENT_BY_ID(id))
export const useDeleteDepartment = (id: string | number | undefined) =>
    useApiMutation("delete", API_ENDPOINTS.DEPARTMENT.DELETE_DEPARTMENT(id))

// Patient API Hooks
export const useAddPatient = () =>
    useApiMutation("post", API_ENDPOINTS.PATIENT.ADD_PATIENT);

export const useGetPatient = () =>
    useApiGet<ApiListResponse<Patient>>(API_ENDPOINTS.PATIENT.GET_PATIENT);

export const useGetPatientById = (id: string | number | undefined) =>
    useApiGet<ApiSingleResponse<Patient>>(API_ENDPOINTS.PATIENT.GET_PATIENT_BY_ID(id), {
        enabled: !!id
    });

export const useUpdatePatient = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.PATIENT.UPDATE_PATIENT(id));

export const useDeletePatient = (id?: string | number | undefined) =>
    useApiMutation(
        "delete",
        id != null ? API_ENDPOINTS.PATIENT.DELETE_PATIENT(id) : API_ENDPOINTS.PATIENT.DELETE_PATIENT_BASE,
    );
export const useGetDoctorShift = (doctorId: string | number | undefined, departmentId: string | undefined | number) =>
    useApiGet(API_ENDPOINTS.DOCTOR_SHIFT.GET_DOCTOR_SHIFT(doctorId, departmentId),{
        retry:0,
        enabled:!!doctorId &&!!departmentId,
    })
export const useSaveDoctorShift = (doctorId: string | number | undefined, departmentId: string | undefined | number) =>
    useApiMutation("put", API_ENDPOINTS.DOCTOR_SHIFT.ADD_DOCTOR_SHIFT(doctorId, departmentId))
// Book appointment (POST)
export const useBookAppointment = () =>
    useApiMutation("post", API_ENDPOINTS.APPOINTMENT.BOOK);
export const useAddAppointment = () => useBookAppointment();

// Update appointment (PUT)
export const useUpdateAppointment = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.APPOINTMENT.UPDATE(id));

// Approve / Reject / Reschedule / Follow-up (PUT with body)
export const useApproveAppointment = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.APPOINTMENT.APPROVE(id));
export const useRejectAppointment = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.APPOINTMENT.REJECT(id));
export const useRescheduleAppointment = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.APPOINTMENT.RESCHEDULE(id));
export const useFollowUpAppointment = (id: string | number | undefined) =>
    useApiMutation("post", API_ENDPOINTS.APPOINTMENT.FOLLOW_UP(id));

// Check-in, Start, Complete, Cancel, No-show (PUT, no body)
export const useCheckInAppointment = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.APPOINTMENT.CHECK_IN(id));
export const useStartAppointment = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.APPOINTMENT.START(id));
export const useCompleteAppointment = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.APPOINTMENT.COMPLETE(id));
export const useCancelAppointment = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.APPOINTMENT.CANCEL(id));
export const useNoShowAppointment = (id: string | number | undefined) =>
    useApiMutation("put", API_ENDPOINTS.APPOINTMENT.NO_SHOW(id));

// GET live appointments (queue + waiting time). Set enabled only after applying filters.
export const useGetLiveAppointments = (
    clinic_id?: string | number,
    department_id?: string | number,
    doctor_id?: string | number,
    enabled?: boolean
) =>
    useApiGet<ApiListResponse<any>>(API_ENDPOINTS.APPOINTMENT.LIVE, {
        queryParams: {
            clinic_id: clinic_id ?? "",
            department_id: department_id ?? "",
            doctor_id: doctor_id ?? "",
        },
        enabled: enabled === true,
    });

// Upcoming API only allows status: REQUESTED | BOOKED | REJECTED. Omit status when empty or invalid.
const UPCOMING_ALLOWED_STATUSES = ["REQUESTED", "BOOKED", "REJECTED"] as const;

// GET upcoming appointments (paginated, filters). Set enabled only after applying filters.
export const useGetUpcomingAppointments = (params: {
    date_from?: string;
    date_to?: string;
    status?: string;
    clinic_id?: string | number;
    department_id?: string | number;
    doctor_id?: string | number;
    appointment_type?: string;
    patient_name?: string;
    page?: number;
    limit?: number;
    enabled?: boolean;
}) => {
    const validStatus =
        params.status && UPCOMING_ALLOWED_STATUSES.includes(params.status as any)
            ? params.status
            : undefined;
    const validAppointmentType =
        params.appointment_type &&
        Object.values(AppointmentTypeEnum).includes(params.appointment_type as any)
            ? params.appointment_type
            : undefined;
    return useApiGet<ApiPaginatedResponse<any>>(API_ENDPOINTS.APPOINTMENT.UPCOMING, {
        queryParams: {
            date_from: params.date_from ?? "",
            date_to: params.date_to ?? "",
            ...(validStatus != null ? { status: validStatus } : {}),
            clinic_id: params.clinic_id ?? "",
            department_id: params.department_id ?? "",
            doctor_id: params.doctor_id ?? "",
            ...(validAppointmentType != null ? { appointment_type: validAppointmentType } : {}),
            patient_name: params.patient_name ?? "",
            page: params.page ?? 1,
            limit: params.limit ?? 10,
        },
        enabled: params.enabled === true,
    });
};

// GET appointment history (paginated, filters). Set enabled only after applying filters.
export const useGetAppointmentHistory = (
    date_from?: string,
    date_to?: string,
    clinic_id?: string | number,
    department_id?: string | number,
    doctor_id?: string | number,
    appointment_type?: string,
    patient_name?: string,
    status?: string,
    page?: number,
    limit?: number,
    enabled?: boolean
) =>
    useApiGet<ApiPaginatedResponse<any>>(API_ENDPOINTS.APPOINTMENT.HISTORY, {
        queryParams: {
            date_from: date_from ?? "",
            date_to: date_to ?? "",
            clinic_id: clinic_id ?? "",
            department_id: department_id ?? "",
            doctor_id: doctor_id ?? "",
            appointment_type: appointment_type ?? "",
            patient_name: patient_name ?? "",
            status: status ?? "",
            page: page ?? 1,
            limit: limit ?? 10,
        },
        retry: 0,
        enabled: enabled === true,
    });

// Patient Appointment Hooks
export const useGetPatientClinics = () =>
    useApiGet<ApiListResponse<any>>(API_ENDPOINTS.PATIENT.GET_CLINICS);

export const useGetPatientDoctors = (clinicId: number | null, date: string | null) =>
    useApiGet<ApiListResponse<any>>(
        clinicId && date 
            ? API_ENDPOINTS.PATIENT.GET_DOCTORS(clinicId, date)
            : "",
        {
            enabled: !!clinicId && !!date,
            retry: 0,
        }
    );

export const useBookPatientAppointment = () =>
    useApiMutation("post", API_ENDPOINTS.PATIENT.BOOK_APPOINTMENT);

export const useGetPatientLiveAppointment = () =>
    useApiGet<ApiSingleResponse<any>>(API_ENDPOINTS.PATIENT.GET_LIVE_APPOINTMENT, {
        retry: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

export const useGetPatientUpcomingAppointments = (status: "REQUESTED" | "BOOKED") =>
    useApiGet<ApiListResponse<any>>(API_ENDPOINTS.PATIENT.GET_UPCOMING_APPOINTMENTS(status), {
        retry: 0,
        refetchOnMount: true,
    });

export const useGetPatientAppointmentHistory = (
    date_from?: string,
    date_to?: string,
    status?: string,
    page?: number,
    limit?: number,
    enabled: boolean = true
) =>
    useApiGet<ApiPaginatedResponse<any>>(API_ENDPOINTS.PATIENT.GET_APPOINTMENT_HISTORY, {
        queryParams: {
            date_from,
            date_to,
            status,
            page: page ?? 1,
            limit: limit ?? 10,
        },
        enabled: enabled && !!date_from && !!date_to,
        retry: 0,
    });

// Patient Profile
export const useGetPatientProfile = () =>
    useApiGet<ApiSingleResponse<PatientProfileResponse>>(API_ENDPOINTS.PATIENT.GET_PROFILE, {
        retry: 0,
        refetchOnMount: true,
    });

export const useUpdatePatientProfile = () =>
    useApiMutation("put", API_ENDPOINTS.PATIENT.UPDATE_PROFILE);

export const useChangePatientPassword = () =>
    useApiMutation("post", API_ENDPOINTS.PATIENT.CHANGE_PASSWORD);

// Common Profile API (Staff / Superadmin) – GET & PUT /api/profile, POST change-password
export const useGetProfile = () =>
    useApiGet<ApiSingleResponse<StaffProfileResponse>>(API_ENDPOINTS.PROFILE.GET, {
        retry: 0,
        refetchOnMount: true,
    });

export const useUpdateProfile = () =>
    useApiMutation("put", API_ENDPOINTS.PROFILE.UPDATE);

export const useChangeProfilePassword = () =>
    useApiMutation("post", API_ENDPOINTS.PROFILE.CHANGE_PASSWORD);