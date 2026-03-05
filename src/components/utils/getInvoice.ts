export const generateInvoiceNumber = (id: number) => {
  const year = new Date().getFullYear();

  return `PT-${year}-${id.toString().padStart(5, "0")}`;
};
