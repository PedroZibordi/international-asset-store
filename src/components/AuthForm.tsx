// src/components/AuthForm.tsx
'use client'; // Indica que este é um Client Component no Next.js

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirecionar o usuário após o login/registro
import Link from 'next/link';

interface AuthFormProps {
  type: 'login' | 'register'; // Propriedade para definir se é um formulário de login ou registro
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Apenas para registro
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsLoading(true);

    // Validação básica de email
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    // Validação básica de senha
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    if (type === 'register' && password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || `${type === 'login' ? 'Login' : 'Registration'} successful!`);
        setError(null);

        // Em um sistema real, você guardaria um token/sessão aqui.
        // Por enquanto, apenas redirecionamos.
        // Futuramente: localStorage.setItem('token', data.token);
        // Futuramente: context API para gerenciar o estado de autenticação.

        router.push('/assets'); // Redireciona para a página de assets após sucesso

      } else {
        setError(data.message || `Failed to ${type}. Please try again.`);
        setMessage(null);
      }
    } catch (err: any) {
      console.error(`Error during ${type}:`, err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md mx-auto mt-12">
      <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
        {type === 'login' ? 'Login' : 'Register'}
      </h2>

      {message && (
        <div className="bg-green-600 text-white p-3 rounded-md mb-4 text-center">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-600 text-white p-3 rounded-md mb-4 text-center">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {type === 'register' && (
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-bold mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? (type === 'login' ? 'Logging In...' : 'Registering...') : (type === 'login' ? 'Login' : 'Register')}
        </button>
      </div>
      {type === 'login' ? (
        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      ) : (
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      )}
    </form>
  );
}