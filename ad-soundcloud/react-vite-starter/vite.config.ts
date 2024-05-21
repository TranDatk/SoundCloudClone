import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';

import dns from 'dns'
// https://vitejs.dev/config/server-options.html#server-options
//if u want to run as 127.0.0.1, comment the next line below
dns.setDefaultResultOrder('verbatim')


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173,
  // },
})
