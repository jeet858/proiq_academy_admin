import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { MonthlyPaymentInput, PaymentInput } from "~/types";
export const paymentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(PaymentInput)
    .mutation(async ({ ctx, input }) => {
      if (input.paymentFor === "Course Fees") {
        return await ctx.prisma.payment.create({
          data: {
            amountPaid: input.amountPaid,
            paymentDate: input.paymentDate,
            status: input.status,
            centreId: input.centreId,
            courseId: input.courseId,
            studentId: input.studentId,
            paymentFor: input.paymentFor,
          },
        });
      } else {
        const payment = ctx.prisma.payment.create({
          data: {
            amountPaid: input.amountPaid,
            paymentDate: input.paymentDate,
            status: input.status,
            centreId: input.centreId,
            courseId: input.courseId,
            studentId: input.studentId,
            paymentFor: input.paymentFor,
          },
        });
        const updateStudent = ctx.prisma.student.update({
          where: {
            studentId: input.studentId,
          },
          data: {
            readdmissionPaymentStatus: true,
          },
        });
        return await ctx.prisma.$transaction([payment, updateStudent]);
      }
    }),
  getMonthlyPayments: protectedProcedure
    .input(MonthlyPaymentInput)
    .query(async ({ ctx, input }) => {
      const [year, month] = input.month.split("-").map(Number); // Convert "YYYY-MM" to numbers

      const startDate = new Date(
        Date.UTC(year ?? 0, (month ?? 1) - 1, 1, 0, 0, 0, 0)
      ); // 1st of month, UTC 00:00:00
      const endDate = new Date(
        Date.UTC(year ?? 0, month ?? 0, 0, 23, 59, 59, 999)
      ); // Last day of month, UTC 23:59:59

      console.log("start date", startDate.toISOString());
      console.log("end date", endDate.toISOString());

      const payments = await ctx.prisma.payment.findMany({
        where: {
          paymentDate: {
            gte: startDate, // Greater than or equal to the first day of the month
            lte: endDate, // Less than or equal to the last day of the month
          },
          centreId: input.centreId,
          courseId: input.courseId,
          studentId: input.studentId,
        },
        select: {
          amountPaid: true,
          centre: {
            select: {
              name: true,
            },
          },
          course: {
            select: {
              name: true,
            },
          },
          id: true,
          paymentDate: true,
          status: true,
          student: {
            select: {
              name: true,
              parentName: true,
            },
          },
        },
      });
      return payments;
    }),
  getAllMonthlyPayments: protectedProcedure
    .input(
      z.object({
        startingMonth: z.string({
          required_error: "Starting Month can't be empty",
        }),
        endingMonth: z.string().optional(), // Allow empty value
      })
    )
    .query(async ({ ctx, input }) => {
      const [year, month] = input.startingMonth.split("-").map(Number);

      // If endingMonth is empty or not provided, use the current month
      const currentDate = new Date();
      const [endingYear, endingMonth] = input.endingMonth
        ? input.endingMonth.split("-").map(Number)
        : [currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1];

      const startDate = new Date(
        Date.UTC(year ?? 0, (month ?? 1) - 1, 1, 0, 0, 0, 0)
      ); // 1st of month, UTC 00:00:00

      const endDate = new Date(
        Date.UTC(endingYear ?? 0, endingMonth ?? 0, 0, 23, 59, 59, 999)
      ); // Last day of month, UTC 23:59:59

      console.log("start date", startDate.toISOString());
      console.log("end date", endDate.toISOString());

      const payments = await ctx.prisma.payment.findMany({
        where: {
          paymentDate: {
            gte: startDate, // Greater than or equal to the first day of the month
            lte: endDate, // Less than or equal to the last day of the month
          },
        },
        select: {
          amountPaid: true,
          centre: {
            select: {
              id: true,
              name: true,
            },
          },
          course: {
            select: {
              id: true,
              name: true,
            },
          },
          id: true,
          paymentDate: true,
          paymentFor: true,
          status: true,
          student: {
            select: {
              studentId: true,
              name: true,
              parentName: true,
            },
          },
        },
      });

      return payments;
    }),
});
