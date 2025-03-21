import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const TableAllProducts = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Sold</TableHead>
          <TableHead>Invest</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((el) => (
          <TableRow key={el?._id}>
            <TableCell>{el?.name}</TableCell>
            <TableCell>{el?.category}</TableCell>
            <TableCell>{el?.totalStock}</TableCell>
            <TableCell>{el?.sold}</TableCell>
            <TableCell>{el?.invest}</TableCell>
            <TableCell>{el?.price}</TableCell>
            <TableCell><button>Delete</button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAllProducts;
