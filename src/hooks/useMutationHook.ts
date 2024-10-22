import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

// Define a generic mutation hook
export const useMutationHooks = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  fnCallback: (variables: TVariables) => Promise<TData>, 
  options: UseMutationOptions<TData, TError, TVariables, TContext> = {} 
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const mutation = useMutation({
    mutationFn: fnCallback, 
    ...options,
  });

  return mutation;
};
