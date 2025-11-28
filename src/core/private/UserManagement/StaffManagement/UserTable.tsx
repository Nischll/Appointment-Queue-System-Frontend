import { CellContext, Row } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { User } from "./staffTypes";
import { useGetStaff, useUpdateStaff } from "@/components/ApiCall/Api";
import Table from "@/components/Table/Table";
import TableCellFormatter from "@/helper/TableCellFormatter";
import { formatGender } from "@/helper/formatters";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { GenericFormRenderer } from "@/components/form/GenericFormRenderer";
import { StaffFormFields } from "./StaffFormFields";
import { useForm } from "react-hook-form";
import { useActiveRoles } from "./ActiveRolesContext";
import { useBranches } from "@/hooks/useBranches";
import { FieldConfig } from "@/components/form/types";

const UserTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, refetch } = useGetStaff();
  const updateUserData = useUpdateStaff(selectedUser?.id ?? undefined);

  const { activeRoles } = useActiveRoles();
  const { branches } = useBranches();

  const form = useForm({
    defaultValues: {},
  });

  // When selectedUser changes, populate the form
  useEffect(() => {
    if (selectedUser) {
      form.reset({
        firstName: selectedUser.firstName,
        middleName: selectedUser.middleName,
        lastName: selectedUser.lastName,
        username: selectedUser.username,
        email: selectedUser.email,
        gender: selectedUser.gender,
        branch: selectedUser.branch,
        allStaff: selectedUser.allStaff,
        allBranch: selectedUser.allBranch,
        sendSms: selectedUser.sendSms,
        sendEmail: selectedUser.sendEmail,
        roleList: selectedUser.roleList,
      });
    }
  }, [selectedUser]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const onSubmit = (data: any) => {
    if (!selectedUser?.id) return;

    const payload = {
      ...data,
      branch: Number(data.branch),
      allStaff: data.allStaff === "true" || data.allStaff === true,
      allBranch: data.allBranch === "true" || data.allBranch === true,
      sendSms: data.sendSms === "true" || data.sendSms === true,
      sendEmail: data.sendEmail === "true" || data.sendEmail === true,
      roleList: data.roleList.map((r: string | number) => Number(r)),
    };

    updateUserData.mutate(payload, {
      onSuccess: () => {
        form.reset();
        setIsOpen(false);
        setSelectedUser(null);
        refetch();
      },
    });
  };

  const dynamicFields: FieldConfig[] = StaffFormFields.filter(
    (f) => f.name !== "password"
  ).map((f) => {
    const field: FieldConfig = { ...f, name: String(f.name) };

    if (field.name === "roleList") {
      return { ...field, options: activeRoles };
    }

    if (field.name === "branch") {
      return { ...field, options: branches };
    }

    const yesNoFields = ["allStaff", "allBranch", "sendSms", "sendEmail"];
    if (yesNoFields.includes(field.name)) {
      return {
        ...field,
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ],
      };
    }

    return field;
  });

  const columns = [
    {
      header: "S.No",
      cell: ({ row }: { row: Row<User> }) => row.index + 1,
    },
    {
      accessorKey: "id",
      header: "Employee Id",
      cell: ({ row }: { row: Row<User> }) => (
        <TableCellFormatter value={row.original.id} />
      ),
    },
    {
      accessorFn: (row: User) =>
        `${row.firstName} ${row.middleName ? row.middleName + " " : ""}${
          row.lastName
        }`.trim(),
      id: "fullName",
      header: "Full Name",
      cell: ({ getValue }: CellContext<User, string>) => (
        <TableCellFormatter value={getValue()} />
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }: { row: Row<User> }) => (
        <TableCellFormatter value={row.original.username} />
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: { row: Row<User> }) => (
        <TableCellFormatter value={row.original.email} />
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }: { row: Row<User> }) => (
        <TableCellFormatter value={formatGender(row.original.gender)} />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        return (
          <Button size="sm" onClick={() => handleEditUser(user)}>
            <Pencil size={18} />
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        getData={async () => data?.data ?? []}
        pageSize={15}
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
            <DialogTitle>Update Staff</DialogTitle>
            <DialogClose />
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <GenericFormRenderer form={form} fields={dynamicFields} />
              </div>

              <DialogFooter>
                <Button type="submit">
                  {updateUserData.isPending ? "Updating...." : "Update"}
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
