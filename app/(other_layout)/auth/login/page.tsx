"use client"
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUser } from '@/types/types';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginUserMutation } from '@/redux/app/feature/api/auth/authApi';
import { useAppDispatch } from '@/redux/app/hook';
import { setUser } from '@/redux/app/feature/api/auth/authSlice';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Login = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IUser>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Login successful!");
        const userData = res?.data?.user;
        const token = res?.data?.token;
        dispatch(setUser({ userData, token }));
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleQuickLogin = (email: string, pass: string) => {
    setValue('email', email);
    setValue('password', pass);
    toast.info(`Form filled with ${email.split('@')[0]}'s credentials. Click Sign In to proceed.`);
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        className="max-w-md w-full glass rounded-3xl p-8 shadow-2xl border border-white/10"
      >
        <motion.div variants={item} className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg shadow-primary/20">
              <span className="text-white font-black text-2xl">T</span>
            </div>
          </div>
          <h2 className="text-3xl font-black font-outfit tracking-tight">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">Sign in to your TechTips account</p>
        </motion.div>

        <motion.div variants={item} className="flex gap-4 mb-8">
          <button
            onClick={() => handleQuickLogin("rimeislam672@gmail.com", "123")}
            className="flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all duration-300 border border-white/5"
          >
            User Login
          </button>
          <button
            onClick={() => handleQuickLogin("kal@gmail.com", "123")}
            className="flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all duration-300 border border-white/5"
          >
            Admin Login
          </button>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div variants={item}>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 ml-1">
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary focus:ring-0 transition-all outline-none"
              type="email"
              placeholder="name@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
          </motion.div>

          <motion.div variants={item}>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 ml-1">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary focus:ring-0 transition-all outline-none"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
          </motion.div>

          <motion.div variants={item} className="flex items-center justify-between">
            <Link href="/auth/forget-password" title="Coming soon!" className="text-sm font-semibold text-primary hover:underline underline-offset-4 decoration-2 transition-all">
              Forgot password?
            </Link>
          </motion.div>

          <motion.button
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Sign In"}
          </motion.button>
        </form>

        <motion.p variants={item} className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/register" className="font-bold text-foreground hover:text-primary transition-colors">
            Register Now
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
