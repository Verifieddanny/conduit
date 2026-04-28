import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

export interface Callback {
  id: string;
  status: 'pending' | 'delivered' | 'failed' | 'dead';
  responseCode: string;
  responseBody: string;
  attempts: number;
  nextRetry: string | null;
  payload: string;
  eventType: string;
  endpointId: string;
  createdAt: string;
  updatedAt: string;
  endpoint?: {
    endpointPath: string;
    externalSource: string;
  };
}

export interface GlobalStats {
  totalEndpoints: number;
  totalDeliveries: number;
  delivered: number;
  failed: number;
  dead: number;
}

export const useDeliveries = (endpointId?: string) => {
  const queryClient = useQueryClient();

  const deliveriesQuery = useQuery({
    queryKey: ['deliveries', endpointId],
    queryFn: async () => {
      const response = await api.get<{ callbacks: Callback[] }>(`/dashboard/deliveries/${endpointId}`);
      return response.data.callbacks;
    },
    enabled: !!endpointId,
  });

  const replayMutation = useMutation({
    mutationFn: async (callbackId: string) => {
      const response = await api.post(`/dashboard/deliveries/${callbackId}/replay`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries', endpointId] });
      queryClient.invalidateQueries({ queryKey: ['deliveries', 'recent'] });
      queryClient.invalidateQueries({ queryKey: ['deliveries', 'stats'] });
    },
  });

  return {
    deliveries: deliveriesQuery.data ?? [],
    isLoading: deliveriesQuery.isLoading,
    isError: deliveriesQuery.isError,
    replay: replayMutation,
  };
};

export const useGlobalStats = () => {
  return useQuery({
    queryKey: ['deliveries', 'stats'],
    queryFn: async () => {
      const response = await api.get<GlobalStats>('/dashboard/deliveries/stats');
      return response.data;
    },
  });
};

export const useRecentDeliveries = () => {
  return useQuery({
    queryKey: ['deliveries', 'recent'],
    queryFn: async () => {
      const response = await api.get<{ deliveries: Callback[] }>('/dashboard/deliveries/recent');
      return response.data.deliveries;
    },
  });
};