export interface GrowLocation {
    id: string;
    name: string;
    type: string;
    plantingFormat: 'Planted in Beds' | 'Cover Crop' | 'Row Crop' | 'Hydroponic' | 'Pots' | 'Tables or Benches' | 'Other';
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

export interface GrowLocationsPageProps {
    onLocationSelect?: (location: GrowLocation) => void;
}