import { InvoicePDF } from '../pdf/InvoicePDF';
import { pdf } from "@react-pdf/renderer";
import { generateInvoiceNumber } from "./getInvoice";
import type { Bill } from '../Types';


export const getDownloadInvoice = async (
  bill: Bill,
  enqueueSnackbar: (message: string, options?: any) => void
) => {
  try {
    const invoiceNumber = generateInvoiceNumber(Number(bill?.id ?? 0));

    const blob = await pdf(
      <InvoicePDF bill={bill} invoiceNumber={invoiceNumber} />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${invoiceNumber}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    // ✅ Success snackbar
    enqueueSnackbar("Invoice downloaded successfully", {
      variant: "success",
    });

  } catch (error) {
    console.error("Invoice download failed:", error);

    // ❌ Error snackbar
    enqueueSnackbar("Failed to download invoice", {
      variant: "error",
    });
  }
};

export const sendInvoiceWhatsapp = (bill: Bill) => {
  try {
    const invoiceNumber = generateInvoiceNumber(Number(bill?.id ?? 0));

    const discount = Number(bill.discount ?? 0);
    const advance = Number(bill.advanced ?? 0);

    const paymentStatus = bill.full_payment
      ? "Payment Status: Completed"
      : "Payment Status: Pending";

    const message = `
Hello ${bill.name},

Thank you for choosing *Puja's Touch – Luxury Bridal Makeup Studio*.

Your invoice will be shared with you shortly.

--------------------------------

Invoice No: ${invoiceNumber}
Service: ${bill.service}

Total Package: ₹${bill.total_package}
Discount: ₹${discount}
Advance Paid: ₹${advance}
Due Amount: ₹${bill.due}

${paymentStatus}

--------------------------------

Please find the invoice attached in the next message.

Warm regards,
Puja's Touch
Luxury Bridal Makeup Studio
`;

    const encoded = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/91${bill.phone}?text=${encoded}`;

    window.open(whatsappUrl, "_blank");

  } catch (error) {
    console.error("WhatsApp failed:", error);
  }
};
