const getTrimmedTxHash = (
  hash: string,
  length = 7,
  isDivided = false
): string => {
  const firstPartEnd = length / 2;
  if (isDivided)
    return `${hash.substr(0, firstPartEnd)}...${hash.substr(-firstPartEnd)}`;
  else return `${hash.substr(0, length)}...`;
};

export default getTrimmedTxHash;
