import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}
export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post('/auth/register', data);
      return response.data;
    },
    onSuccess: () => {
      router.push('/login');
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post('/auth/login', data);
      return response.data as { auth_token: string; userId: string; email: string; username: string; has_api_key: boolean };
    },
    onSuccess: (data) => {
      setAuth(data.auth_token, data.userId, data.username, data.email, data.has_api_key);
      router.push('/dashboard');
    },
  });

  const apiKeyMutation = useMutation({
    mutationFn: async () => {
      const response = await api.put('/auth/api-key');
      return response.data as { api_key: string };
    },
    onSuccess: (data) => {
      useAuthStore.getState().setApiKey(data.api_key);
    }
  });

  const getErrorMessage = (error: unknown) => {

    if (error instanceof AxiosError) {
      return error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'An unexpected error occurred';
    }
    return 'An unexpected error occurred';
  };

  return {
    registerMutation,
    apiKeyMutation,
    loginMutation,
    getErrorMessage
  };
};