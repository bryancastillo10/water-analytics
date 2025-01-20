import { DashboardRepository } from "@/dashboard/dashboard.repository";
import { DashboardService } from "@/dashboard/core/service/dashboardService";
import { DashboardController } from "@/dashboard/dashboard.controller";

const dashboardRepository = new DashboardRepository();

const dashboardService = new DashboardService(dashboardRepository);

export const dashboardController = new DashboardController(dashboardService);