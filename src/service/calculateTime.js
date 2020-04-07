const chargeViaTime = hour => {
  if (hour < 3) {
    return 10;
  }

  return 10 * (hour - 1); // = 10 * (hour - 2) + 10; 
};

module.exports = {
  chargeViaTime
};
