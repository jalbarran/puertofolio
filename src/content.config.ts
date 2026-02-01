import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			skills: z.array(z.string()),
			startDate: z.coerce.date(),
			endDate: z.coerce.date().optional(),
		}),
});

const personalProjectsCollection = defineCollection({
	loader: glob({ base: './src/content/personal-projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			skills: z.array(z.string()),
			startDate: z.coerce.date(),
			endDate: z.coerce.date().optional(),
		}),
});

export const collections = { projects: projectsCollection, personalProjects: personalProjectsCollection };
