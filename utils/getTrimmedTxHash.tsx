const getTrimmedTxHash = (hash: string, length = 7): string => {
  return `${hash.substr(0, length)}...`;
};

export default getTrimmedTxHash;
