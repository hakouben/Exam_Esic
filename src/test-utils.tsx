// src/test-utils.tsx
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';

const createTestClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  const client = createTestClient();

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={client}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    ),
    ...options,
  });
}

// ré-exporte tout pour éviter d’importer deux libs
export * from '@testing-library/react';
