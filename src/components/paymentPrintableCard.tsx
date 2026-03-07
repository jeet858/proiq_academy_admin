"use client";

import { add } from "date-fns";
import bg from "../../public/print-bg.png";
import Image from "next/image";
import React, { forwardRef } from "react";

export interface Props {
  studentId: string;
  name: string;
  parentName: string;
  subject: string;
  centre: string;
  date?: string;
  months: Date[];
  paymentFor: string;
  amount: string;
  status: string;
  address?: string;
  contactNumber1?: string;
  contactNumber2?: string;
}

const PrintablePaymentCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      studentId,
      name,
      parentName,
      subject,
      centre,
      date,
      months,
      paymentFor,
      amount,
      status,
      address,
      contactNumber1,
      contactNumber2,
    },
    ref
  ) => {
    function numberToWords(num: number): string {
      if (num === 0) return "zero";

      const belowTwenty = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ];

      const tens = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];

      const thousands = ["", "Thousand", "Million", "Billion"];

      function helper(n: number): string {
        if (n === 0) return "";
        if (n < 20) return belowTwenty[n] + " ";
        if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
        return belowTwenty[Math.floor(n / 100)] + " hundred " + helper(n % 100);
      }

      let result = "";
      let i = 0;

      while (num > 0) {
        if (num % 1000 !== 0) {
          result = helper(num % 1000) + thousands[i] + " " + result;
        }
        num = Math.floor(num / 1000);
        i++;
      }

      return result.trim();
    }

    return (
      <div
        className="m-0 h-[1123px] max-h-[1123px] w-[793px] max-w-[793px] overflow-hidden bg-white p-0"
        ref={ref}
      >
        <img
          src="print-bg.png"
          alt="A4 Print"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="relative z-10 flex h-full flex-col px-20 pt-[220px]">
          <h1 className="mb-6 text-center text-2xl font-bold">
            Payment Receipt
          </h1>

          <div className="grid grid-cols-4 border-2 border-black text-lg">
            <div className="col-span-3 border border-black py-1 pl-2 font-bold">
              Received From
            </div>
            <div className="border border-black pl-2 font-bold">
              Payment Date
            </div>

            <div className="col-span-3 border border-black py-1 pl-2">
              {name}
            </div>
            <div className="border border-black py-1 pl-2">{date}</div>

            <div className="col-span-3 border border-black py-1 pl-2 font-bold">
              Address
            </div>
            <div className="border border-black py-1 pl-2 font-bold">
              ID No.
            </div>

            <div className="col-span-3 row-span-2 border border-black py-1 pl-2">
              {address}
            </div>
            <div className="border border-black py-1 pl-2">{studentId}</div>
            <div className="border border-black py-1 pl-2 font-bold">
              Centre
            </div>
            <div className="border border-black py-1 pl-2 font-bold">
              Contact No.
            </div>
            <div className="col-span-2 border border-black py-1 pl-2">
              {contactNumber1} / {contactNumber2}
            </div>
            <div className="border border-black py-1 pl-2">{centre}</div>
          </div>

          <div className="mt-3 grid grid-cols-4 grid-rows-6 border-2 border-black text-lg">
            <div className="border border-black py-1 pl-2 font-bold">
              Subject
            </div>
            <div className="border border-black py-1 pl-2 font-bold">
              Payment For
            </div>
            <div className="border border-black py-1 pl-2 font-bold">
              Payment Month
            </div>
            <div className="border border-black py-1 pl-2 font-bold">
              Amount
            </div>

            <div className="row-span-3 border border-black py-1 pl-2">
              {subject}
            </div>
            <div className="row-span-3 border border-black py-1 pl-2">
              {paymentFor}
            </div>

            <div className="row-span-3 border border-black py-1 pl-2">
              {months.map((month, i) => (
                <p key={i}>
                  {month.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              ))}
            </div>

            <div className="row-span-3 border border-black py-1 pl-2">
              {amount}
            </div>

            <div className="col-span-2 row-span-2 border border-black py-1 pl-2">
              Amount In Words:{" "}
              {numberToWords(parseInt(amount.replace(/[^0-9]/g, "")))} Only
            </div>

            <div className="border border-black py-1 pl-2 font-bold">
              Total Amount
            </div>
            <div className="border border-black py-1 pl-2">{amount}</div>

            <div className="border border-black py-1 pl-2 font-bold">
              Payment Status
            </div>
            <div className="border border-black py-1 pl-2">{status}</div>
          </div>

          <div className="mt-3 w-[360px] border-2 border-black text-lg">
            <div className="pl-2 italic underline">Banking Details</div>

            <div className="pl-2">Account Name : PRO IQ ACADEMY</div>

            <div className="pl-2">Bank : AXIS BANK LTD (HARIPAL BRANCH)</div>

            <div className="pl-2">A/C NO. : 925020034772881</div>

            <div className="pl-2">IFS CODE : UTIB0003045</div>
          </div>
        </div>
        <style jsx global>{`
          @page {
            size: A4 portrait;
            margin: 0;
          }

          @media print {
            html,
            body {
              margin: 0;
              padding: 0;
            }

            .print-area,
            .print-area * {
              visibility: visible;
            }
          }
        `}</style>
      </div>
    );
  }
);

PrintablePaymentCard.displayName = "PrintableStudentCard";
export default PrintablePaymentCard;
