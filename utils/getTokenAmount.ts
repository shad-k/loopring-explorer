const getTokenAmount = (balance, decimals) => {
  return balance / Math.pow(10, decimals);
};

export default getTokenAmount;
