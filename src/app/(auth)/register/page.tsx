import type { Metadata } from "next";
import RegisterForm from "@/components/form/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | Netai",
  description: "Sign up to see photos and posts from your friends.",
  colorScheme: "dark light",
  openGraph: {
    images: {
      url: "https://res.cloudinary.com/dvc3vlqzv/image/upload/v1699806780/logo_rjnbfj.png",
    },
    url: "https://netai.vercel.app",
    type: "website",
    title: "Register | Netai",
    description: "Sign up to see photos and posts from your friends.",
  },
};

const RegisterPage = () => {
  return (
    <>
      <h1 className="text-xl">Create a new account</h1>
      <RegisterForm />
      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
        .
      </p>
    </>
  );
};

export default RegisterPage;
