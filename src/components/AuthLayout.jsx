import React from 'react';

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-off-white px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80">
        <div className="flex flex-col items-center text-center mb-8">
          {Icon && (
            <div className="w-12 h-12 rounded-full bg-light-blue text-trust-blue flex items-center justify-center mb-4">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <h2 className="heading-display text-3xl text-navy">{title}</h2>
          {subtitle && <p className="text-muted-brand text-sm mt-1">{subtitle}</p>}
        </div>
        {children}
        {footer && <div className="mt-6 text-center text-sm text-muted-brand">{footer}</div>}
      </div>
    </div>
  );
}
