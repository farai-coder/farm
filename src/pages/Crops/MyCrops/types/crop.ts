export interface CropFormData {
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

export interface PlantingData {
    cropType: string;
    growLocation: string;
    startMethod: string;
    growthStage: string;
    currentlyPlanted: string;
}

export interface HarvestForm {
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