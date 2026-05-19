import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationsApi } from '../api/applications';

export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: applicationsApi.getAll,
  });
}

export function useCreateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: applicationsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['applications'] }),
  });
}

export function useUpdateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => applicationsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['applications'] }),
  });
}

export function useDeleteApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: applicationsApi.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['applications'] }),
  });
}