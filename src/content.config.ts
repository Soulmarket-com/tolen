import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      fecha: z
        .string()
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'La fecha debe tener el formato DD/MM/AAAA')
        .transform((valor) => {
          const [dia, mes, anio] = valor.split('/').map(Number);
          return new Date(anio, mes - 1, dia);
        }),
      descripcion: z.string(),
      imagen: image(),
      lugar: z.string().optional(),
      precio: z.string().optional(),
      publicado: z.boolean().default(true),
    }),
});

export const collections = { events };
