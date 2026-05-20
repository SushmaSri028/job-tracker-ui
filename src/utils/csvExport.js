/**
 * Convert an array of application objects to a CSV string and trigger a download.
 */
export function exportApplicationsToCSV(applications, filename = 'applications.csv') {
  if (applications.length === 0) {
    alert('No applications to export!');
    return;
  }

  const headers = [
    'Company',
    'Role',
    'Status',
    'Applied Date',
    'Location',
    'Job URL',
    'Notes',
    'Created At',
  ];

  const escape = (value) => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    // Wrap in quotes if it contains comma, newline, or quote — and escape quotes by doubling them
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = applications.map((app) => [
    escape(app.company),
    escape(app.role),
    escape(app.status),
    escape(app.appliedDate),
    escape(app.location),
    escape(app.jobUrl),
    escape(app.notes),
    escape(app.createdAt),
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');

  // Create a blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}