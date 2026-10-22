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
    if (!bill.phone?.trim()) {
      console.error("Phone number is missing");
      return;
    }

    const phone = bill.phone.replace(/\D/g, "");

    const formattedPhone = phone.startsWith("91")
      ? phone
      : `91${phone}`;

    if (!/^91\d{10}$/.test(formattedPhone)) {
      console.error("Invalid phone number:", bill.phone);
      return;
    }

    const message = `Hello ${bill.name},

Greetings from *Puja's Touch – Luxury Bridal Makeup Artist*

Your booking invoice is ready. Please review the invoice for the complete service and payment details.

If you have any questions, feel free to contact us.

Thank you for choosing *Puja's Touch*.
We look forward to making your special day even more beautiful.

Warm regards,
*Puja's Touch*
Luxury Bridal Makeup Artist`;

    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("WhatsApp failed:", error);
  }
};
