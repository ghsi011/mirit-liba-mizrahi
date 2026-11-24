import type { ImageMetadata } from 'astro';
import { z } from 'zod';
import content from './memorial.json';

const schema = z.strictObject({
  name: z.literal('מירית ליבה-מזרחי'),
  dedication: z.string().trim().min(1).max(140),
  photo: z.strictObject({
    file: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*\.(jpg|jpeg|png|webp|avif)$/),
    alt: z.string().trim().min(1).max(240),
  }).nullable(),
});

const approved = schema.parse(content);
const photographs = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);
const photograph = approved.photo
  ? photographs[`../assets/photos/${approved.photo.file}`]?.default
  : undefined;

if (approved.photo && !photograph) {
  throw new Error(`Photo not found: src/assets/photos/${approved.photo.file}`);
}

export const memorial = {
  name: approved.name,
  dedication: approved.dedication,
  photo: approved.photo && photograph
    ? { src: photograph, alt: approved.photo.alt }
    : null,
};
