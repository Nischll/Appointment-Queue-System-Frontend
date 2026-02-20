import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/ContextApi/AuthContext";
import { User, Mail, Phone, Calendar, Edit2 } from "lucide-react";
import { useState } from "react";

export default function PatientProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Extract patient data from user context
  // Note: Adjust based on your actual user data structure from the API
  const patientData = {
    fullName: user?.fullName || "N/A",
    username: (user as any)?.username || "N/A",
    email: user?.email || "N/A",
    phone: (user as any)?.phone || "N/A",
    gender: (user as any)?.gender || "N/A",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information
          </p>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit2 className="h-4 w-4 mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="fullName"
                  defaultValue={patientData.fullName}
                  disabled={!isEditing}
                />
              ) : (
                <p className="text-sm font-medium py-2 px-3 bg-muted rounded-md">
                  {patientData.fullName}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Username
              </Label>
              {isEditing ? (
                <Input
                  id="username"
                  defaultValue={patientData.username}
                  disabled={!isEditing}
                />
              ) : (
                <p className="text-sm font-medium py-2 px-3 bg-muted rounded-md">
                  {patientData.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  defaultValue={patientData.email}
                  disabled={!isEditing}
                />
              ) : (
                <p className="text-sm font-medium py-2 px-3 bg-muted rounded-md">
                  {patientData.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Phone
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  defaultValue={patientData.phone}
                  disabled={!isEditing}
                />
              ) : (
                <p className="text-sm font-medium py-2 px-3 bg-muted rounded-md">
                  {patientData.phone}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Gender
              </Label>
              {isEditing ? (
                <Input
                  id="gender"
                  defaultValue={patientData.gender}
                  disabled={!isEditing}
                />
              ) : (
                <p className="text-sm font-medium py-2 px-3 bg-muted rounded-md">
                  {patientData.gender}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                // TODO: Implement save functionality
                setIsEditing(false);
              }}>
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

