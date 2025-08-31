import { Hairstyle } from './types';

export const WOMENS_HAIRSTYLES: Hairstyle[] = [
  {
    id: 'pixie',
    name: 'Short Pixie Cut',
    prompt: 'Give the person in the image a chic, short pixie cut. Make it look modern and textured.',
    imageUrl: 'https://picsum.photos/seed/pixie/400/400',
    gender: 'female',
  },
  {
    id: 'bob',
    name: 'Classic Bob',
    prompt: 'Transform the hair into a classic, sharp bob that ends at the chin line. Keep it sleek and stylish.',
    imageUrl: 'https://picsum.photos/seed/bob/400/400',
    gender: 'female',
  },
  {
    id: 'long_layers',
    name: 'Long Layers',
    prompt: 'Add long, flowing layers to the hair, creating volume and movement. The hair should look healthy and long.',
    imageUrl: 'https://picsum.photos/seed/longlayers/400/400',
    gender: 'female',
  },
  {
    id: 'curly_shag',
    name: 'Curly Shag',
    prompt: 'Create a curly shag haircut with lots of texture and layers. It should have a rock-and-roll vibe with a defined fringe.',
    imageUrl: 'https://picsum.photos/seed/curlyshag/400/400',
    gender: 'female',
  },
  {
    id: 'curtain_bangs',
    name: 'Curtain Bangs',
    prompt: 'Add stylish, face-framing curtain bangs to the existing hair. The bangs should part in the middle and sweep to the sides.',
    imageUrl: 'https://picsum.photos/seed/curtainbangs/400/400',
    gender: 'female',
  },
    {
    id: 'messy_bun',
    name: 'Messy Bun',
    prompt: 'Style the hair into an elegant but slightly messy bun on top of the head, with a few loose strands framing the face.',
    imageUrl: 'https://picsum.photos/seed/messybun/400/400',
    gender: 'female',
  },
];

export const MENS_HAIRSTYLES: Hairstyle[] = [
    {
    id: 'buzz_cut',
    name: 'Bold Buzz Cut',
    prompt: 'Give the person a very short, bold buzz cut. Ensure it\'s even and clean.',
    imageUrl: 'https://picsum.photos/seed/buzzcut/400/400',
    gender: 'male',
  },
  {
    id: 'mohawk',
    name: 'Punk Mohawk',
    prompt: 'Create a dramatic punk mohawk. The sides should be shaved, and the center strip should be styled upwards.',
    imageUrl: 'https://picsum.photos/seed/mohawk/400/400',
    gender: 'male',
  },
  {
    id: 'side_part',
    name: 'Slick Side Part',
    prompt: 'Style the hair into a sleek, classic side part. It should look professional and well-groomed.',
    imageUrl: 'https://picsum.photos/seed/sidepart/400/400',
    gender: 'male',
  },
    {
    id: 'crew_cut',
    name: 'Classic Crew Cut',
    prompt: 'Give the person a classic crew cut, with the hair on top cut short and the sides faded.',
    imageUrl: 'https://picsum.photos/seed/crewcut/400/400',
    gender: 'male',
  },
  {
    id: 'undercut',
    name: 'Modern Undercut',
    prompt: 'Create a modern undercut hairstyle. The sides and back should be shaved short, leaving a longer section of hair on top.',
    imageUrl: 'https://picsum.photos/seed/undercut/400/400',
    gender: 'male',
  },
    {
    id: 'long_male',
    name: 'Flowing Long Hair',
    prompt: 'Give the person long, flowing hair that goes past the shoulders. It should look natural and slightly wavy.',
    imageUrl: 'https://picsum.photos/seed/longmale/400/400',
    gender: 'male',
  },
];

export const LOADING_MESSAGES: string[] = [
  "Mixing the perfect hair color...",
  "Sharpening the virtual scissors...",
  "Consulting with our AI stylists...",
  "Applying the finishing touches...",
  "Just a moment, perfection takes time...",
  "Getting the angles just right..."
];