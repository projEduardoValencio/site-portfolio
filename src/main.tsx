import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomeComponent from './pages/Home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeComponent/>
  </StrictMode>,
);
