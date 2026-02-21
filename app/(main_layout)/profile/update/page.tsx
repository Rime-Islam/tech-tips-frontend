"use client";
import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/app/feature/api/user/useApi";
import { useAppSelector } from "@/redux/app/hook";
import { IUser } from "@/types/types";
import { uploadImage } from "@/utils/imageDB";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCamera, HiOutlineIdentification } from "react-icons/hi";
import Loader from "@/component/UI/Loader";

const Page = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>();
  const userFromRedux = useAppSelector(useCurrentUser);
  const id = userFromRedux?._id;

  const [file, setFile] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { data, isLoading: isUserLoading } = useGetSingleUserQuery(id, { skip: !id });
  const user = data?.data;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        bio: user.bio,
      });
      if (user.profilePicture) {
        setFile(user.profilePicture);
      }
    }
  }, [user, reset]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImage(selectedFile);
        if (imageUrl) {
          setFile(imageUrl);
          toast.success("Image uploaded successfully!");
        }
      } catch (error) {
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onSubmit: SubmitHandler<IUser> = async (formData) => {
    const userData = {
      profilePicture: file || user?.profilePicture,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      bio: formData.bio,
    };

    try {
      const res = await updateUser({ userId: user?._id, userData }).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  if (isUserLoading) return <Loader />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black font-outfit mb-3">
            Update <span className="text-gradient">Profile</span>
          </h1>
          <p className="text-muted-foreground">
            Personalize your presence in the tech community
          </p>
        </div>

        <div className="glass overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* Profile Image Column */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-3xl overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                    <img
                      src={file || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <AnimatePresence>
                      {isUploading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center"
                        >
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <label
                    htmlFor="file-upload"
                    className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
                  >
                    <HiOutlineCamera className="text-xl" />
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
                <p className="mt-4 text-xs text-muted-foreground text-center">
                  Recommended: Square image, max 2MB
                </p>
              </div>

              {/* Form Fields Column */}
              <div className="md:col-span-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2 px-1">
                      <HiOutlineUser className="text-primary" /> Full Name
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2 px-1">
                      <HiOutlineMail className="text-primary" /> Email Address
                    </label>
                    <input
                      {...register("email")}
                      disabled
                      className="w-full px-4 py-3 rounded-2xl bg-secondary/30 border border-white/10 opacity-60 cursor-not-allowed outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2 px-1">
                      <HiOutlinePhone className="text-primary" /> Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2 px-1">
                      <HiOutlineLocationMarker className="text-primary" /> Location
                    </label>
                    <input
                      {...register("address")}
                      className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2 px-1">
                    <HiOutlineIdentification className="text-primary" /> Professional Bio
                  </label>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isUpdating || isUploading}
                    className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    type="submit"
                  >
                    {isUpdating ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Save Changes"
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;

