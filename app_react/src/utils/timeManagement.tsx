export function displayToday(): string {
  const today: Date = new Date();
  const dd: string = String(today.getDate()).padStart(2, "0");
  const mm: string = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy: string = String(today.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}
