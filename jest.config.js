module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Use babel-jest for JavaScript and TypeScript
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-tts|@react-native|react-navigation)/)', // Transpile problematic dependencies
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Mock CSS imports
  },
};
