// import { useApiMutation } from "@/components/ApiCall/ApiMutation";
// import { API_ENDPOINTS } from "@/components/constants/ApiEndpoints/apiEndpoints";
// import { useAuth } from "@/components/ContextApi/AuthContext";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import z from "zod";
// import logo from "../../../assets/react.svg";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const schema = z.object({
//   username: z.string().min(1, "Username is required"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormData = z.infer<typeof schema>;

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const { mutate: postLogInData } = useApiMutation(
//     "post",
//     API_ENDPOINTS.AUTH.LOGIN
//   );
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     const requestBody = {
//       username: data.username,
//       password: data.password,
//     };
//     postLogInData(requestBody, {
//       onSuccess: (response) => {
//         const token = response.data.data.accessToken;
//         login(token);
//         reset();
//         navigate("/");
//       },
//     });
//   };

//   return (
//     <>
//       <div className="h-screen grid grid-cols-6 sm:grid-cols-12 bg-background p-8">
//         <div className="col-start-1 col-span-6 sm:col-start-2 sm:col-span-4 flex flex-col justify-center items-start gap-24">
//           <div className="h-16 w-16">
//             <img
//               src={logo}
//               alt="logo"
//               className="h-full w-full object-contain"
//             />
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
//             {/* <h2 className="text-2xl font-semibold text-center">Log In</h2> */}

//             <div className="flex flex-col gap-4">
//               <Label htmlFor="username" className="text-md">
//                 Username
//               </Label>
//               <Input
//                 id="username"
//                 {...register("username")}
//                 type="text"
//                 className="border p-2 rounded"
//               />
//               {errors.username && (
//                 <span className="text-sm text-red-500">
//                   {errors.username.message}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-4">
//               <Label htmlFor="password" className="text-md">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 {...register("password")}
//                 type="password"
//                 className="border p-2 rounded"
//               />
//               {errors.password && (
//                 <span className="text-sm text-red-500">
//                   {errors.password.message}
//                 </span>
//               )}
//             </div>

//             <Button
//               type="submit"
//               // variant="default"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-primary shadow-md hover:shadow-lg transition-all"
//             >
//               {isSubmitting ? "Log In..." : "Log In"}
//             </Button>
//           </form>{" "}
//         </div>
//         <div className="hidden sm:block col-start-7 col-span-6 bg-slate-200">
//           <img src={logo} alt="logo" className="h-full w-full object-contain" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import { useApiMutation } from "@/components/ApiCall/ApiMutation";
import { API_ENDPOINTS } from "@/components/constants/ApiEndpoints/apiEndpoints";
import { useAuth } from "@/components/ContextApi/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import logo from "../../../assets/loginImage.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import loginbg from "../../../assets/loginbg.png";
import loginbg2 from "../../../assets/loginbg2.png";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof schema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate: postLogInData, isPending } = useApiMutation(
    "post",
    API_ENDPOINTS.AUTH.LOGIN
  );

  const form = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    postLogInData(data, {
      onSuccess: (response) => {
        const { accessToken, refreshToken } = response.data.data;
        login(accessToken, refreshToken);
        form.reset();
        navigate("/");
      },
    });
  };

  return (
    <div className="relative h-screen flex justify-center p-20">
      <div className="absolute bottom-0 left-0 md:top-0 md:left-0 md:h-full sm:h-1/2 sm:w-2/6 md:w-auto hidden sm:block">
        <img
          src={loginbg}
          alt="Left background"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="absolute top-0 right-0 md:h-full sm:h-1/3 sm:w-2/6 md:w-auto  hidden sm:block">
        <img
          src={loginbg2}
          alt="Right background"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-12 inset-0 sm:shadow-[0_0_15px_rgba(0,0,0,0.15)] sm:rounded-xl z-10 sm:bg-white/50 sm:backdrop-blur-md">
        <div className="hidden sm:block sm:col-span-6 rounded-xl">
          <img
            src={logo}
            alt="logo"
            className="h-full max-w-full object-contain"
          />
        </div>

        <div className="col-span-6 sm:col-start-8 sm:col-span-4 flex flex-col justify-center items-center gap-24">
          <div className="h-16 w-16">
            <img
              src={logo}
              alt="logo"
              className="h-full w-full object-contain"
            />
            <Label className="text-lg text-center">Welcome!!</Label>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
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

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-primary shadow-md hover:shadow-lg transition-all"
              >
                {isPending ? "Logging In..." : "Log In"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
