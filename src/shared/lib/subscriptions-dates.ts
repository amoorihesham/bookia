export function addOneMonth(date: Date) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  return result;
}


export function getRemainingDays(renewAt: Date) {
  const now = new Date();
  const diffMs = renewAt.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24))); // convert ms → days
}
