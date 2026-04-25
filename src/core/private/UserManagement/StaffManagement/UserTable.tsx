import { useEffect, useMemo, useState } from "react";
import { User, UserGet } from "./staffTypes";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useCreateUser,
  useGetRole,
  useGetStaff,
  useUpdateUser,
} from "@/components/ApiCall/Api";
import { useGetClinic } from "@/components/ApiCall/Api";
import { Button } from "@/components/ui/button";
import Table, { Column } from "@/components/ui/table";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { NiceSelect, Option } from "@/components/ui/NiceSelect";

const UserTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, refetch } = useGetStaff();
  const { data: role } = useGetRole();
  const { data: clinics } = useGetClinic();
  const [mode, setMode] = useState<"add" | "edit">("add");

  const createUser = useCreateUser();
  const updateUser = useUpdateUser(selectedUser?.id);

  const form = useForm<
    User & {
      clinic_ids: number[];
      phone: string;
      gender: string;
      isActive: boolean;
    }
  >({
    defaultValues: {
      full_name: "",
      email: "",
      role_id: 2,
      isActive: true,
      clinic_ids: [],
      phone: "",
      gender: "M",
    },
  });

  useEffect(() => {
    if (mode === "edit" && selectedUser) {
      form.reset({
        full_name: selectedUser.fullName,
        username: selectedUser.username,
        email: selectedUser.email,
        role_id: selectedUser.roleId,
        isActive: selectedUser.isActive,
        clinic_ids: selectedUser.clinics.map((c) => c.id) || [],
        phone: selectedUser.phone || "",
        gender: selectedUser.gender || "M",
      });
    }
  }, [mode, selectedUser, form]);

  const handleAddUser = () => {
    setMode("add");
    setSelectedUser(null);
    form.reset();
    setIsOpen(true);
  };

  const handleEditUser = (user: any) => {
    setMode("edit");
    setSelectedUser(user);
    setIsOpen(true);
    // console.log(user);
  };

  const generateUsername = (fullName: string) => {
    const firstName = fullName.trim().split(" ")[0];
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `${firstName}${randomNum}`;
  };

  const onSubmit = (data: any) => {
    const payload = {
      full_name: data.full_name,
      email: data.email,
      role_id: data.role_id,
      isActive: data.isActive,
      clinic_ids: data.clinic_ids,
      password: data.password,
      username: data.username,
      phone: data.phone,
      gender: data.gender,
    };

    if (mode === "add") {
      createUser.mutate(payload, {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
          refetch();
        },
      });
    }

    if (mode === "edit" && selectedUser?.id) {
      updateUser.mutate(payload, {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
          setSelectedUser(null);
          refetch();
        },
      });
    }
  };

  const columns: Column<UserGet>[] = useMemo(
    () => [
      { header: "Full Name", accessor: "fullName" },
      { header: "Email", accessor: "email" },
      { header: "Role", accessor: "roleName" },
      {
        header: "Status",
        accessor: (row) => (row.isActive ? "Active" : "Inactive"),
      },
      {
        header: "Clinics",
        accessor: (row) => row.clinics?.map((c) => c.name).join(", ") || "-",
      },
    ],
    [],
  );

  // convert data to NiceSelect options
  const roleOptions: Option<number>[] =
    role?.data?.map((r: any) => ({
      label: r.code,
      value: r.id,
    })) || [];

  const clinicOptions: Option<number>[] =
    clinics?.data?.map((c: any) => ({
      label: c.name,
      value: c.id,
    })) || [];

  const genderOptions: Option<string>[] = [
    { label: "M", value: "M" },
    { label: "F", value: "F" },
  ];

  const statusOptions: Option<boolean>[] = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Staff Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and Manage Staff
          </p>
        </div>
        <Button onClick={handleAddUser}>Add Staff</Button>
      </div>

      <Table
        data={data?.data || []}
        columns={columns}
        onEdit={(row) => handleEditUser(row)}
      />

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            form.reset();
            setSelectedUser(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] min-w-[60vw] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add Staff" : "Update Staff"}
            </DialogTitle>
            <DialogClose />
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="full_name"
                  rules={{ required: "Full name is required",
                    minLength:{
                      value: 4,
                      message: "Full Name must be at least 4 characters are required"
                    },
                    maxLength:{
                      value:50,
                      message:"Full name must be less than 50 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Full name must contain only letters and spaces",
                    },
                   }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                    maxLength: {
                      value: 150,
                      message: "Email must not exceed 150 characters",
                    },
                   }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  rules={{ required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must contain only digits",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be exact 10 digits",
                    },
    
                   }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <Controller
                  control={form.control}
                  name="gender"
                  rules={{ required: "Gender is required" }}
                  render={({ field, fieldState }) => (
                    <NiceSelect
                      {...field}
                      label="Gender"
                      options={genderOptions}
                      value={genderOptions.find((o) => o.value === field.value)}
                      onChange={(val) => field.onChange((val as Option).value)}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  rules={{ required: "Username is required",
                    minLength: {
                      value: 4,
                      message: "Username must be at least 4 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Username must not exceed 30 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Username can only contain letters, numbers, and underscores (no spaces)",
                    },
                   }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {mode === "add" && (
                  <FormField
                    control={form.control}
                    name="password"
                    rules={{ required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      validate: {
                        hasUppercase: (v) =>
                          /[A-Z]/.test(v) ||
                          "Password must contain at least one uppercase letter",
                        hasNumber: (v) =>
                          /[0-9]/.test(v) ||
                          "Password must contain at least one number",
                        hasSpecialChar: (v) =>
                          /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                          "Password must contain at least one special character",
                      },
                     }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Role */}
                <Controller
                  control={form.control}
                  name="role_id"
                  rules={{ required: "Role is required" }}
                  render={({ field, fieldState }) => (
                    <NiceSelect
                      {...field}
                      label="Role"
                      options={roleOptions}
                      value={roleOptions.find((o) => o.value === field.value)}
                      onChange={(val) => field.onChange((val as Option).value)}
                      error={fieldState.error?.message}
                    // disabled={mode === "edit"}
                    />
                  )}
                />

                {/* Clinic */}
                <Controller
                  control={form.control}
                  name="clinic_ids"
                  rules={{
                    validate: (v) =>
                      (Array.isArray(v) && v.length > 0) ||
                      "At least one clinic must be selected",
                  }}
                  render={({ field, fieldState }) => (
                    <NiceSelect
                      {...field}
                      label="Clinic"
                      options={clinicOptions}
                      value={clinicOptions.filter((o) =>
                        field.value.includes(o.value),
                      )}
                      onChange={(val) =>
                        field.onChange((val as Option[]).map((v) => v.value))
                      }
                      error={fieldState.error?.message}
                      isMulti
                    />
                  )}
                />

                {/* Active Status */}
                <Controller
                  control={form.control}
                  name="isActive"
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <NiceSelect
                      {...field}
                      label="Status"
                      options={statusOptions}
                      value={statusOptions.find((o) => o.value === field.value)}
                      onChange={(val) => field.onChange((val as Option).value)}
                    />
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="submit">
                  {mode === "add"
                    ? createUser.isPending
                      ? "Saving..."
                      : "Save"
                    : updateUser.isPending
                      ? "Updating..."
                      : "Update"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTable;
