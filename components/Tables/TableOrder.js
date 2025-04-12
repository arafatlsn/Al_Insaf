"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const TableOrder = ({ data }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>Cash</TableHead>
          <TableHead>Due</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((el) => (
          <TableRow key={el?._id}>
            <TableCell>{el?.customer?.name}</TableCell>
            <TableCell>
              {el?.customer?.contact ? (
                el?.customer?.contact
              ) : (
                <span className="text-gray-400">Null</span>
              )}
            </TableCell>
            <TableCell>
              {el?.customer?.address ? (
                el?.customer?.address
              ) : (
                <span className="text-gray-400">Null</span>
              )}
            </TableCell>
            <TableCell>{el?.products?.length}</TableCell>
            <TableCell>
              {el?.paymentStatus === "paid" ? (
                <span className="text-success">{el?.paymentStatus}</span>
              ) : (
                <span className="text-failed">{el?.paymentStatus}</span>
              )}
            </TableCell>
            <TableCell>
              {el?.cash === el?.totalAmount ? (
                <span className="text-success">{el?.cash}</span>
              ) : (
                <span className="text-failed">{el?.cash}</span>
              )}
            </TableCell>
            <TableCell>
              {el?.due > 0 ? (
                <span className="text-failed">{el?.due}</span>
              ) : (
                <span className="text-success">{el?.due}</span>
              )}
            </TableCell>
            <TableCell>{el?.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableOrder;
