import useBlocks from "../hooks/useBlocks";
import getDateString from "../utils/getDateString";
import getTrimmedTxHash from "../utils/getTrimmedTxHash";

export default function Home() {
  const { data, error, isLoading } = useBlocks();

  return (
    <div className="bg-white shadow-custom rounded p-4">
      <h1 className="text-3xl mb-5">Latest Blocks</h1>
      <table className="table-auto w-full border-collapse border">
        <thead className="text-left border">
          <tr>
            <th className="p-1">Block ID</th>
            <th>Submitted At</th>
            <th>L1 Tx</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.blocks.map((block) => {
              return (
                <tr className="border" key={block.id}>
                  <td className="p-1">{block.id}</td>
                  <td>{getDateString(block.timestamp)}</td>
                  <td>{getTrimmedTxHash(block.txHash, 15)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
