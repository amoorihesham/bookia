import z from 'zod';

export const createNewEventSchema = z.object({
  name: z.string().min(1, { error: 'Event name is required' }),
  place: z.string().min(1, { error: 'Event place is required' }),
  guests: z.string().min(1, { error: 'Event guests required only one' }),
  cover_thumbnail: z
    .instanceof(FileList)
    .refine((file) => ['image/png', 'image/jpeg'].includes(file.item(0)!.type!) && file.item(0), {
      message: 'Unsupported file type.',
    }),
  tickets: z
    .string()
    .transform((v) => parseInt(v))
    .refine((v) => !isNaN(v) && v > 0, { error: 'Tickts must be greater than 0' }),
  ticket_price: z
    .string()
    .transform((v) => parseFloat(v))
    .refine((v) => !isNaN(v) && v > 0, { error: 'Tickt price must be greater than 0' }),
  held_on: z.date().refine((d) => d >= new Date(), { error: 'Event date must be in future.' }),
  featured: z.string().transform((v) => v === 'true'),
  open: z.string().transform((v) => v === 'true'),
});

export type createNewEventFormType = z.infer<typeof createNewEventSchema>;
export type createNewEventFormInput = z.input<typeof createNewEventSchema>;
export type createNewEventFormOutput = z.output<typeof createNewEventSchema>;
