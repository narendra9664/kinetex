import React from 'react';

export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white text-dark-text p-6">
      <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-navy mb-3">User Not Registered</h2>
        <p className="text-muted-brand mb-6">
          Your account is not registered to access this application. Please contact support or register for an account.
        </p>
        <a
          href="/register"
          className="inline-block px-6 py-2.5 bg-navy text-white rounded font-medium hover:bg-deep-navy transition-colors"
        >
          Go to Register
        </a>
      </div>
    </div>
  );
}
