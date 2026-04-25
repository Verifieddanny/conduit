import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/auth/register', data);
      return response.data;
    },
    onSuccess: () => {
      router.push('/login');
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/auth/login', data);
      return response.data as { auth_token: string; userId: string };
    },
    onSuccess: (data) => {
      setAuth(data.auth_token, data.userId);
      router.push('/dashboard');
    },
  });

  return { registerMutation, loginMutation };
};