export function formatDateFromBack(inputDate) {
  const dateObject = new Date(inputDate);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateFromFront(inputDate) {
  const [year, month, day] = inputDate.split('-');

  return `${year}-${month}-${day}T00:00:00Z`;
}