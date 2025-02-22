import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { CourseInput } from "~/types";

export const courseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.prisma.course.findMany();
    const courseNames: string[] = courses.map((course) => course.name);
    return courseNames;
  }),
  create: protectedProcedure
    .input(CourseInput)
    .mutation(async ({ ctx, input }) => {
      const emails = input.facultyIds.map((str) => str.split(", ").pop());
      console.log("emails", emails);
      return ctx.prisma.course.create({
        data: {
          name: input.name,
          centre: {
            connect: input.centreIds.map((centreName) => ({
              name: centreName,
            })),
          },
          faculty: {
            connect: emails.map((facultyEmail) => ({
              email: facultyEmail,
            })),
          },
        },
      });
    }),
});
