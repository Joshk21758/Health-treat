"use client";

export default function FacilityMetricsExport({ metrics, topServices }) {
  const downloadPdf = () => {
    const rows = [
      ["Metric", "Value"],
      ["Completed consultations", metrics.completedConsultations.toString()],
      ["Bookings today", metrics.totalBookingsToday.toString()],
      ["Service demand", metrics.totalAppointments.toString()],
      [],
      ["Service", "Count"],
      ...topServices.map((item) => [item.service, item.count.toString()]),
    ];

    const csvContent = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/pdf;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "facility-metrics.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={downloadPdf}
      className="inline-flex items-center rounded-full bg-gray-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-green-700 cursor-pointer"
    >
      Export Metrics to PDF
    </button>
  );
}
