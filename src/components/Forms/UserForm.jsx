import React, { useState } from 'react';
import { Eye, EyeOff, Send, CheckCircle2 } from 'lucide-react';

export default function UserForm() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const runValidation = () => {
    const issues = {};

    if (!data.name.trim()) {
      issues.name = 'Name is required';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      issues.email = 'Invalid email format';
    }

    if (data.password.length < 6) {
      issues.password = 'Password must be at least 6 characters';
    }

    setFieldErrors(issues);
    return Object.keys(issues).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();
    setIsSuccess(false);

    if (runValidation()) {
      setIsSuccess(true);
    }
  };

  const updateField = (e) => {
    const { name, value } = e.target;

    setData(prev => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        📋 Task 2: User Registration & Validation
      </h2>

      <form onSubmit={submitForm} className="space-y-4">
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="name"
            value={data.name}
            onChange={updateField}
            placeholder="Full Name"
            className={`w-full rounded-lg border p-2.5 outline-none transition-all ${
              fieldErrors.name
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            }`}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            name="email"
            value={data.email}
            onChange={updateField}
            placeholder="sample@example.com"
            className={`w-full rounded-lg border p-2.5 outline-none transition-all ${
              fieldErrors.email
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <input
              type={visiblePassword ? 'text' : 'password'}
              name="password"
              value={data.password}
              onChange={updateField}
              placeholder="••••••••"
              className={`w-full rounded-lg border p-2.5 outline-none transition-all ${
                fieldErrors.password
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />

            <button
              type="button"
              onClick={() => setVisiblePassword(prev => !prev)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {visiblePassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {fieldErrors.password && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-2.5 text-white transition-transform hover:bg-green-600 active:scale-[0.98]"
        >
          <Send size={16} /> Submit
        </button>

        {isSuccess && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-green-700 animate-fade-in">
            <CheckCircle2 size={18} />
            <span className="text-sm font-medium">
              Form validated successfully!
            </span>
          </div>
        )}
      </form>
    </div>
  );
}
