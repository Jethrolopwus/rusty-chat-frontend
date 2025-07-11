"use client";
import RegistrationForm from "@/components/RegistrationForm";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegistration = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: data.fullName,
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirmPassword,
            status: "Offline",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        return;
      }

      const result = await response.json();
      console.log("Registration successful:", result);
      
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleSignInClick = () => {
    router.push("/login");
  };

  return (
    <RegistrationForm
      onSubmit={handleRegistration}
      onSignInClick={handleSignInClick}
    />
  );
}
