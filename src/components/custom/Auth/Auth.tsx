import React, { useRef, useState } from "react";
import {
  Eye,
  EyeOff,
  Feather,
  KeyRound,
  Mail,
  User,
  UserPlus,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Link } from "react-router-dom";
import { useRegisterUser, useSigninUser } from "src/lib/queryHooks/AuthHooks";

interface AuthFormProps {
  signin: boolean;
}

// Base schema for common fields
const baseSchema = z.object({
  email: z.string().email("Enter a valid Email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

// Extended schema for signup
const signupSchema = baseSchema
  .extend({
    fullName: z.string().min(2, "Username must be at least 2 characters."),
    profilePic: z.any().optional(),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Type for form data
type FormData = z.infer<typeof signupSchema>;

const Auth: React.FC<AuthFormProps> = ({ signin }) => {
  const [isLogin, setIsLogin] = useState(signin);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: registerUser, isPending: registerPending } =
    useRegisterUser();
  const { mutate: signinUser, isPending: signinPending } = useSigninUser();

  const form = useForm<FormData>({
    resolver: zodResolver(isLogin ? baseSchema : signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const toggleAuthForm = () => {
    setIsLogin(!isLogin);
    form.reset();
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFormSubmit = (values: FormData) => {
    if (isLogin) {
      signinUser({ email: values.email, password: values.password });
    } else {
      const { confirmPassword, ...registerData } = values;
      registerUser(registerData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div
        className={`max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex overflow-hidden justify-center flex-1 forms-container ${
          isLogin ? "" : "slide"
        }`}
      >
        <div className="lg:w-[40%] w-full max-sm:px-4 max-sm:py-8 sm:p-12 login ease-in-out duration-500">
          <div className="flex gap-2 justify-center text-indigo-700 items-center">
            <Feather className="w-7 h-7" />
            <h2 className="text-center font-bold text-4xl">BlogApp</h2>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              {isLogin ? "Sign In" : "Sign Up"}
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="space-y-3"
                  >
                    {/* profile pic and fulllname fields */}
                    {!isLogin && (
                      <>
                        <FormField
                          control={form.control}
                          name="profilePic"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex justify-center flex-col items-center">
                                  <div
                                    className="w-16 h-16"
                                    onClick={handleClick}
                                  >
                                    {selectedImage ? (
                                      <div className="h-16 w-16 mb-1 relative">
                                        <img
                                          src={selectedImage}
                                          alt="Selected"
                                          className="h-16 w-16 rounded-full border-2 cursor-pointer group"
                                        />
                                      </div>
                                    ) : (
                                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                                        <User className="h-5 w-5 icon" />
                                      </div>
                                    )}
                                    <Input
                                      type="file"
                                      ref={inputRef}
                                      className="hidden"
                                      onChange={(e) => {
                                        handleImageChange(e);
                                        field.onChange(e);
                                      }}
                                    />
                                  </div>
                                  {selectedImage !== null && (
                                    <button
                                      type="button"
                                      onClick={() => setSelectedImage(null)}
                                      className="w-full text-center text-red-500 text-xs"
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <label className="flex items-center gap-2 border-2 py-0.5 px-5 rounded-lg focus-within:border-primary group input-wrapper">
                                  <User className="h-5 w-5 icon" />
                                  <Input
                                    type="text"
                                    placeholder="Ex: Saurabh Singh"
                                    className="grow border-none focus-visible:ring-white outline-none focus:outline-none"
                                    {...field}
                                  />
                                </label>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    {/*  email field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <label className="flex items-center gap-2 border-2 py-0.5 px-5 rounded-lg focus-within:border-primary input-wrapper">
                              <Mail className="h-5 w-5 icon" />
                              <Input
                                type="email"
                                placeholder="example@gmail.com"
                                className="grow border-none outline-none focus-visible:ring-white focus:outline-none"
                                {...field}
                              />
                            </label>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/*  password field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <label className="flex items-center gap-2 border-2 py-0.5 px-5 rounded-lg focus-within:border-primary input-wrapper">
                              <KeyRound className="h-5 w-5 icon" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="grow border-none outline-none focus:outline-none focus-visible:ring-white"
                                {...field}
                              />
                              {showPassword ? (
                                <Eye
                                  onClick={() =>
                                    togglePasswordVisibility("password")
                                  }
                                  className="cursor-pointer icon"
                                />
                              ) : (
                                <EyeOff
                                  onClick={() =>
                                    togglePasswordVisibility("password")
                                  }
                                  className="cursor-pointer icon"
                                />
                              )}
                            </label>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/*  confirm password field */}
                    {!isLogin && (
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <label className="flex items-center gap-2 border-2 py-0.5 px-5 rounded-lg focus-within:border-primary input-wrapper">
                                <KeyRound className="h-5 w-5 icon" />
                                <Input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirm Password"
                                  className="grow border-none outline-none focus:outline-none focus:border-none focus-visible:ring-white"
                                  {...field}
                                />
                                {showConfirmPassword ? (
                                  <Eye
                                    onClick={() =>
                                      togglePasswordVisibility(
                                        "confirmPassword"
                                      )
                                    }
                                    className="cursor-pointer icon"
                                  />
                                ) : (
                                  <EyeOff
                                    onClick={() =>
                                      togglePasswordVisibility(
                                        "confirmPassword"
                                      )
                                    }
                                    className="cursor-pointer icon"
                                  />
                                )}
                              </label>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* signin/signup button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="mt-5 h-12 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      disabled={isLogin ? signinPending : registerPending}
                    >
                      <UserPlus />
                      <span className="ml-3">
                        {isLogin ? "Sign In" : "Sign Up"}
                      </span>
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="mt-3 text-center">
                <p>
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <Link
                    to={isLogin ? "/auth/signup" : "/auth/signin"}
                    className="pl-1 cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700"
                    onClick={toggleAuthForm}
                  >
                    {isLogin ? "SignUp" : "SignIn"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex-1 bg-indigo-100 text-center hidden lg:flex signup ease-in-out duration-500`}
        >
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
