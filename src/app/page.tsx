"use client";

import { useState } from 'react';
import InputMask from 'react-input-mask';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    const phoneWithoutMask = phone.replace(/\D/g, '');
    const phoneFormatted = `55${phoneWithoutMask}`;

    const data = {
      phone: phoneFormatted,
      message,
    };

    try {
      console.log(data);
      const response = await fetch('https://correio-elegante-api.onrender.com/send-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSucesso('Mensagem enviada com sucesso!');
        setPhone('');
        setMessage('');
      } else {
        alert('Falha ao enviar a mensagem');
      }
    } catch (error) {
      alert('Erro ao enviar a mensagem');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl text-gray-700 font-bold mb-6 text-center">Enviar Correio Elegante</h1>
        <div className="mb-6">
          <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span role="img" aria-label="Brazil Flag" className="text-lg text-gray-700">🇧🇷</span>
            </span>
            <InputMask
              mask="(99) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full pl-10 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black text-lg p-2"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
            Mensagem
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black text-lg p-2 h-40"
            required
          ></textarea>
        </div>
        <div>
          <p className="text-green-500">{sucesso}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
          disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
