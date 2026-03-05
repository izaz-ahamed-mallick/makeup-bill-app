import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link
} from "@react-pdf/renderer";

import { Font } from "@react-pdf/renderer";

Font.register({
  family: "GreatVibes",
  src: "/src/fonts/GreatVibes-Regular.ttf"
});


const styles = StyleSheet.create({

  page: {
    backgroundColor: "#ffffff",
    padding: 12,
    fontFamily: "Helvetica"
  },

  container: {
    border: "3px solid #facc15",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    flexGrow: 1
  },

  /* watermark */

  watermark: {
    position: "absolute",
    opacity: 0.04,
    width: 350,
    top: 200,
    left: 120
  },

  /* HEADER */

  header: {
    backgroundColor: "#ec4899",
    paddingTop: 14,
    paddingBottom: 10,
    alignItems: "center",
    position: "relative"
  },

  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    border: "3px solid #facc15",
    marginBottom: 4
  },

  brand: {
    fontSize: 24,
    color: "#ffd700",
    fontWeight: "bold"
  },

  tagline: {
    marginTop: 2,
    fontSize: 9,
    color: "#fff"
  },

  location: {
    fontSize: 8,
    color: "#fff",
    marginTop: 1
  },

  contactRow: {
    flexDirection: "row",
    marginTop: 6
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: "3 8",
    borderRadius: 20,
    marginHorizontal: 3
  },

  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 4
  },
  starIcon: {
    width: 5,
    height: 5,
    marginHorizontal: 2
  },

  contactText: {
    fontSize: 8,
    color: "#fff"
  }
  ,
  /* SECTION */

  section: {
    padding: 6
  },

  sectionTitle: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: "bold"
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    width: "48%",
    border: "1px solid #f5cbd8",
    borderRadius: 8,
    padding: 6,
    marginBottom: 5
  },

  cardFull: {
    width: "100%",
    border: "1px solid #f5cbd8",
    borderRadius: 8,
    padding: 6,
    marginBottom: 5
  },

  label: {
    fontSize: 7,
    color: "#777"
  },

  value: {
    fontSize: 9,
    marginTop: 1
  },

  /* PAYMENT */

  paymentBox: {
    border: "1px solid #f5cbd8",
    borderRadius: 12,
    backgroundColor: "#fff5f7",
    padding: 12
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
    borderBottom: "1px dashed #f3c6d3"
  },

  paymentLabel: {
    fontSize: 9,
    color: "#555"
  },

  paymentValue: {
    fontSize: 10,
    fontWeight: "bold"
  },

  dueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    paddingTop: 6,
    borderTop: "2px solid #f3c6d3"
  },

  dueLabel: {
    fontSize: 11,
    fontWeight: "bold"
  },

  dueValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e11d48"
  },
  /* TERMS */

  termsBox: {
    border: "1px solid #fde68a",
    backgroundColor: "#fff9db",
    borderRadius: 10,
    padding: 8
  },

  term: {
    fontSize: 7,
    marginBottom: 1
  },

  /* SIGNATURE */

  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },

  signature: {
    fontSize: 20,
    fontFamily: "GreatVibes",
    color: "#444"
  },
  smallLabel: {
    fontSize: 7,
    color: "#777"
  },
  signatureDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 10
  },

  signatureLine: {
    width: 80,
    height: 1,
    backgroundColor: "#facc15"
  },

  signatureStar: {
    fontSize: 10,
    marginLeft: 6,
    marginRight: 6,
    color: "#facc15"
  },

  /* FOOTER */

  footer: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 8,
    color: "#666"
  }
  ,
  /* GOLD DIVIDER */
  goldDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    marginBottom: 1
  },
  dividerLine: {
    width: 70,
    height: 1,
    backgroundColor: "#facc15"
  },

  dividerStar: {
    fontSize: 9,
    marginLeft: 6,
    marginRight: 6,
    color: "#facc15"
  },

  /* INVOICE BADGE */

  invoiceBadge: {
    position: "absolute",
    right: 18,
    top: 12,
    border: "1px solid #facc15",
    borderRadius: 20,
    padding: "3 8",
    fontSize: 8,
    color: "#facc15"
  },

  statusBadge: {
    position: "absolute",
    right: 18,
    top: 32,
    borderRadius: 20,
    padding: "3 8",
    fontSize: 8,
    backgroundColor: "#16a34a",
    color: "#fff"
  },

  /* FLORAL BACKGROUND */

  floralPattern: {
    position: "absolute",
    opacity: 0.09,
    width: 500,
    top: 120,
    left: 40
  },
  rupeeIcon: {
    width: 10,
    height: 10,
    marginRight: 4
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center"
  },


});

interface pdfType {
  bill: any,
  invoiceNumber: any
}

