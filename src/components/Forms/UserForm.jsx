import React, { useState } from 'react';
import { Eye, EyeOff, Send, CheckCircle2 } from 'lucide-react';

export default function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    // Regex for Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email format";
    if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    if (validate()) {
      setSuccess(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📋 Task 2: Validation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2.5 border rounded-lg outline-none transition-all ${
              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            }`}
            placeholder="Full Name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2.5 border rounded-lg outline-none transition-all ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            }`}
            placeholder="sample@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2.5 border rounded-lg outline-none transition-all ${
                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          <Send size={16} /> Submit
        </button>
        
        {success && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg border border-green-200 animate-fade-in">
            <CheckCircle2 size={18} />
            <span className="text-sm font-medium">Form validated successfully!</span>
          </div>
        )}
      </form>
    </div>
  );
}