import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { CentreInput } from "~/types";

export const centreRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const centres = await ctx.prisma.centre.findMany();
    const centreNames: string[] = centres.map((centre) => centre.name);
    return centreNames;
  }),
  create: protectedProcedure
    .input(CentreInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.centre.create({
        data: {
          location: input.location,
          name: input.name,
        },
      });
    }),
});
