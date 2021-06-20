import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import { block } from "../graphql/fragments";

const FETCH_BLOCK = gql`
  query block($id: ID!) {
    block(id: $id) {
      ...BlockFragment
      data
    }
  }
  ${block}
`;

const useBlock = (id) => {
  console.log(id);
  const { data, error } = useSWR([FETCH_BLOCK, id], (query, id) =>
    request(LOOPRING_SUBGRAPH, query, {
      id,
    })
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useBlock;
