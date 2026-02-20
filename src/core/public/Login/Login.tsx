import { useApiMutation } from "@/components/ApiCall/ApiMutation";
import { API_ENDPOINTS } from "@/components/constants/ApiEndpoints/apiEndpoints";
import { useAuth } from "@/components/ContextApi/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
username: z.string().min(1,"enter your username"),
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
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging In...
                  </span>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
