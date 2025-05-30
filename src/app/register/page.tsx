// src/app/register/page.tsx
import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm type="register" />
    </div>
  );
}