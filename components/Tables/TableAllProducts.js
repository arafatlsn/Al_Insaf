import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toDateStringFn } from "@/utils/toDateStringFn";

const TableAllProducts = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead className="text-left px-0">Purchases History</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Sold</TableHead>
          <TableHead>Invest</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((el) => (
          <TableRow className="odd:bg-background" key={el?._id}>
            <TableCell className="align-top">{el?.name}</TableCell>
            <TableCell className="align-top">{el?.sku}</TableCell>
            <TableCell className="align-top p-0">
              <Table className="p-0 m-0">
                <TableHeader className="p-0">
                  <TableRow className="h-3 p-0 m-0">
                    <TableHead className="py-0 pt-1 px-0 h-0">Cost</TableHead>
                    <TableHead className="py-0 pt-1 px-0 h-0">Stock</TableHead>
                    <TableHead className="py-0 pt-1 px-0 h-0">Expired</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="p-0">
                  {el?.purchase?.map((el) => (
                    <TableRow className="h-3 p-0 m-0" key={el?._id}>
                      <TableCell className="py-1 px-0">{el?.buyingCost + el?.serviceCost}</TableCell>
                      <TableCell className="py-1 px-0">{el?.stock}</TableCell>
                      <TableCell className="py-1 px-0">{toDateStringFn(el?.expired)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>
            <TableCell className="align-top">{el?.totalStock}</TableCell>
            <TableCell className="align-top">{el?.sold}</TableCell>
            <TableCell className="align-top">{el?.invest}</TableCell>
            <TableCell className="align-top">{el?.price}</TableCell>
            <TableCell className="align-top">
              <button>Delete</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAllProducts;
