import { useMutation } from "@tanstack/react-query";
import { registerUser, signinUser } from "../queries/AuthQuery";
import toast from "react-hot-toast";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
        toast.success(data.data.message)
    },
    onError: (err:any) => {
      toast.error(
         err?.response?.data?.message || "Some error occurred while registering"
      );
    },
  });
};

export const useSigninUser = () => {
  return useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
        toast.success(data.data.message || "User Signin Successfully")
    },
    
    onError: (err:any) => {
      toast.error(err.response.data.message);
    },
  });
};
