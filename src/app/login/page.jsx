"use client";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data) => {
    console.log("Login data:", data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        return;
      }

      const result = await response.json();
      localStorage.setItem("token", result.data.token);
      console.log("Token stored in localStorage:", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      console.log("Login successful:", result);
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
