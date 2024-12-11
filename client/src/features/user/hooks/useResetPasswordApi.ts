import {
    useRequestPasswordResetMutation,
    useVerifyCodeMutation,
    useUpdatePasswordMutation
    }
    from "@/features/user/api/userApi";

import { useToast } from "@/hook/useToast";

// First API: Send Code To Email
const useSendCodeToEmail = () => {
    const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();
    const { showToast } = useToast();

    const sendCodeToEmail = async (email:string, stepForward: () => void) => {
        try {
            const res = await requestPasswordReset({ email }).unwrap(); 
            const data = JSON.stringify(res);
            const parsedData = JSON.parse(data);
            const mainMessage = parsedData.message.message;

            showToast({
                status: "success",
                message: mainMessage
            });
            stepForward();
        }
        catch (error:any) {
            showToast({
                status: "error",
                message: error?.data?.message || "Failed to send a code to your email. Verify your e-mail input"
            });
        } 
    };
    return {
        isLoading,
        sendCodeToEmail
    };
}

// Second API: Verify the Code Sent
const useVerifyCode = () => {
    const [verifyCode, { isLoading }] = useVerifyCodeMutation();
    const { showToast } = useToast();

    const callVerifyCode = async(email: string, code: string, stepForward: ()=> void) => {
        try {
            const res = await verifyCode({ email, code }).unwrap();
            const isVerified = res.isVerified;

            showToast({
                status: "success",
                message: "Security code has been verified"
            });
            if (isVerified) {
                stepForward();
            } else return;
        
        }
        catch (error: any) {
            showToast({
                status: "error",
                message: error?.data?.message || "Failed to verify the code. Code does not match"
            });
        }
    }

    return {
        isLoading,
        callVerifyCode,
    }
};

// Third API: Update Password
import type { UpdatePasswordRequest } from "@/features/user/api/interface";
const useUpdatePassword = () => {
    const [ updatePassword, { isLoading }] = useUpdatePasswordMutation();
    const { showToast } = useToast();

    const callUpdatePassword = async (resetData: UpdatePasswordRequest) => {
        try {
            const res = await updatePassword(resetData).unwrap();
            const data = JSON.stringify(res);
            const parsedData = JSON.parse(data);
            const mainMessage = parsedData.message.message;

            showToast({
                status: "success",
                message: mainMessage
            });
        } catch (error:any) {
            showToast({
                status: "error",
                message: error?.data?.message || "Failed to verify the code"
            });
        }
    }
    return {
        isLoading,
        callUpdatePassword
    }
};

export {
    useSendCodeToEmail,
    useVerifyCode,
    useUpdatePassword
};
