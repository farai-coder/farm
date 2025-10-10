export interface Planting {
    id: number;
    location: string;
    totalPlanted: string;
    plantedDate: string;
    harvestStatus: string;
    financialInfo: string;
    expectedDate: string;
    plantingDetails: string;
    progressPercentage: number;
    expanded: boolean;
}

export interface ChartData {
    date: string;
    northwest: number;
    northwestB: number;
    northwestC: number;
}

export interface PlantingFormData {
    cropType: string;
    variety: string;
    botanicalName: string;
    internalId: string;
    startBeforeLastFrost: string;
    daysToEmerge: string;
    plantSpacing: string;
    rowSpacing: string;
    plantingDepth: string;
    averageHeight: string;
    startMethod: string;
    lightProfile: string;
    soilConditions: string;
    plantingDetails: string;
    pruningDetails: string;
    isPerennial: boolean;
    autoCreateTasks: boolean;
    daysToFlower: string;
    daysToMaturity: string;
    harvestWindow: string;
    estimatedLossRate: string;
    harvestUnits: string;
    estimatedRevenue: string;
    expectedYieldPer30_48m: string;
    expectedYieldPerHectare: string;
}

export interface NewPlantingData {
    cropType: string;
    growLocation: string;
    startMethod: string;
    growthStage: string;
    currentlyPlanted: string;
}

export interface HarvestFormData {
    dateHarvested: string;
    estimatedRevenue: string;
    batchNumber: string;
    traceNumber: string;
    note: string;
    harvestedFrom: string;
    bed: string;
    gradeSize: string;
    amountHarvested: string;
}