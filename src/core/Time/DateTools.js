// ===========================================
//
//
//
// ===========================================
// ===========================================

class DateTools {

  // Calculate the number of weeks between two dates
  static weeksBetween(date1, date2) {
    return Math.round((date2 - date1) / (7 * 24 * 60 * 60 * 1000));
  }

  // Calculate the number of fortnights between two dates
  static fortnightsBetween(date1, date2) {
    return Math.round((date2 - date1) / (14 * 24 * 60 * 60 * 1000));
  }

  // Calculate the number of months between two dates
  static monthsBetween(date1, date2) {
    return Math.round((date2 - date1) / (30 * 24 * 60 * 60 * 1000));
  }

  // Get the difference
  static time_difference(date1, date2) {
    date1 = this.ensure_date(date1);
    date2 = this.ensure_date(date2);
    return date2.getTime() - date1.getTime();
  }

  // format the date as yyyy-mm-dd
  static get_yyyy_mm_dd(date) {

    // If the date is a string, convert it to a date object
    if(typeof date === 'string') {
      date = new Date(date);
    }

    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return date.toString();
  }

  static dd_mm_yyyy(date) {
    // If the date is a string, convert it to a date object
    if(typeof date === 'string') {
      date = new Date(date);
    }

    date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return date.toString();
  }

  
  static dd_mm_yyyy_hh_mm_ss(date) {
    // If the date is a string, convert it to a date object
    if (typeof date === 'string') {
      date = new Date(date);
    }
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }
  
  static ensure_date(date) {
    if(typeof date === 'string') {
      date = new Date(date);
    }
    return date;
  }
}

module.exports = DateTools;
