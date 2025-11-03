import { render, screen } from '@testing-library/react';
import Feed from '@/app/(app)/feed/page';

// Mock the Filtro component
jest.mock('@/components/Filtro', () => {
  return function MockFiltro() {
    return <div data-testid="mock-filtro">Filtro Component</div>;
  };
});

describe('Feed Page', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      expect(() => render(<Feed />)).not.toThrow();
    });

    it('should render the page title', () => {
      render(<Feed />);
      expect(screen.getByText('Página de feed')).toBeInTheDocument();
    });

    it('should render the Filtro component', () => {
      render(<Feed />);
      expect(screen.getByTestId('mock-filtro')).toBeInTheDocument();
    });

    it('should have correct structure with nested divs', () => {
      const { container } = render(<Feed />);
      const divs = container.querySelectorAll('div');
      expect(divs.length).toBeGreaterThan(0);
    });
  });

  describe('Component Structure', () => {
    it('should contain the title text', () => {
      render(<Feed />);
      const title = screen.getByText('Página de feed');
      expect(title).toBeInTheDocument();
    });

    it('should render Filtro inside a div', () => {
      render(<Feed />);
      const filtro = screen.getByTestId('mock-filtro');
      expect(filtro.parentElement?.tagName).toBe('DIV');
    });

    it('should maintain consistent structure on multiple renders', () => {
      const { rerender } = render(<Feed />);
      expect(screen.getByText('Página de feed')).toBeInTheDocument();
      
      rerender(<Feed />);
      expect(screen.getByText('Página de feed')).toBeInTheDocument();
    });
  });

  describe('Component Export', () => {
    it('should be a default export', () => {
      expect(Feed).toBeDefined();
      expect(typeof Feed).toBe('function');
    });

    it('should be a functional component', () => {
      const component = Feed();
      expect(component).toBeTruthy();
      expect(typeof component).toBe('object');
    });
  });

  describe('Integration', () => {
    it('should integrate with Filtro component', () => {
      render(<Feed />);
      expect(screen.getByTestId('mock-filtro')).toBeInTheDocument();
    });

    it('should render all child components', () => {
      render(<Feed />);
      expect(screen.getByText('Página de feed')).toBeInTheDocument();
      expect(screen.getByTestId('mock-filtro')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple consecutive renders', () => {
      const { rerender } = render(<Feed />);
      rerender(<Feed />);
      rerender(<Feed />);
      expect(screen.getByText('Página de feed')).toBeInTheDocument();
    });

    it('should maintain component structure', () => {
      const { container } = render(<Feed />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});