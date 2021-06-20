import BigNumber from "bn.js";

const weiToGwei = (wei: number): number => {
  return wei / 1000000000;
};

export default weiToGwei;
