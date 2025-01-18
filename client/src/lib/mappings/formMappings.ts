import AddSiteForm from "@/features/sites/components/AddSiteForm";
import UpdateSiteForm from "@/features/sites/components/UpdateSiteForm";
import DeleteSiteForm from "@/features/sites/components/DeleteSiteForm";

import UpdateUserForm from "@/features/user/components/UpdateUserForm";
import UpdateProfilePicture from "@/features/user/components/UpdateProfilePicture";
import DeleteAccountConfirmation from "@/features/user/components/DeleteAccountConfirmation";
import ResetPasswordForm from "@/features/user/components/ResetPasswordForm";
import DeleteAppUser from "@/features/user/components/DeleteAppUser";

import UpdateThresholdForm from "@/features/thresholds/components/UpdateThresholdForm";
import DeleteThresholdForm from "@/features/thresholds/components/DeleteThresholdForm";

import AddMeasurementData from "@/features/waterquality/components/AddMeasurementData";
import UpdateMeasurementData from "@/features/waterquality/components/UpdateMeasurementData";
import DeleteMeasurementData from "@/features/waterquality/components/DeleteMeasurementData";

import AddNotesForm from "@/features/stickynote/components/AddNotesForm";

import AppInfoForm from "@/features/app-settings/components/AppInfoForm";

export const drawerForms: Record<string, React.ComponentType<any>> = {
    // Site
    AddSiteForm,
    UpdateSiteForm,
    DeleteSiteForm,

    // Measurements
    AddMeasurementData,
    UpdateMeasurementData,
    DeleteMeasurementData,

    // User
    UpdateUserForm,
    UpdateProfilePicture,
    DeleteAccountConfirmation,
    ResetPasswordForm,
    DeleteAppUser,

    // Notes
    AddNotesForm,

    // Threshold
    UpdateThresholdForm,
    DeleteThresholdForm,

    // Extra Features
    AppInfoForm
};