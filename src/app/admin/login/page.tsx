import GuestLayout from '@/components/layout/GuestLayout';
import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <GuestLayout>
      <div className="container mx-auto px-4 py-16">
        <LoginForm />
      </div>
    </GuestLayout>
  );
}
