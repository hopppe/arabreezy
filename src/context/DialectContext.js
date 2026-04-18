import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getJSON, setJSON } from '../utils/storage';
import saudi from '../data/dialects/saudi';
import levantine from '../data/dialects/levantine';
import fusha from '../data/dialects/fusha';

const STORAGE_KEY = '@arabreezy/dialect';
const DEFAULT_DIALECT = 'saudi';

const bundles = { saudi, levantine, fusha };

const DialectContext = createContext(null);

export function DialectProvider({ children }) {
  const [dialect, setDialectState] = useState(DEFAULT_DIALECT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getJSON(STORAGE_KEY, DEFAULT_DIALECT).then((stored) => {
      if (!cancelled && stored && bundles[stored]) setDialectState(stored);
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => {
    const bundle = bundles[dialect] || bundles[DEFAULT_DIALECT];
    const setDialect = async (next) => {
      if (!bundles[next]) return;
      setDialectState(next);
      await setJSON(STORAGE_KEY, next);
    };
    return {
      dialect,
      setDialect,
      bundle,          // { words, lessons, conversations }
      availableDialects: Object.keys(bundles),
      loaded,
    };
  }, [dialect, loaded]);

  return <DialectContext.Provider value={value}>{children}</DialectContext.Provider>;
}

export function useDialect() {
  const ctx = useContext(DialectContext);
  if (!ctx) throw new Error('useDialect must be used inside DialectProvider');
  return ctx;
}
