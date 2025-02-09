



import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Flower2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { isLoggedInAtom } from "@/atoms/userData";
import { loginSchema } from "@/schema";
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

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/books");
    }
  }, []);

  const onSubmit = (values) => {
    setIsLoading(true);
    let promise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/login`,
      values
    );
    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        navigate("/books");
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
        
        <div className="relative mx-auto w-full max-w-sm">
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
                    Welcome Back
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ようこそお帰りなさい
                  </p>
                </div>

                <div className="space-y-4">
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
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password • パスワード
                          </FormLabel>
                          <Link 
                            to="#" 
                            className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            Forgot Password?
                          </Link>
                        </div>
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
                      "Sign In"
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

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
              
              {/* Demo credentials */}
              <div className="pt-4 space-y-1 text-xs text-gray-500 dark:text-gray-500 border-t border-gray-100 dark:border-zinc-800">
                <p>Demo User: john.doe@example.com</p>
                <p>Demo Admin: john.doe2@example.com</p>
                <p>Password: password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

// Add these styles to your global CSS or tailwind.config.js
const style = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 3s ease-in-out infinite;
    animation-delay: 1.5s;
  }
`;
