import jsPDF from "jspdf";

const generateInvoicePDF = (order: any) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Facture - Commande Hosting", 20, 20);

  doc.setFontSize(12);
  doc.text(`Date : ${order.date}`, 20, 35);
  doc.text(`Client ID : ${order.user.id}`, 20, 45);
  doc.text(`Offre ID : ${order.service.id}`, 20, 55);
  doc.text(`Système d'exploitation : ${order.os}`, 20, 65);
  doc.text(`Nom de la machine : ${order.machineName}`, 20, 75);
  doc.text(`Adresse IP : ${order.ip}`, 20, 85);
  doc.text(`Statut : ${order.active ? "Actif" : "Inactif"}`, 20, 95);

  if (order.voucher) {
    doc.text(`Code promo : ${order.voucher.code}`, 20, 105);
  }

  doc.save("facture.pdf");
};

export default generateInvoicePDF;
