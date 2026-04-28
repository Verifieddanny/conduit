import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';

export interface SimulationResult {
  callbackId: string;
  status: string;
  response: {
    code: number;
    body: any;
  };
}

export const useSimulator = () => {
  const simulateMutation = useMutation({
    mutationFn: async ({ endpointId, payload }: { endpointId: string, payload: any }) => {
      const response = await api.post(`/dashboard/simulator/${endpointId}`,payload);
      return response.data;
    },
  });

  return {
    simulate: simulateMutation,
  };
};