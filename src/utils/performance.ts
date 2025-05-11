export const measurePerformance = (label: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.time(label);
    return () => console.timeEnd(label);
  }
  return () => {};
};

export const logPerformance = (label: string, duration: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${label}: ${duration}ms`);
  }
};

export const withPerformanceTracking = <T extends (...args: any[]) => any>(
  fn: T,
  label: string
): T => {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    logPerformance(label, end - start);
    return result;
  }) as T;
}; 