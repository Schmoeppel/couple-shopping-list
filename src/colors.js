// Central color configuration for the entire app
// Warm, cozy theme with distinct person colors

const colors = {
  // Person-specific colors (distinct and easily recognizable)
  thomas: {
    primary: '#e67e22',      // Warm orange
    light: '#ffecd1',        // Light peachy background
    gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
  },
  chantale: {
    primary: '#e84393',      // Vibrant pink
    light: '#ffe6f0',        // Light pink background
    gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
  },
  both: {
    primary: '#00b894',      // Teal/green
    light: '#d5f4e6',        // Light mint background
    gradient: 'linear-gradient(135deg, #55efc4 0%, #00b894 100%)',
  },

  // Primary theme colors (cozy warm tones)
  primary: {
    main: '#d35400',         // Deep warm orange
    light: '#e67e22',        // Lighter warm orange
    gradient: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
  },

  // Background colors
  background: {
    page: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',  // Warm peachy gradient
    card: '#ffffff',
    secondary: '#f8f9fa',
    hover: '#f0f1f3',
  },

  // UI element colors
  text: {
    primary: '#333333',
    secondary: '#666666',
    muted: '#999999',
    light: '#ffffff',
  },

  border: {
    light: '#e0e0e0',
    medium: '#cccccc',
    dark: '#999999',
  },

  // Status colors
  status: {
    success: '#00b894',
    error: '#ff6b6b',
    warning: '#fdcb6e',
    info: '#74b9ff',
  },

  // Accent colors
  accent: {
    scrollbar: '#e67e22',
    link: '#d35400',
    hover: '#c0392b',
  },
};

// Helper function to get gradient string
export const getGradient = (person) => {
  const map = {
    Thomas: colors.thomas.gradient,
    Chantale: colors.chantale.gradient,
    Both: colors.both.gradient,
  };
  return map[person] || colors.primary.gradient;
};

// Helper function to get primary color
export const getPrimaryColor = (person) => {
  const map = {
    Thomas: colors.thomas.primary,
    Chantale: colors.chantale.primary,
    Both: colors.both.primary,
  };
  return map[person] || colors.primary.main;
};

// Helper function to get light background color
export const getLightColor = (person) => {
  const map = {
    Thomas: colors.thomas.light,
    Chantale: colors.chantale.light,
    Both: colors.both.light,
  };
  return map[person] || colors.background.secondary;
};

export default colors;
