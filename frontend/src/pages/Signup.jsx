// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { OauthLogin } from "@/components/OauthLogin";
// import { userSchema } from "@/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const SignupForm = () => {
//   const form = useForm({
//     resolver: zodResolver(userSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//     },
//   });
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate("/books");
//     }
//   }, []);
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = (values) => {
//     setIsLoading(true);
//     let promise = axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
//       values
//     );

//     toast.promise(promise, {
//       loading: "Loading...",
//       success: (response) => {
//         navigate("/login");
//         return response.data.message;
//       },
//       error: (error) => error.response.data.message,
//       finally: () => setIsLoading(false),
//     });
//   };

//   return (
//     <div className="flex justify-center items-center p-4 min-h-svh dark:bg-zinc-950">
//       <Card className="mx-2 max-w-2xl h-fit">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <CardHeader>
//               <CardTitle className="text-xl">Sign Up</CardTitle>
//               <CardDescription>
//                 Enter your information to create an account
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4 w-full">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem className="grid">
//                         <FormLabel className="text-left">First Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="John" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem className="grid">
//                         <FormLabel className="text-left">Last Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Doe" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem className="grid">
//                       <FormLabel className="text-left">Email</FormLabel>
//                       <FormControl>
//                         <Input placeholder="m@email.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem className="grid">
//                       <FormLabel className="text-left">Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="Password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 {isLoading ? (
//                   <Button disabled>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </Button>
//                 ) : (
//                   <Button type="submit" className="w-full">
//                     Create an account
//                   </Button>
//                 )}
//               </div>
//               <div className="mt-4 text-center text-sm">
//                 Already have an account?{" "}
//                 <Link to="/login" className="underline">
//                   Sign in
//                 </Link>
//               </div>
//             </CardContent>
//           </form>
//         </Form>
//         <OauthLogin />
//       </Card>
//     </div>
//   );
// };

// export default SignupForm;


import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Flower2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { userSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OauthLogin } from "@/components/OauthLogin";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/books");
    }
  }, []);

  const onSubmit = (values) => {
    setIsLoading(true);
    let promise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
      values
    );
    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        navigate("/login");
        return response.data.message;
      },
      error: (error) => error.response.data.message,
      finally: () => setIsLoading(false),
    });
  };

  return (
    <div className="min-h-svh bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-red-950">
      <div className="relative grid items-center p-8">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 dark:bg-red-950 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-100 dark:bg-pink-950 rounded-full blur-3xl opacity-20 animate-pulse" />
        
        <div className="relative mx-auto w-full max-w-lg">
          {/* Decorative corner flowers */}
          <div className="absolute -top-4 -left-4">
            <Flower2 className="w-8 h-8 text-red-200 dark:text-red-800 animate-pulse" />
          </div>
          <div className="absolute -bottom-4 -right-4">
            <Flower2 className="w-8 h-8 text-red-200 dark:text-red-800 animate-pulse" />
          </div>
          
          {/* Decorative petals */}
          <div className="absolute -top-8 right-8 w-4 h-4 rounded-full bg-red-200 dark:bg-red-800 opacity-40 animate-float" />
          <div className="absolute -bottom-8 left-8 w-4 h-4 rounded-full bg-red-200 dark:bg-red-800 opacity-40 animate-float-delayed" />
          
          <div className="backdrop-blur-lg bg-white/90 dark:bg-zinc-900/90 rounded-lg border border-gray-100 dark:border-zinc-800 shadow-lg p-8">
            {/* Top decorative bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-red-400 via-pink-400 to-red-400" />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-medium text-gray-900 dark:text-gray-100">
                    Create Account
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    アカウント作成
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            First Name • 名
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John"
                              {...field}
                              className="bg-white/50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 focus:border-red-400 dark:focus:border-red-400 transition-all hover:border-red-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Last Name • 姓
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Doe"
                              {...field}
                              className="bg-white/50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 focus:border-red-400 dark:focus:border-red-400 transition-all hover:border-red-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email • メール
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com"
                            {...field}
                            className="bg-white/50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 focus:border-red-400 dark:focus:border-red-400 transition-all hover:border-red-300"
                          />
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
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Password • パスワード
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            className="bg-white/50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 focus:border-red-400 dark:focus:border-red-400 transition-all hover:border-red-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-600 hover:via-red-700 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <OauthLogin />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;