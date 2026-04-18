import React, { createContext, useContext, useMemo, useState } from 'react';
import { translations, languages, defaultLanguage } from '../i18n';

const LanguageContext = createContext(null);

function resolve(strings, key) {
  return key.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), strings);
}

function format(template, params) {
  if (!params || typeof template !== 'string') return template;
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    params[k] != null ? String(params[k]) : `{${k}}`
  );
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(defaultLanguage);

  const value = useMemo(() => {
    const strings = translations[language] || translations[defaultLanguage];
    const meta = languages.find((l) => l.code === language) || languages[0];
    const t = (key, params) => {
      const hit = resolve(strings, key);
      if (hit == null) return key;
      return format(hit, params);
    };
    return {
      language,
      setLanguage,
      isRTL: !!meta.rtl,
      t,
      languages,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}
