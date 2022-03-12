const current = Object.values(new Date().toJSON());

timestamp = {
  month: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],

  dateFormat(date) {
    const year = date.splice(0, 4).join('');
    const month = this.month[date.splice(2, 1)];
    const day = date.splice(3, 2).join('');
    const time = date.splice(4, 6).join('');
  },
};

timestamp.dateFormat(current);

module.exports = timestamp;
