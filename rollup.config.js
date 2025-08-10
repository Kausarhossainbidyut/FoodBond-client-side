export default {
  input: 'src/index.js',    // আপনার ইনপুট ফাইল বা অন্য সেটিং
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  treeshake: false,         // <-- এই লাইনটা যোগ করুন
  plugins: [
    // আপনার plugins
  ],
};
