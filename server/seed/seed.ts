import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

export const seedUserData = async (userId: string): Promise<void> => {
    try {
        const dataFolder = path.join(__dirname, "data");

        const sites = JSON.parse(fs.readFileSync(path.join(dataFolder, "sites.json"), "utf-8"));
        const measurements = JSON.parse(fs.readFileSync(path.join(dataFolder, "measurements.json"), "utf-8"));
        const thresholds = JSON.parse(fs.readFileSync(path.join(dataFolder, "thresholds.json"), "utf-8"));
        const notes = JSON.parse(fs.readFileSync(path.join(dataFolder, "notes.json"), "utf-8"));

        // Seed Sites
        for (const site of sites) {
            const createdSite = await prisma.site.create({
                data: { ...site, userId },
            });

            // Seed Neasurements
            for (const measurement of measurements) {
                await prisma.measurement.create({
                    data: {
                        ...measurement,
                        siteId: createdSite.id,
                    },
                });
            }
        }

        // Seed Thresholds
        for (const threshold of thresholds) {
            await prisma.threshold.create({
                data: { ...threshold, userId },
            });
        }

        // Seed Notes
        for (const note of notes) {
            await prisma.note.create({
                data: { ...note, userId },
            });
        }
    } catch (error) {
        console.error("Error seeding the user data", error);
        throw new Error("Failed to seed user data");
    } finally {
        await prisma.$disconnect();
    }
};
