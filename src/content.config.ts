import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      fecha: z
        .object({ dia: z.number(), mes: z.number(), anio: z.number() })
        .transform(({ dia, mes, anio }) => new Date(anio, mes - 1, dia)),
      descripcion: z.string(),
      imagen: image(),
      lugar: z.string().optional(),
      precio: z.string().optional(),
      publicado: z.boolean().default(true),
    }),
});

export const collections = { events };
