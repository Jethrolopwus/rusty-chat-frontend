"use client";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data) => {
    console.log("Login data:", data);

    // Example: Make API call
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });

    // if (response.ok) {
    //   router.push('/dashboard');
    // }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
