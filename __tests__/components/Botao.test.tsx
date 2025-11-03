import { render, screen, fireEvent } from '@testing-library/react';
import Botao from '@/components/Botao';

describe('Botao Component', () => {
  describe('Rendering', () => {
    it('should render with the provided text', () => {
      render(<Botao texto="Test Button" />);
      expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    });

    it('should render with text in the button element', () => {
      render(<Botao texto="Click Me" />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Click Me');
    });

    it('should render multiple instances with different texts', () => {
      const { rerender } = render(<Botao texto="First" />);
      expect(screen.getByText('First')).toBeInTheDocument();
      
      rerender(<Botao texto="Second" />);
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
  });

  describe('Styling - Inactive State', () => {
    it('should apply inactive styles by default', () => {
      render(<Botao texto="Test" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('text-gray-400');
      expect(button).toHaveClass('hover:text-blue-600');
      expect(button).not.toHaveClass('bg-white');
      expect(button).not.toHaveClass('text-blue-600');
    });

    it('should apply inactive styles when ativo is explicitly false', () => {
      render(<Botao texto="Test" ativo={false} />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('text-gray-400');
      expect(button).not.toHaveClass('bg-white');
    });

    it('should have base styles regardless of active state', () => {
      render(<Botao texto="Test" ativo={false} />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('py-1');
      expect(button).toHaveClass('rounded-full');
      expect(button).toHaveClass('font-semibold');
      expect(button).toHaveClass('transition-colors');
    });
  });

  describe('Styling - Active State', () => {
    it('should apply active styles when ativo is true', () => {
      render(<Botao texto="Test" ativo={true} />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-white');
      expect(button).toHaveClass('text-blue-600');
      expect(button).not.toHaveClass('text-gray-400');
    });

    it('should maintain base styles when active', () => {
      render(<Botao texto="Test" ativo={true} />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('py-1');
      expect(button).toHaveClass('rounded-full');
      expect(button).toHaveClass('font-semibold');
      expect(button).toHaveClass('transition-colors');
    });

    it('should toggle styles between active and inactive', () => {
      const { rerender } = render(<Botao texto="Test" ativo={false} />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('text-gray-400');
      expect(button).not.toHaveClass('bg-white');
      
      rerender(<Botao texto="Test" ativo={true} />);
      expect(button).toHaveClass('bg-white');
      expect(button).toHaveClass('text-blue-600');
      expect(button).not.toHaveClass('text-gray-400');
    });
  });

  describe('Click Behavior', () => {
    it('should call onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Botao texto="Test" onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick handler multiple times on multiple clicks', () => {
      const handleClick = jest.fn();
      render(<Botao texto="Test" onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('should not throw error when onClick is not provided', () => {
      render(<Botao texto="Test" />);
      const button = screen.getByRole('button');
      
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('should work with onClick and ativo together', () => {
      const handleClick = jest.fn();
      render(<Botao texto="Active Button" ativo={true} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-white');
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string as texto', () => {
      render(<Botao texto="" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('');
    });

    it('should handle very long text', () => {
      const longText = 'A'.repeat(100);
      render(<Botao texto={longText} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle special characters in texto', () => {
      const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      render(<Botao texto={specialText} />);
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('should handle unicode characters', () => {
      const unicodeText = '你好世界 🌍 مرحبا';
      render(<Botao texto={unicodeText} />);
      expect(screen.getByText(unicodeText)).toBeInTheDocument();
    });

    it('should handle HTML-like strings safely', () => {
      const htmlLike = '<script>alert("xss")</script>';
      render(<Botao texto={htmlLike} />);
      const button = screen.getByRole('button');
      expect(button.textContent).toBe(htmlLike);
      expect(button.innerHTML).not.toContain('<script>');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a button', () => {
      render(<Botao texto="Accessible Button" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      const handleClick = jest.fn();
      render(<Botao texto="Test" onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('should have proper button semantics', () => {
      render(<Botao texto="Test" />);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should maintain focus styles with transition', () => {
      render(<Botao texto="Test" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('transition-colors');
    });
  });

  describe('Prop Combinations', () => {
    it('should work with all props provided', () => {
      const handleClick = jest.fn();
      render(<Botao texto="Full Props" ativo={true} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Full Props');
      expect(button).toHaveClass('bg-white');
      expect(button).toHaveClass('text-blue-600');
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });

    it('should work with only required props', () => {
      render(<Botao texto="Required Only" />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Required Only');
      expect(button).toHaveClass('text-gray-400');
    });

    it('should work with texto and onClick only', () => {
      const handleClick = jest.fn();
      render(<Botao texto="With Handler" onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });

    it('should work with texto and ativo only', () => {
      render(<Botao texto="Active Only" ativo={true} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-white');
    });
  });

  describe('Component Reusability', () => {
    it('should render correctly in a list', () => {
      const buttons = ['First', 'Second', 'Third'];
      render(
        <div>
          {buttons.map((text, index) => (
            <Botao key={index} texto={text} />
          ))}
        </div>
      );
      
      buttons.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    it('should handle dynamic ativo state in a list', () => {
      const buttons = [
        { texto: 'First', ativo: true },
        { texto: 'Second', ativo: false },
        { texto: 'Third', ativo: true },
      ];
      
      render(
        <div>
          {buttons.map((btn, index) => (
            <Botao key={index} texto={btn.texto} ativo={btn.ativo} />
          ))}
        </div>
      );
      
      const firstButton = screen.getByText('First');
      const secondButton = screen.getByText('Second');
      const thirdButton = screen.getByText('Third');
      
      expect(firstButton).toHaveClass('bg-white');
      expect(secondButton).toHaveClass('text-gray-400');
      expect(thirdButton).toHaveClass('bg-white');
    });
  });
});