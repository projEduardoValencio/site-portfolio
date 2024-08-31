import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomeComponent from './pages/Home/Home';
import './i18n/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeComponent />
  </StrictMode>
);
