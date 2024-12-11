import { useRequestPasswordResetMutation, useVerifyCodeMutation } from "@/features/user/api/userApi";
import { useToast } from "@/hook/useToast";


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


const useVerifyCode = () => {
    const [verifyCode, { isLoading }] = useVerifyCodeMutation();
    const { showToast } = useToast();

    const callVerifyCode = async(email: string, code: string) => {
        try {
            await verifyCode({ email, code }).unwrap();
            
            showToast({
                status: "success",
                message: "Security code has been verified"
            });

        }
        catch (error: any) {
            showToast({
                status: "error",
                message: error?.data?.message || "Failed to verify the code"
            });
        }
    }

    return {
        isLoading,
        callVerifyCode,
    }
};

export {
    useSendCodeToEmail,
    useVerifyCode
};
