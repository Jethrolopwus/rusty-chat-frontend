"use client";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data) => {
    // Redirect to chat after successful login
    router.push("/chat");
  };

  return <LoginForm onSubmit={handleLogin} />;
}
