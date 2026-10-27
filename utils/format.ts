export const formatNumber = (n: number, decimals = 2) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export const formatRM = (n: number) => `RM ${formatNumber(n, 2)}`;
