export function riskFor(rowIndex, colIndex) {
  const seed = (rowIndex * 7 + colIndex * 5 + rowIndex * colIndex) % 17;
  if ([0, 5, 11].includes(seed)) return 'critical';
  if ([2, 6, 9, 15].includes(seed)) return 'high';
  if ([3, 8, 13].includes(seed)) return 'medium';
  return 'low';
}

export function riskInitial(level) {
  return level === 'critical' ? 'C' : level[0].toUpperCase();
}
