import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine', 'three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          tsparticles: ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
        },
      },
    },
  },
});
