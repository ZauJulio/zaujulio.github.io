import { CheckCircle2Icon, XCircleIcon, XIcon } from 'lucide-react';
import { createContext, type ReactNode, useCallback, useContext, useState } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right-full duration-300 ${
              toast.type === 'success'
                ? 'bg-green-900/90 border-green-700 text-green-100'
                : 'bg-red-900/90 border-red-700 text-red-100'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2Icon className='size-5 text-green-400' />
            ) : (
              <XCircleIcon className='size-5 text-red-400' />
            )}
            <span className='text-sm font-medium'>{toast.message}</span>
            <button
              type='button'
              onClick={() => removeToast(toast.id)}
              className='ml-2 hover:opacity-70 transition-opacity'
            >
              <XIcon className='size-4' />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
