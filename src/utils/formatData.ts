export function formatDate(inputDate: Date): string {
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();
    return `${day} ${month} ${year}`;
}
