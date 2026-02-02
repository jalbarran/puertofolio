import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: file("src/content/projects/projects.json", { parser: (text) => JSON.parse(text).projects }),
  schema: z.object({
			title: z.string(),
			description: z.string(),
			details: z.object({
				es: z.array(z.string()),
				en: z.array(z.string()),
			}),
			skills: z.array(z.object({
				name: z.string(),
				level: z.number(),
			})),
			startDate: z.coerce.date(),
			endDate: z.coerce.date().optional(),
		})
});

const personalProjectsCollection = defineCollection({
  loader: file("src/content/personal-projects/personal-projects.json", { parser: (text) => JSON.parse(text).personalProjects }),
  schema: z.object({
			title: z.string(),
			description: z.string(),
			details: z.object({
				es: z.array(z.string()),
				en: z.array(z.string()),
			}),
			skills: z.array(z.object({
				name: z.string(),
				level: z.number(),
			})),
			startDate: z.coerce.date(),
			endDate: z.coerce.date().optional(),
		})
});

const aiCollection = defineCollection({
  loader: file("src/content/ai/ai.json", { parser: (text) => {console.log(JSON.parse(text)); return JSON.parse(text).projects} }),
  schema: z.object({
			title: z.string(),
			description: z.string(),
			details: z.object({
				es: z.array(z.string()),
				en: z.array(z.string()),
			}),
			skills: z.array(z.object({
				name: z.string(),
				level: z.number(),
			})),
			startDate: z.coerce.date(),
			endDate: z.coerce.date().optional(),
		})
});

export const collections = { projects: projectsCollection, personalProjects: personalProjectsCollection, aiProjects: aiCollection };
