export default function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo', 
      '@babel/preset-env', // Ensure CommonJS support for Node.js
    ],
    plugins: [
      ['module:react-native-dotenv', { moduleName: '@env', path: '.env' }],
    ],
  };
}
