"use client";
import RegistrationForm from "@/components/RegistrationForm";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function RegistrationPage() {
  const router = useRouter();

  const handleRegistration = async (data) => {
    console.log("Registration data:", data);

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
            email: data.email,
            username: data.username,
            password: data.password,
            confirm_password: data.confirmPassword,
            status: "Offline",
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = "Registration failed. Please try again.";

        try {
          const errorData = await response.json();
          console.error("Registration failed:", errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          try {
            const errorText = await responseClone.text();
            console.error("Error response text:", errorText);

            errorMessage =
              errorText ||
              `Server error (${response.status}). Please try again later.`;
          } catch (textError) {
            console.error("Failed to get error response text:", textError);
            errorMessage = `Server error (${response.status}). Please try again later.`;
          }
        }

        toast.error(errorMessage);
        return;
      }

      let result;
      try {
        result = await response.json();
        console.log("Registration successful:", result);
      } catch (jsonError) {
        toast.success("Registration successful! Redirecting to login page...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
        return;
      }
      toast.success("Registration successful! Redirecting to login page...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } else if (
        error.name === "SyntaxError" &&
        error.message.includes("JSON")
      ) {
        toast.error("Server response error. Please try again later.");
      } else {
        toast.error("An error occurred during registration. Please try again.");
      }
    }
  };

  const handleSignInClick = () => {
    toast("Redirecting to login page...", {
      icon: "👋",
      duration: 1000,
    });

    setTimeout(() => {
      router.push("/login");
    }, 800);
  };

  return (
    <RegistrationForm
      onSubmit={handleRegistration}
      onSignInClick={handleSignInClick}
    />
  );
}
