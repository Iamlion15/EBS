function formatDateToCustomFormat(isoDate) {
    const options = { year: 'numeric', month: 'long' };
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    // Convert the day to its ordinal form (e.g., 1st, 2nd, 3rd, 4th, etc.)
    const day = date.getDate();
    const dayWithOrdinal = addOrdinalSuffix(day);
  
    // Extract the year from the formatted date
    const year = date.getFullYear();
  
    // Join the day, month, and year to create the final formatted date
    return `${dayWithOrdinal} ${formattedDate}`;
  }
  
  function addOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }
  
export default formatDateToCustomFormat;
  