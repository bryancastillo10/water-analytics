import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

export const seedUserData = async (userId: string): Promise<void> => {
    try {
        const dataFolder = path.join(__dirname, 'data');

        // Sites Data
        const sites = JSON.parse(fs.readFileSync(path.join(dataFolder, "sites.json"), "utf-8"));
        const siteIdMap: Record<string, string> = {};
        for (const site of sites) {
            const createdSite = await prisma.site.create({
                data: { ...site, userId }
            });
            siteIdMap[site.id] = createdSite.id;
        }

        // Measurements Data
        const measurements = JSON.parse(fs.readFileSync(path.join(dataFolder, "measurements.json"), "utf-8"));
        const measurementsBySite: Record<string, any[]> = {};
        measurements.forEach((measurement: { siteId: string }) => {
            if (!measurementsBySite[measurement.siteId]) {
                measurementsBySite[measurement.siteId] = [];
            }
            measurementsBySite[measurement.siteId].push(measurement);
        });

        for (const [originalSiteId, siteMeasurements] of Object.entries(measurementsBySite)) {
            const mappedSiteId = siteIdMap[originalSiteId];
            
            if (mappedSiteId) {
                for (const measurement of siteMeasurements) {
                    await prisma.measurement.create({
                        data: {
                            ...measurement,
                            siteId: mappedSiteId
                        }
                    });
                }
            }
        }

        // Thresholds Data
        const thresholds = JSON.parse(fs.readFileSync(path.join(dataFolder, "thresholds.json"), "utf-8"));
        for (const threshold of thresholds) {
            await prisma.threshold.create({
                data: { ...threshold, userId }
            });
        }

        //Notes Data
        const notes = JSON.parse(fs.readFileSync(path.join(dataFolder, "notes.json"), "utf-8"));
        for (const note of notes) {
            await prisma.note.create({
                data: { ...note, userId }
            });
        }

    } catch (error) {
        console.error('Error seeding the user data', error);
        throw new Error('Failed to seed user data');
    }
};