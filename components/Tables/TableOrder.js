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
    <>
      {/* small screen invisible, visible medium screens */}
      <Table className="max-md:hidden w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="max-lg:hidden">Phone</TableHead>
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
              <TableCell className="max-lg:hidden">
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
      {/* small screen visible, medium screens invisible */}
      {data?.map((order) => (
        <div
          key={order?._id}
          className="md:hidden flex flex-col gap-[.5rem] py-[1rem] border-b-[1px]"
        >
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Customer:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{order?.customer?.name}</h6>
              <h6>{order?.customer?.contact}</h6>
              <h6>{order?.customer?.address}</h6>
            </div>
          </div>
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Items:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{order?.products?.length}</h6>
            </div>
          </div>
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Status:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{order?.paymentStatus}</h6>
            </div>
          </div>

          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Cash:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{order?.cash}</h6>
            </div>
          </div>
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Due:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{order?.due}</h6>
            </div>
          </div>
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-3 text-[12px] font-[500]">Total Amount:</h6>
            <div className="col-span-5 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{order?.totalAmount}</h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TableOrder;
