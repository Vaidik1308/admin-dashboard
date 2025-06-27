import React from 'react';
import { SignInForm } from '@/components/auth/SignInForm';

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <SignInForm />
    </div>
  );
};

export default SignInPage;