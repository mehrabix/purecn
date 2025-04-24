import { applyThemes, setTheme } from '../theme-provider';

describe('ThemeProvider', () => {
  it('should have applyThemes function', () => {
    expect(applyThemes).toBeDefined();
    expect(applyThemes).toBeInstanceOf(Function);
  });

  it('should have setTheme function', () => {
    expect(setTheme).toBeDefined();
    expect(setTheme).toBeInstanceOf(Function);
  });
}); 