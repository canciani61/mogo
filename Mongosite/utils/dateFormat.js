// Format timestamp function
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    
    // Get month, day, year
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Get time
    let hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, set it to 12
    
    return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
  };
  
  module.exports = formatDate;