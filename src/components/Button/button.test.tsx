import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './button';

const defaultProps = {
  // Mock Functions [https://jestjs.io/docs/mock-functions]
  // Firing Events [https://testing-library.com/docs/dom-testing-library/api-events/]
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 't-class'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button { ...defaultProps }>default button</Button>);
    /*
     * 由 queryByText 改为 getByText
     * queryByText 会返回 HTMLElement 或 null，此时无法使用 element 上面的属性
     * getByText 只返回 HTMLElement 用它！
     * 另，此时获取到为 HTMLElement，需主动断言为 HTMLButtonElement
    */
    const element = wrapper.getByText('default button') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render the correct component based on diffent props', () => {
    const wrapper = render(<Button { ...testProps }>large primary button</Button>);
    const element = wrapper.getByText('large primary button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg t-class');
  });

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="https://www.baidu.com">
        link button
      </Button>
    );
    const element = wrapper.getByText('link button');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button { ...disabledProps }>disabled button</Button>);
    const element = wrapper.getByText('disabled button') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
})