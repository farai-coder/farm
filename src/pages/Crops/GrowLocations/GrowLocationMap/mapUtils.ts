import { MapArea } from './type';

export const calculatePolygonArea = (polygon: google.maps.Polygon): number => {
    const paths = polygon.getPaths();
    let totalArea = 0;

    for (let i = 0; i < paths.getLength(); i++) {
        const path = paths.getAt(i);
        const area = google.maps.geometry.spherical.computeArea(path);
        totalArea += Math.abs(area);
    }

    return totalArea;
};

export const calculatePolygonCenter = (paths: google.maps.LatLng[]): { lat: number; lng: number } => {
    let lat = 0;
    let lng = 0;

    for (let i = 0; i < paths.length; i++) {
        lat += paths[i].lat();
        lng += paths[i].lng();
    }

    return {
        lat: lat / paths.length,
        lng: lng / paths.length
    };
};

export const squareMetersToAcres = (squareMeters: number): number => {
    return squareMeters * 0.000247105;
};

export const squareMetersToHectares = (squareMeters: number): string => {
    return (squareMeters * 0.0001).toFixed(2);
};

export const formatArea = (area: number): string => {
    const acres = squareMetersToAcres(area);
    const hectares = squareMetersToHectares(area);

    if (acres < 1) {
        return `${hectares} ha`;
    } else {
        return `${acres.toFixed(2)} acres (${hectares} ha)`;
    }
};

export const getPolygonCoordinates = (polygon: google.maps.Polygon): Array<{ lat: number; lng: number }> => {
    const coordinates: Array<{ lat: number; lng: number }> = [];
    const path = polygon.getPath();

    for (let i = 0; i < path.getLength(); i++) {
        const point = path.getAt(i);
        coordinates.push({
            lat: point.lat(),
            lng: point.lng()
        });
    }

    return coordinates;
};

export const saveMapsToStorage = (maps: MapArea[]): void => {
    try {
        const dataToSave = maps.map(mapData => ({
            id: mapData.id,
            name: mapData.name,
            type: mapData.type,
            area: mapData.area,
            color: mapData.color,
            lightColor: mapData.lightColor,
            coordinates: mapData.coordinates,
            center: mapData.center,
        }));
        localStorage.setItem('farmMaps', JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Error saving maps:', error);
    }
};