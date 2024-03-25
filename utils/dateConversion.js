function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear().toString(); // Get last two digits of the year
    return `${day}/${month}/${year}`;
  }
  

module.exports.formatDate = formatDate
  