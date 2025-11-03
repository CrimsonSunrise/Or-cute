import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filtro from '@/components/Filtro';

describe('Filtro Component', () => {
  describe('Initial Rendering', () => {
    it('should render the filter container', () => {
      render(<Filtro />);
      const container = screen.getByRole('group', { hidden: true });
      expect(container).toBeInTheDocument();
    });

    it('should render both filter buttons', () => {
      render(<Filtro />);
      expect(screen.getByRole('button', { name: /recente/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /em alta/i })).toBeInTheDocument();
    });

    it('should have "Recente" button active by default', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      expect(recenteButton).toHaveClass('bg-white');
      expect(recenteButton).toHaveClass('text-blue-600');
      expect(emAltaButton).toHaveClass('text-gray-400');
    });

    it('should render with correct container styles', () => {
      const { container } = render(<Filtro />);
      const filterDiv = container.firstChild;
      
      expect(filterDiv).toHaveClass('inline-flex');
      expect(filterDiv).toHaveClass('bg-gray-200');
      expect(filterDiv).toHaveClass('rounded-full');
      expect(filterDiv).toHaveClass('p-1');
    });
  });

  describe('State Management - Clicking Recente', () => {
    it('should keep "Recente" active when clicked while already active', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      
      expect(recenteButton).toHaveClass('bg-white');
      fireEvent.click(recenteButton);
      expect(recenteButton).toHaveClass('bg-white');
    });

    it('should activate "Recente" when clicked from inactive state', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      // First click "Em alta" to deactivate "Recente"
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
      expect(recenteButton).toHaveClass('text-gray-400');
      
      // Then click "Recente" to reactivate it
      fireEvent.click(recenteButton);
      expect(recenteButton).toHaveClass('bg-white');
      expect(emAltaButton).toHaveClass('text-gray-400');
    });
  });

  describe('State Management - Clicking Em Alta', () => {
    it('should activate "Em alta" when clicked', () => {
      render(<Filtro />);
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
      expect(emAltaButton).toHaveClass('text-blue-600');
    });

    it('should deactivate "Recente" when "Em alta" is clicked', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      expect(recenteButton).toHaveClass('bg-white');
      
      fireEvent.click(emAltaButton);
      expect(recenteButton).toHaveClass('text-gray-400');
      expect(recenteButton).not.toHaveClass('bg-white');
    });

    it('should keep "Em alta" active when clicked while already active', () => {
      render(<Filtro />);
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
      
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
    });
  });

  describe('Toggle Behavior', () => {
    it('should toggle between filters multiple times', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      // Initial state: Recente active
      expect(recenteButton).toHaveClass('bg-white');
      expect(emAltaButton).toHaveClass('text-gray-400');
      
      // Toggle to Em alta
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
      expect(recenteButton).toHaveClass('text-gray-400');
      
      // Toggle back to Recente
      fireEvent.click(recenteButton);
      expect(recenteButton).toHaveClass('bg-white');
      expect(emAltaButton).toHaveClass('text-gray-400');
      
      // Toggle to Em alta again
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
      expect(recenteButton).toHaveClass('text-gray-400');
    });

    it('should handle rapid clicking', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      fireEvent.click(emAltaButton);
      fireEvent.click(recenteButton);
      fireEvent.click(emAltaButton);
      fireEvent.click(recenteButton);
      fireEvent.click(emAltaButton);
      
      expect(emAltaButton).toHaveClass('bg-white');
      expect(recenteButton).toHaveClass('text-gray-400');
    });
  });

  describe('User Interaction with userEvent', () => {
    it('should work with userEvent click', async () => {
      const user = userEvent.setup();
      render(<Filtro />);
      
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      await user.click(emAltaButton);
      
      expect(emAltaButton).toHaveClass('bg-white');
    });

    it('should toggle correctly with userEvent', async () => {
      const user = userEvent.setup();
      render(<Filtro />);
      
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      await user.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
      
      await user.click(recenteButton);
      expect(recenteButton).toHaveClass('bg-white');
    });

    it('should handle keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Filtro />);
      
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      recenteButton.focus();
      await user.tab();
      expect(emAltaButton).toHaveFocus();
    });
  });

  describe('Component Structure', () => {
    it('should render buttons in correct order', () => {
      render(<Filtro />);
      const buttons = screen.getAllByRole('button');
      
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Recente');
      expect(buttons[1]).toHaveTextContent('Em alta');
    });

    it('should maintain button structure after state changes', () => {
      render(<Filtro />);
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      fireEvent.click(emAltaButton);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Recente');
      expect(buttons[1]).toHaveTextContent('Em alta');
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple rapid state changes correctly', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        fireEvent.click(i % 2 === 0 ? emAltaButton : recenteButton);
      }
      
      // After even number of toggles, should end on Recente
      expect(recenteButton).toHaveClass('bg-white');
      expect(emAltaButton).toHaveClass('text-gray-400');
    });

    it('should maintain state consistency across re-renders', () => {
      const { rerender } = render(<Filtro />);
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
      
      rerender(<Filtro />);
      // Note: State is reset on re-render as this is a fresh component instance
      const recenteButtonAfter = screen.getByRole('button', { name: /recente/i });
      expect(recenteButtonAfter).toHaveClass('bg-white');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button roles', () => {
      render(<Filtro />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('should be keyboard navigable', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      recenteButton.focus();
      expect(recenteButton).toHaveFocus();
      
      emAltaButton.focus();
      expect(emAltaButton).toHaveFocus();
    });

    it('should maintain focus after clicking', () => {
      render(<Filtro />);
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      emAltaButton.focus();
      fireEvent.click(emAltaButton);
      
      // Focus should be maintained (browser behavior)
      expect(document.activeElement).toBe(emAltaButton);
    });
  });

  describe('Visual States', () => {
    it('should apply correct visual state to active button', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      
      expect(recenteButton).toHaveClass('bg-white');
      expect(recenteButton).toHaveClass('text-blue-600');
      expect(recenteButton).toHaveClass('px-4');
      expect(recenteButton).toHaveClass('py-1');
      expect(recenteButton).toHaveClass('rounded-full');
    });

    it('should apply correct visual state to inactive button', () => {
      render(<Filtro />);
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      expect(emAltaButton).toHaveClass('text-gray-400');
      expect(emAltaButton).toHaveClass('hover:text-blue-600');
    });

    it('should have transition classes for smooth state changes', () => {
      render(<Filtro />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        expect(button).toHaveClass('transition-colors');
      });
    });
  });

  describe('Client-Side Component', () => {
    it('should handle client-side state management', () => {
      render(<Filtro />);
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      // This test verifies that useState works correctly
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
    });

    it('should not have server-side rendering issues', () => {
      // This test ensures the component renders without errors
      expect(() => render(<Filtro />)).not.toThrow();
    });
  });

  describe('Integration with Botao Component', () => {
    it('should pass correct props to Botao components', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      // Verify Botao receives correct texto prop
      expect(recenteButton).toHaveTextContent('Recente');
      expect(emAltaButton).toHaveTextContent('Em alta');
    });

    it('should pass correct ativo state to Botao components', () => {
      render(<Filtro />);
      const recenteButton = screen.getByRole('button', { name: /recente/i });
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      // Initially, Recente is active
      expect(recenteButton).toHaveClass('bg-white');
      expect(emAltaButton).not.toHaveClass('bg-white');
      
      // After clicking Em alta
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
      expect(recenteButton).not.toHaveClass('bg-white');
    });

    it('should pass working onClick handlers to Botao components', () => {
      render(<Filtro />);
      const emAltaButton = screen.getByRole('button', { name: /em alta/i });
      
      // Verify onClick handler works
      fireEvent.click(emAltaButton);
      expect(emAltaButton).toHaveClass('bg-white');
    });
  });
});