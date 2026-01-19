import React, { useState } from "react";
import { useAuth } from "@/components/ContextApi/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import logo from "@/assets/loginbg4.webp"; 
import loginbg from "@/assets/loginbg.png";
import loginbg2 from "@/assets/loginbg2.png";
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
import { useSignup } from "@/components/ApiCall/PublicApi";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof schema>;

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: postSignUpData, isPending } = useSignup();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = (data: SignupFormData) => {
    postSignUpData(data,{
      onSuccess: () =>{
        form.reset();
        navigate("/")
      } 
    })
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      <img src={loginbg} className="fixed bottom-0 left-0 w-1/2 md:w-1/4 opacity-40 pointer-events-none" alt="" />
      <img src={loginbg2} className="fixed top-0 right-0 w-1/2 md:w-1/4 opacity-40 pointer-events-none" alt="" />

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-[1100px] bg-white/60 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-white/50">
        <div className="hidden md:flex md:w-1/2 bg-blue-50/30 items-center justify-center p-12">
          <img src={logo} alt="logo" className="max-w-full h-auto object-contain drop-shadow-xl" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16">
          <div className="mb-8 text-center">
            <img src={logo} className="md:hidden w-16 mx-auto mb-4" alt="logo" />
            <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-tight">Create Account</h2>
            <p className="text-gray-500 mt-2 text-sm">Join the Queueflow System today</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="John Doe" {...field} className="h-11 bg-white/80" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input placeholder="email@example.com" {...field} className="h-11 bg-white/80" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input type="password" placeholder="••••••" {...field} className="h-11 bg-white/80" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={isPending} className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-400 font-bold mt-2 text-white rounded-xl shadow-lg transition-all active:scale-95">
                {isPending ? "Creating..." : "SIGN UP"}
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-sm text-slate-600">
            Already have an account? <Link to="/login" className="font-bold text-blue-600 hover:unde">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;