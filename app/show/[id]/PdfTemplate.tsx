import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

export const PdfTemplate = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
    },
    container: {
      margin: 10,
      padding: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: "bold",
      color: "blue",
    },
    pageBackground: {
      position: "absolute",
      minWidth: "100%",
      minHeight: "100%",
      height: "100%",
      width: "100%",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <Image src="/pdf_bg.svg" style={styles.pageBackground} />
        <View style={styles.container}>
          <Text style={styles.text}>Simple PDF Example</Text>
        </View>
        <View style={styles.container}>
          <Text>How would you like modify.</Text>
        </View>
      </Page>
    </Document>
  );
};
