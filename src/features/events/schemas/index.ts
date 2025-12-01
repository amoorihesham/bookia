import z from 'zod';

export const createNewEventSchema = z.object({
  name: z.string().min(1, { message: 'Event name is required' }),
  place: z.string().min(1, { message: 'Event place is required' }),
  guests: z.string().min(1, { message: 'Event guests required only one' }),
  cover_thumbnail: z
    .custom<FileList>(v => {
      if (typeof FileList !== 'undefined') {
        return v instanceof FileList;
      }
      return true;
    }, { message: 'An image is required' })
    .refine(
      file => {
        if (typeof FileList !== 'undefined' && file instanceof FileList) {
          return file.length > 0 && ['image/png', 'image/jpeg'].includes(file.item(0)?.type || '');
        }
        return true;
      },
      {
        message: 'Unsupported file type.',
      }
    ),
  tickets: z
    .string()
    .transform(v => parseInt(v))
    .refine(v => !isNaN(v) && v > 0, {
      message: 'Tickts must be greater than 0',
    }),
  ticket_price: z
    .string()
    .transform(v => parseFloat(v))
    .refine(v => !isNaN(v) && v > 0, {
      message: 'Tickt price must be greater than 0',
    }),
  held_on: z.date().refine(d => d >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: 'Event date must be in future.',
  }),
  time_on: z.string().refine(v => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v), {
    message: 'Time must be in HH:MM format',
  }),
  featured: z.string().transform(v => v === 'true'),
  open: z.string().transform(v => v === 'true'),
});

export type createNewEventFormType = z.infer<typeof createNewEventSchema>;
export type createNewEventFormInput = z.input<typeof createNewEventSchema>;
export type createNewEventFormOutput = z.output<typeof createNewEventSchema>;
