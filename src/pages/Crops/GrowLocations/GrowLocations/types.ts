export interface GrowLocation {
    id: string;
    name: string;
    type: string;
    plantingFormat: string;
    status: 'Active' | 'Inactive';
    acreage?: number;
    internalId?: string;
    electronicId?: string;
    numberOfBeds?: number;
    bedLength?: number;
    bedWidth?: number;
    areaSize?: number;
    estimatedLandValue?: number;
    lightProfile?: string;
    grazingRestDays?: number;
    description?: string;
}
