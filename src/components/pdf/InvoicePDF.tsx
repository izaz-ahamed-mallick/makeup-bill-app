import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link
} from "@react-pdf/renderer";

import type { Bill } from "../Types";

import { Font } from "@react-pdf/renderer";

Font.register({
  family: "GreatVibes",
  src: "/fonts/GreatVibes-Regular.ttf",
});
Font.register({
  family: "PlayfairDisplay",
  src: "/fonts/PlayfairDisplay.ttf",
});
const styles = StyleSheet.create({

  page: {
    backgroundColor: "#F7F1EC",
    padding: 18,
    fontFamily: "Helvetica"
  },

  container: {
    border: "1px solid #D8C3A0",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    flexGrow: 1,
    backgroundColor: "#FFFCF8"
  },

  /* watermark */

  watermark: {
    position: "absolute",
    opacity: 0.025,
    width: 400,
    top: 220,
    left: 95
  },

  /* HEADER */

  header: {
    backgroundColor: "#5A1938",
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 3,
    borderBottomColor: "#C9A45C"
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    border: "2px solid #C9A45C",
    marginBottom: 3
  },
  brand: {
    fontSize: 24,
    color: "#F3DCA7",
    fontFamily: "PlayfairDisplay",
    letterSpacing: 1.5,
  },
  tagline: {
    marginTop: 3,
    fontSize: 8,
    color: "#FFF9F0",
    letterSpacing: 1,
  },

  location: {
    fontSize: 7,
    color: "#FFF9F0",
    marginTop: 2,
    letterSpacing: 0.5
  },
  contactRow: {
    flexDirection: "row",
    marginTop: 4
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: "2 7",
    borderRadius: 20,
    marginHorizontal: 2
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
    color: "#FFF9F0"
  }
  ,
  /* SECTION */

  section: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 5
  },

  sectionTitle: {
    fontSize: 11,
    marginBottom: 7,
    fontWeight: "bold",
    color: "#5A1938",
    letterSpacing: 0.3
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    width: "48.5%",
    border: "1px solid #E8DCD5",
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 9,
    marginBottom: 5,
    backgroundColor: "#FFFFFF"
  },

  cardFull: {
    width: "100%",
    border: "1px solid #E8DCD5",
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: "#FFFFFF"
  },

  label: {
    fontSize: 7.5,
    color: "#5A1938",
    fontWeight: "bold",
    letterSpacing: 0.25,
    textTransform: "uppercase",
    marginBottom: 2
  },

  value: {
    fontSize: 8,
    marginTop: 3,
    color: "#30232A"
  },

  /* PAYMENT */

  paymentBox: {
    border: "1px solid #E5D5C4",
    borderRadius: 9,
    backgroundColor: "#FFF9F2",
    paddingVertical: 9,
    paddingHorizontal: 11
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    borderBottom: "1px solid #E9DDD4"
  },

  paymentLabel: {
    fontSize: 8,
    color: "#65545C"
  },

  paymentValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#30232A"
  },

  dueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
    paddingTop: 8,
    borderTop: "1.5px solid #C9A45C"
  },

  dueLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#5A1938"
  },

  dueValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#76294A"
  },
  /* TERMS */

  termsBox: {
    border: "1px solid #E5D5C4",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 11
  },

  term: {
    fontSize: 8,
    lineHeight: 1.5,
    marginBottom: 5,
    color: "#403038"
  },

  /* SIGNATURE */

  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 8,
    paddingHorizontal: 4
  },

  signature: {
    fontSize: 21,
    fontFamily: "GreatVibes",
    color: "#5A1938"
  },
  smallLabel: {
    fontSize: 7,
    color: "#76666C",
    letterSpacing: 0.25
  },
  signatureDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 6
  },

  signatureLine: {
    width: 80,
    height: 1,
    backgroundColor: "#C9A45C"
  },

  signatureStar: {
    fontSize: 10,
    marginLeft: 6,
    marginRight: 6,
    color: "#C9A45C"
  },

  /* FOOTER */

  footer: {
    marginTop: 3,
    textAlign: "center",
    fontSize: 7,
    color: "#75666B"
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
    backgroundColor: "#C9A45C"
  },

  dividerStar: {
    fontSize: 8,
    marginLeft: 6,
    marginRight: 6,
    color: "#C9A45C"
  },

  /* INVOICE BADGE */

  invoiceBadge: {
    position: "absolute",
    right: 18,
    top: 12,
    border: "1px solid #C9A45C",
    borderRadius: 20,
    padding: "3 8",
    fontSize: 8,
    color: "#C9A45C"
  },

  statusBadge: {
    position: "absolute",
    right: 18,
    top: 32,
    borderRadius: 20,
    padding: "3 8",
    fontSize: 8,
    backgroundColor: "#356B55",
    color: "#FFF9F0"
  },

  /* FLORAL BACKGROUND */

  floralPattern: {
    position: "absolute",
    opacity: 0.035,
    width: 420,
    top: 145,
    left: 70
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
  bill: Bill,
  invoiceNumber: string | number;
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
            <View
              style={{
                width: 80,
                height: 1,
                backgroundColor: "#D8B56D",
                marginTop: 2,
                marginBottom: 2
              }}
            />
            <Text style={styles.tagline}>
              Luxury Bridal Makeup Artist
            </Text>

            <Text style={styles.location}>
              Khejurhati • Khandaghosh • Bardhaman
            </Text>

            <View style={styles.contactRow}>

              <View style={styles.contactItem}>
                <Image src="/call.png" style={styles.contactIcon} />
                <Text style={styles.contactText}>9064689899</Text>
              </View>

              <Link src="https://www.facebook.com/share/1891GsRTi7/?mibextid=wwXIfr" style={styles.contactItem}>
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
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
                  <Image
                    src="/calender.png"
                    style={{ width: 9, height: 9, marginRight: 4 }}
                  />
                  <Text style={styles.value}>{bill.date}</Text>
                </View>
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

              {bill.services?.map((service, index) => (

                <View key={index} style={styles.cardFull}>

                  <Text style={styles.label}>
                    {index === 0 ? "Primary Service" : `Service ${index + 1}`}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >

                    {/* SERVICE INFO */}
                    <View style={{ flexDirection: "column" }}>

                      <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                        {service.service}
                      </Text>

                      <Text style={{ fontSize: 8, color: "#75666B", marginTop: 1 }}>
                        {service.makeup_type}
                      </Text>

                      {/* SERVICE DATE */}
                      {/* SERVICE DATE */}
                      {service.serviceDate && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 3
                          }}
                        >
                          <Image
                            src="/calender.png"
                            style={{ width: 8, height: 8, marginRight: 3 }}
                          />

                          <Text style={{ fontSize: 8, color: "#65545C" }}>
                            {service.serviceDate}
                          </Text>
                        </View>
                      )}

                      {/* SERVICE TIME */}
                      {service.serviceTime && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 2
                          }}
                        >
                          <Image
                            src="/clock.png"
                            style={{ width: 8, height: 8, marginRight: 3 }}
                          />

                          <Text style={{ fontSize: 8, color: "#65545C" }}>
                            {service.serviceTime}
                          </Text>
                        </View>
                      )}

                      {/* SERVICE LOCATION */}
                      {service.location && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 2
                          }}
                        >
                          <Image
                            src="/location.png"
                            style={{ width: 8, height: 8, marginRight: 3 }}
                          />

                          <Text style={{ fontSize: 8, color: "#65545C" }}>
                            {service.location}
                          </Text>
                        </View>
                      )}

                    </View>

                    {/* PRICE */}
                    <View style={styles.priceRow}>
                      <Image src="/rupee.png" style={styles.rupeeIcon} />

                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          color: "#76294A"
                        }}
                      >
                        {service.price}
                      </Text>
                    </View>

                  </View>

                </View>

              ))}

              {/* PAYMENT MODE */}
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
          <View wrap={false} style={styles.section}>

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
          {/* TERMS: keep the divider, heading and all conditions together */}
          <View wrap={false}>
            <View style={styles.goldDivider}>
              <View style={styles.dividerLine} />
              <Image src="/star.png" style={styles.starIcon} />
              <View style={styles.dividerLine} />
            </View>
            <View style={styles.section} wrap={false}>

            <Text style={styles.sectionTitle}>
              Terms & Conditions
            </Text>

            <View style={styles.termsBox} wrap={false}>

              <Text style={styles.term}>• Advance payment confirms the booking.</Text>
              <Text style={styles.term}>• Advance amount is non-refundable once the booking is confirmed.</Text>
              <Text style={styles.term}>• Client must arrive on time for the scheduled makeup session.</Text>
              <Text style={styles.term}>• Additional services requested on the event day may incur extra charges.</Text>
              <Text style={styles.term}>• Remaining due payment must be completed before or after service.</Text>
              <Text style={styles.term}>• Puja's Touch is not responsible for delays caused by external factors.</Text>

            </View>
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
                    borderBottomColor: "#C4B5B9",
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
                    borderBottomColor: "#C4B5B9",
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
