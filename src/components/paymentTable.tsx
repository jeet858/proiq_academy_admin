import { type $Enums } from "@prisma/client";
import type React from "react";
import { useRef, useState } from "react";
interface Payment {
  student: {
    name: string;
    studentId: string;
    parentName: string;
  };
  course: {
    id: string;
    name: string;
  };
  centre: {
    id: string;
    name: string;
  };
  status: $Enums.PaymentStatus;
  amountPaid: number;
  paymentFor: string;
  paymentDate: Date;
  id: string;
}
const PaymentTable = ({ payments }: { payments: Payment[] }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tableContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tableContainerRef.current.offsetLeft);
    setScrollLeft(tableContainerRef.current.scrollLeft);
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tableContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - tableContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Speed factor
    tableContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up / leave
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div
      ref={tableContainerRef}
      className={`w-full overflow-x-auto ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }   select-none`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <table className="w-full border-collapse border border-[#FCD56C]">
        <thead className="bg-[#FCD56C] text-white">
          <tr className="text-center">
            <th className="border border-[#FCD56C] p-2">Payment ID</th>
            <th className="border border-[#FCD56C] p-2">Student ID</th>
            <th className="border border-[#FCD56C] p-2">Name</th>
            <th className="border border-[#FCD56C] p-2">Parent Name</th>
            <th className="border border-[#FCD56C] p-2">Subject</th>
            <th className="border border-[#FCD56C] p-2">Centre</th>
            <th className="border border-[#FCD56C] p-2">Payment Date</th>
            <th className="border border-[#FCD56C] p-2">Payment For</th>
            <th className="border border-[#FCD56C] p-2">Amount</th>
            <th className="border border-[#FCD56C] p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className="text-center hover:bg-gray-50">
              <td className="border border-[#FCD56C] p-2">
                {payment.id.substring(0, 8)}
              </td>
              <td className="border border-[#FCD56C] p-2">
                {payment.student.studentId}
              </td>
              <td className="border border-[#FCD56C] p-2">
                {payment.student.name}
              </td>
              <td className="border border-[#FCD56C] p-2">
                {payment.student.parentName}
              </td>
              <td className="border border-[#FCD56C] p-2">
                {payment.course.name}
              </td>
              <td className="border border-[#FCD56C] p-2">
                {payment.centre.name}
              </td>
              <td className="border border-[#FCD56C] p-2">
                {payment.paymentDate.toISOString().split("T")[0]}
              </td>
              <td className="border border-[#FCD56C] p-2">
                {payment.paymentFor}
              </td>
              <td className="border border-[#FCD56C] p-2">
                INR {payment.amountPaid}
              </td>
              <td
                className={`border border-[#FCD56C] p-2 ${
                  payment.status === "PAID" ? "text-green-500" : "text-red-500"
                }`}
              >
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
