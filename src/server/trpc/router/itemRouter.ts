import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const itemRouter = router({
  addItem: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = input;
      const item = await ctx.prisma.shoppingItem.create({
        data: {
          name,
        },
      });
      return item;
    }),
  getAllItems: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.shoppingItem.findMany();
    return items;
  }),
});
