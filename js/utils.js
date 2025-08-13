export const safeJsonParse = (text, fallback) => {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
};

export const safeLocalGet = (k, fallback) => {
  const v = localStorage.getItem(k);
  return v == null ? fallback : v;
};

export const safeLocalSet = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
};
