import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-off-white text-dark-text p-6">
      <h1 className="heading-display text-6xl text-navy mb-4">404</h1>
      <p className="text-xl text-muted-brand mb-8">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-navy text-white font-medium rounded hover:bg-deep-navy transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
