import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

export interface Endpoint {
  id: string;
  endpointPath: string;
  secret: string;
  status: 'active' | 'inactive';
  subscribedEvent: string[];
  externalSource: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deliveredCount?: number;
  failedCount?: number;
  deadCount?: number;
}

export const useEndpoints = () => {
  const queryClient = useQueryClient();

  const endpointsQuery = useQuery({
    queryKey: ['endpoints'],
    queryFn: async () => {
      const response = await api.get<{ endpoints: Endpoint[] }>('/dashboard/endpoints');
      return response.data.endpoints;
    },
  });

  const useEndpoint = (id: string) => useQuery({
    queryKey: ['endpoint', id],
    queryFn: async () => {
      const response = await api.get<{ endpoint: any }>(`/dashboard/endpoints/${id}`);
      const endpoint = response.data.endpoint;
      
      // Flatten stats if they are nested (as seen in the backend controller)
      if (endpoint.stats) {
        return {
          ...endpoint,
          deliveredCount: endpoint.stats.deliveredCount,
          failedCount: endpoint.stats.failedCount,
          deadCount: endpoint.stats.deadCount,
        } as Endpoint;
      }
      
      return endpoint as Endpoint;
    },
    enabled: !!id,
  });

  const createEndpointMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/dashboard/endpoints', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endpoints'] });
    },
  });

  const updateEndpointMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const response = await api.put(`/dashboard/endpoints/${id}`, data);
      return response.data;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['endpoints'] });
      queryClient.invalidateQueries({ queryKey: ['endpoint', id] });
    },
  });

  const deleteEndpointMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/dashboard/endpoints/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endpoints'] });
    },
  });

  return {
    endpoints: endpointsQuery.data ?? [],
    useEndpoint,
    isLoading: endpointsQuery.isLoading,
    isError: endpointsQuery.isError,
    error: endpointsQuery.error,
    createEndpoint: createEndpointMutation,
    updateEndpoint: updateEndpointMutation,
    deleteEndpoint: deleteEndpointMutation,
  };
};