import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import localforage from 'localforage';
import '@testing-library/jest-dom/vitest';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(async () => {
  cleanup();
  localforage.clear();
});