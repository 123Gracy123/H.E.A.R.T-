import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = { title: "Sign In | H.E.A.R.T*" };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
