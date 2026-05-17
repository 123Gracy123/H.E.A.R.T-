import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = { title: "Forgot Password | H.E.A.R.T*" };

export default function ForgotPasswordPage() {
  return <AuthForm mode="forgot" />;
}
