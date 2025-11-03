import { render, screen } from '@testing-library/react';
import FeedLayout from '@/app/(app)/layout';

describe('FeedLayout Component', () => {
  const mockChildren = <div data-testid="mock-child">Test Content</div>;

  describe('Rendering', () => {
    it('should render without crashing', () => {
      expect(() => render(<FeedLayout>{mockChildren}</FeedLayout>)).not.toThrow();
    });

    it('should render children content', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      expect(screen.getByTestId('mock-child')).toBeInTheDocument();
    });

    it('should render left sidebar text', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      expect(screen.getByText('Esquerda')).toBeInTheDocument();
    });

    it('should render right sidebar text', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      expect(screen.getByText('Direita')).toBeInTheDocument();
    });

    it('should render all three sections', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      expect(screen.getByText('Esquerda')).toBeInTheDocument();
      expect(screen.getByTestId('mock-child')).toBeInTheDocument();
      expect(screen.getByText('Direita')).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should have a main container with correct classes', () => {
      const { container } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      const mainContainer = container.firstChild;
      
      expect(mainContainer).toHaveClass('flex');
      expect(mainContainer).toHaveClass('bg-[red]');
      expect(mainContainer).toHaveClass('w-full');
      expect(mainContainer).toHaveClass('h-screen');
    });

    it('should have left sidebar with correct classes', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const leftSidebar = screen.getByText('Esquerda').parentElement;
      
      expect(leftSidebar).toHaveClass('w-80');
      expect(leftSidebar).toHaveClass('h-full');
      expect(leftSidebar).toHaveClass('bg-white');
    });

    it('should have main content area with correct classes', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const mainContent = screen.getByTestId('mock-child').parentElement;
      
      expect(mainContent).toHaveClass('flex-1');
      expect(mainContent).toHaveClass('bg-gray-100');
    });

    it('should have right sidebar with correct classes', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const rightSidebar = screen.getByText('Direita').parentElement;
      
      expect(rightSidebar).toHaveClass('w-80');
      expect(rightSidebar).toHaveClass('h-full');
      expect(rightSidebar).toHaveClass('bg-white');
    });

    it('should render aside elements for sidebars', () => {
      const { container } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      const asides = container.querySelectorAll('aside');
      expect(asides).toHaveLength(2);
    });

    it('should render main element for content', () => {
      const { container } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render simple text children', () => {
      render(<FeedLayout>Simple Text</FeedLayout>);
      expect(screen.getByText('Simple Text')).toBeInTheDocument();
    });

    it('should render complex component children', () => {
      const ComplexChild = () => (
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
        </div>
      );
      
      render(<FeedLayout><ComplexChild /></FeedLayout>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <FeedLayout>
          <div>First</div>
          <div>Second</div>
          <div>Third</div>
        </FeedLayout>
      );
      
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('should render null children without error', () => {
      expect(() => render(<FeedLayout>{null}</FeedLayout>)).not.toThrow();
    });

    it('should render undefined children without error', () => {
      expect(() => render(<FeedLayout>{undefined}</FeedLayout>)).not.toThrow();
    });

    it('should render array of children', () => {
      const children = [
        <div key="1">Item 1</div>,
        <div key="2">Item 2</div>,
        <div key="3">Item 3</div>,
      ];
      
      render(<FeedLayout>{children}</FeedLayout>);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('TypeScript Props', () => {
    it('should accept React.ReactNode as children', () => {
      const nodes: React.ReactNode = (
        <>
          <div>Node 1</div>
          <div>Node 2</div>
        </>
      );
      
      expect(() => render(<FeedLayout>{nodes}</FeedLayout>)).not.toThrow();
    });

    it('should be a default export', () => {
      expect(FeedLayout).toBeDefined();
      expect(typeof FeedLayout).toBe('function');
    });
  });

  describe('Responsive Layout', () => {
    it('should have full width container', () => {
      const { container } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveClass('w-full');
    });

    it('should have full height container', () => {
      const { container } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveClass('h-screen');
    });

    it('should use flexbox layout', () => {
      const { container } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveClass('flex');
    });

    it('should have fixed width sidebars', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const leftSidebar = screen.getByText('Esquerda').parentElement;
      const rightSidebar = screen.getByText('Direita').parentElement;
      
      expect(leftSidebar).toHaveClass('w-80');
      expect(rightSidebar).toHaveClass('w-80');
    });

    it('should have flexible main content area', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const mainContent = screen.getByTestId('mock-child').parentElement;
      expect(mainContent).toHaveClass('flex-1');
    });
  });

  describe('Semantic HTML', () => {
    it('should use aside elements for sidebars', () => {
      const { container } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      const asides = container.querySelectorAll('aside');
      expect(asides).toHaveLength(2);
    });

    it('should use main element for content area', () => {
      const { container } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
      expect(main?.tagName).toBe('MAIN');
    });

    it('should have proper nesting structure', () => {
      const { container } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      const mainContainer = container.firstChild as HTMLElement;
      
      expect(mainContainer.children).toHaveLength(3);
      expect(mainContainer.children[0].tagName).toBe('ASIDE');
      expect(mainContainer.children[1].tagName).toBe('MAIN');
      expect(mainContainer.children[2].tagName).toBe('ASIDE');
    });
  });

  describe('Accessibility', () => {
    it('should have main landmark', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should have complementary landmarks for sidebars', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const complementary = screen.getAllByRole('complementary');
      expect(complementary).toHaveLength(2);
    });

    it('should allow navigation through landmarks', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const main = screen.getByRole('main');
      const complementary = screen.getAllByRole('complementary');
      
      expect(main).toBeInTheDocument();
      expect(complementary[0]).toBeInTheDocument();
      expect(complementary[1]).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string children', () => {
      render(<FeedLayout>{''}</FeedLayout>);
      expect(screen.getByText('Esquerda')).toBeInTheDocument();
    });

    it('should handle boolean children', () => {
      expect(() => render(<FeedLayout>{true}</FeedLayout>)).not.toThrow();
      expect(() => render(<FeedLayout>{false}</FeedLayout>)).not.toThrow();
    });

    it('should handle number children', () => {
      render(<FeedLayout>{42}</FeedLayout>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('should maintain structure with different content lengths', () => {
      const longContent = 'A'.repeat(1000);
      render(<FeedLayout>{longContent}</FeedLayout>);
      
      expect(screen.getByText('Esquerda')).toBeInTheDocument();
      expect(screen.getByText('Direita')).toBeInTheDocument();
    });
  });

  describe('Visual Consistency', () => {
    it('should maintain consistent sidebar widths', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const leftSidebar = screen.getByText('Esquerda').parentElement;
      const rightSidebar = screen.getByText('Direita').parentElement;
      
      const leftClasses = leftSidebar?.className;
      const rightClasses = rightSidebar?.className;
      
      expect(leftClasses).toContain('w-80');
      expect(rightClasses).toContain('w-80');
    });

    it('should maintain consistent sidebar heights', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const leftSidebar = screen.getByText('Esquerda').parentElement;
      const rightSidebar = screen.getByText('Direita').parentElement;
      
      expect(leftSidebar).toHaveClass('h-full');
      expect(rightSidebar).toHaveClass('h-full');
    });

    it('should maintain consistent sidebar backgrounds', () => {
      render(<FeedLayout>{mockChildren}</FeedLayout>);
      const leftSidebar = screen.getByText('Esquerda').parentElement;
      const rightSidebar = screen.getByText('Direita').parentElement;
      
      expect(leftSidebar).toHaveClass('bg-white');
      expect(rightSidebar).toHaveClass('bg-white');
    });
  });

  describe('Re-rendering', () => {
    it('should handle children updates', () => {
      const { rerender } = render(<FeedLayout><div>Original</div></FeedLayout>);
      expect(screen.getByText('Original')).toBeInTheDocument();
      
      rerender(<FeedLayout><div>Updated</div></FeedLayout>);
      expect(screen.getByText('Updated')).toBeInTheDocument();
      expect(screen.queryByText('Original')).not.toBeInTheDocument();
    });

    it('should maintain layout structure on re-render', () => {
      const { rerender } = render(<FeedLayout>{mockChildren}</FeedLayout>);
      expect(screen.getByText('Esquerda')).toBeInTheDocument();
      
      rerender(<FeedLayout><div>New Content</div></FeedLayout>);
      expect(screen.getByText('Esquerda')).toBeInTheDocument();
      expect(screen.getByText('Direita')).toBeInTheDocument();
    });
  });
});