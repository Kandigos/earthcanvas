import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (password: string) => boolean;
}

export function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      toast.error('סיסמה שגויה');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-stone-800">כניסת מנהל</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="הזן סיסמה"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-all transform hover:scale-105 font-semibold"
          >
            כניסה
          </button>
        </form>
      </div>
    </div>
  );
}