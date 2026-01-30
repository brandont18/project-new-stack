import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from './page';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
    }),
}));

describe('LoginPage - Validaciones', () => {
    it('debe mostrar errores de validación cuando los campos están vacíos', async () => {
        render(<LoginPage />);
        
        const submitButton = screen.getByRole('button', { name: "Entrar" });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
            expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
        });
    });
});
