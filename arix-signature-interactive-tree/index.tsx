import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Optional if we had custom CSS, but we use tailwind via CDN mostly

// Tailwind configuration needs to be extended for custom animations
// We inject this script into head to extend Tailwind config dynamically
const script = document.createElement('script');
script.innerHTML = `
  tailwind.config = {
    theme: {
      extend: {
        animation: {
          'fade-in-down': 'fadeInDown 1s ease-out forwards',
          'shimmer': 'shimmer 1.5s infinite',
        },
        keyframes: {
          fadeInDown: {
            '0%': { opacity: '0', transform: 'translateY(-20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          shimmer: {
            '100%': { transform: 'translateX(100%)' },
          }
        }
      }
    }
  }
`;
document.head.appendChild(script);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);