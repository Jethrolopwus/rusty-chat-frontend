"use client";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  const handleRegistration = async (data) => {
    console.log("Registration data:", data);
  };

  const handleSignInClick = () => {
    // Navigate to sign in page
    router.push("/signin");
  };

  return (
    <RegistrationForm
      onSubmit={handleRegistration}
      onSignInClick={handleSignInClick}
    />
  );
}