export const InvoicePDF: React.FC<pdfType> = ({ bill, invoiceNumber }) => {

  return (
    <Document>

      <Page size="A4" style={styles.page}>

        <View style={styles.container}>

          {/* WATERMARK */}
          <Image src="/floral.png" style={styles.floralPattern} />

          <Image src="/logo.png" style={styles.watermark} />
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.invoiceBadge}>
              Invoice #{invoiceNumber}
            </Text>
            <Text style={styles.statusBadge}>
              {bill.due === 0 ? "PAID" : "PENDING"}
            </Text>

            <Image src="/logo.png" style={styles.logo} />

            <Text style={styles.brand}>Puja's Touch</Text>

            <Text style={styles.tagline}>
              Luxury Bridal Makeup Studio
            </Text>

            <Text style={styles.location}>
              Khejurhati • Khandaghosh • Bardhaman
            </Text>

            <View style={styles.contactRow}>

              <View style={styles.contactItem}>
                <Image src="/call.png" style={styles.contactIcon} />
                <Text style={styles.contactText}>9064689899</Text>
              </View>

              <Link src="https://facebook.com/YOUR_PAGE" style={styles.contactItem}>
                <Image src="/fb.png" style={styles.contactIcon} />
                <Text style={styles.contactText}>Puja's Touch</Text>
              </Link>

            </View>

          </View>

          {/* CLIENT */}
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Client Information
            </Text>

            <View style={styles.grid}>

              <View style={styles.card}>
                <Text style={styles.label}>Client Name</Text>
                <Text style={styles.value}>{bill.name}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{bill.phone}</Text>
              </View>

              <View style={styles.cardFull}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.value}>{bill.address}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.label}>Booking Date</Text>
                <Text style={styles.value}>{bill.date}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.label}>Time</Text>
                <Text style={styles.value}>{bill.time}</Text>
              </View>

            </View>

          </View>
          <View style={styles.goldDivider}>
            <View style={styles.dividerLine} />
            <Image src="/star.png" style={styles.starIcon} />
            <View style={styles.dividerLine} />
          </View>
          {/* SERVICE */}
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Service Details
            </Text>

            <View style={styles.grid}>

              <View style={styles.card}>
                <Text style={styles.label}>Service</Text>
                <Text style={styles.value}>{bill.service}</Text>
              </View>

              {bill.makeup_type && (
                <View style={styles.card}>
                  <Text style={styles.label}>Makeup Type</Text>
                  <Text style={styles.value}>{bill.makeup_type}</Text>
                </View>
              )}

              <View style={styles.cardFull}>
                <Text style={styles.label}>Payment Mode</Text>
                <Text style={styles.value}>{bill.payment_mode}</Text>
              </View>

            </View>

          </View>
          <View style={styles.goldDivider}>
            <View style={styles.dividerLine} />
            <Image src="/star.png" style={styles.starIcon} />
            <View style={styles.dividerLine} />
          </View>
          {/* PAYMENT */}
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Payment Summary
            </Text>

            <View style={styles.paymentBox}>

              {/* TOTAL PACKAGE */}
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Total Package</Text>

                <View style={styles.priceRow}>
                  <Image src="/rupee.png" style={styles.rupeeIcon} />
                  <Text style={styles.paymentValue}>
                    {bill.total_package}
                  </Text>
                </View>
              </View>

              {/* DISCOUNT */}
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Discount</Text>

                <View style={styles.priceRow}>
                  <Image src="/rupee.png" style={styles.rupeeIcon} />
                  <Text style={styles.paymentValue}>
                    {bill.discount ?? 0}
                  </Text>
                </View>
              </View>

              {/* ADVANCE */}
              {bill.advanced && (
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Advance Paid</Text>

                  <View style={styles.priceRow}>
                    <Image src="/rupee.png" style={styles.rupeeIcon} />
                    <Text style={styles.paymentValue}>
                      {bill.advanced}
                    </Text>
                  </View>
                </View>
              )}

              {/* DUE */}
              <View style={styles.dueRow}>
                <Text style={styles.dueLabel}>Due Amount</Text>

                <View style={styles.priceRow}>
                  <Image src="/rupee.png" style={styles.rupeeIcon} />
                  <Text style={styles.dueValue}>
                    {bill.due}
                  </Text>
                </View>
              </View>

            </View>

          </View>
          <View style={styles.goldDivider}>
            <View style={styles.dividerLine} />
            <Image src="/star.png" style={styles.starIcon} />
            <View style={styles.dividerLine} />
          </View>
          {/* TERMS */}
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Terms & Conditions
            </Text>

            <View style={styles.termsBox}>

              <Text style={styles.term}>• Advance payment confirms the booking.</Text>
              <Text style={styles.term}>• Advance amount is non-refundable once the booking is confirmed.</Text>
              <Text style={styles.term}>• Client must arrive on time for the scheduled makeup session.</Text>
              <Text style={styles.term}>• Additional services requested on the event day may incur extra charges.</Text>
              <Text style={styles.term}>• Remaining due payment must be completed before or after service.</Text>
              <Text style={styles.term}>• Puja's Touch is not responsible for delays caused by external factors.</Text>

            </View>

          </View>
          <View style={styles.goldDivider}>
            <View style={styles.dividerLine} />
            <Image src="/star.png" style={styles.starIcon} />
            <View style={styles.dividerLine} />
          </View>
          {/* SIGNATURE */}
          <View style={styles.section}>
            <View style={styles.signatureSection}>

              {/* DATE */}
              <View style={{ alignItems: "center" }}>

                <Text style={styles.value}>{bill.confirmation_date}</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#999",
                    width: 140,
                    marginTop: 4,
                    marginBottom: 4
                  }}
                />
                <Text style={styles.smallLabel}>Date</Text>
              </View>

              {/* SIGNATURE */}
              <View style={{ alignItems: "center" }}>

                <Text style={styles.signature}>
                  {bill.signature}
                </Text>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#999",
                    width: 140,
                    marginTop: 4,
                    marginBottom: 4
                  }}
                />

                <Text style={styles.smallLabel}>
                  Authorized Signature
                </Text>

              </View>

            </View>

          </View>
          <View style={styles.goldDivider}>
            <View style={styles.dividerLine} />
            <Image src="/star.png" style={styles.starIcon} />
            <View style={styles.dividerLine} />
          </View>
          {/* FOOTER */}
          <View style={styles.footer}>

            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              Thank you for choosing Puja's Touch
            </Text>

            <Text>
              Luxury Bridal Makeup Studio
            </Text>

            <Text>
              Khejurhati • Khandaghosh • Bardhaman
            </Text>

            <Text style={{ marginTop: 2 }}>
              For bookings & inquiries contact: 9064689899
            </Text>

          </View>

        </View>

      </Page>

    </Document>
  );
};
