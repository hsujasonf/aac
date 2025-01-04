import React from 'react';
import {render, fireEvent} from '@testing-library/react-native'; // Ensure this library is installed
import Button from './Button'; // Adjust the import path to match your file structure
import Tts from 'react-native-tts';

// Mock Tts module
jest.mock('react-native-tts', () => ({
  speak: jest.fn(),
}));

describe('Button Component', () => {
  const mockWord = 'Hello';

  it('renders the Button component with the correct word', () => {
    const {getByText} = render(<Button word={mockWord} />);
    expect(getByText(mockWord)).toBeTruthy();
  });

  it('calls Tts.speak with the correct word when pressed', () => {
    const {getByText} = render(<Button word={mockWord} />);
    const button = getByText(mockWord);

    fireEvent.press(button);

    expect(Tts.speak).toHaveBeenCalledWith(mockWord);
    expect(Tts.speak).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles to the button', () => {
    const {getByText} = render(<Button word={mockWord} />);
    const button = getByText(mockWord);

    expect(button).toHaveStyle({
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    });
  });

  it('renders without crashing', () => {
    const renderComponent = () => render(<Button word={mockWord} />);
    expect(renderComponent).not.toThrow();
  });
});
