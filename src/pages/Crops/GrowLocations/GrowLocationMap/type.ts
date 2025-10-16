// types.ts
export interface MapArea {
    id: string;
    name: string;
    type: string;
    area: number;
    color: string;
    lightColor: string;
    coordinates: Array<{ lat: number; lng: number }>;
    center: { lat: number; lng: number };
    marker?: google.maps.Marker;
    polygon?: google.maps.Polygon;
}

export interface AreaType {
    id: string;
    label: string;
    color: string;
    lightColor: string;
}

export const AREA_TYPES: AreaType[] = [
    { id: 'property', label: 'Property Boundary', color: '#8b5cf6', lightColor: '#8b5cf680' },
    { id: 'field', label: 'Field', color: '#10b981', lightColor: '#10b98180' },
    { id: 'bed', label: 'Bed', color: '#ef4444', lightColor: '#ef444480' },
    { id: 'building', label: 'Building', color: '#dc2626', lightColor: '#dc262680' },
    { id: 'animal', label: 'Animal Enclosure', color: '#f59e0b', lightColor: '#f59e0b80' },
    { id: 'grazing', label: 'Grazing Enclosure', color: '#ec4899', lightColor: '#ec489980' },
    { id: 'irrigation', label: 'Irrigation', color: '#3b82f6', lightColor: '#3b82f680' },
    { id: 'buffer', label: 'Buffer Zone', color: '#84cc16', lightColor: '#84cc1680' }
];