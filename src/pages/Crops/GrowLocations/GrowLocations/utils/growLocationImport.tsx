import { GrowLocation } from '../types/growLocation';

export const importFromJSON = (
    onSuccess: (locations: GrowLocation[]) => void,
    onError: (error: string) => void
): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const locations = JSON.parse(content) as GrowLocation[];

                if (!Array.isArray(locations)) {
                    throw new Error('Invalid JSON format: expected an array of locations');
                }

                const validatedLocations = locations.map((loc, index) => {
                    if (!loc.name || !loc.type || !loc.plantingFormat || !loc.status) {
                        throw new Error(`Invalid location at index ${index}: missing required fields`);
                    }
                    return {
                        ...loc,
                        id: loc.id || Date.now().toString() + index
                    };
                });

                onSuccess(validatedLocations);
            } catch (error) {
                onError(error instanceof Error ? error.message : 'Failed to parse JSON file');
            }
        };

        reader.onerror = () => {
            onError('Failed to read file');
        };

        reader.readAsText(file);
    };

    input.click();
};

export const importFromCSV = (
    onSuccess: (locations: GrowLocation[]) => void,
    onError: (error: string) => void
): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';

    input.onchange = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const lines = content.split('\n').filter(line => line.trim());

                if (lines.length < 2) {
                    throw new Error('CSV file is empty or invalid');
                }

                const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
                const locations: GrowLocation[] = [];

                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));

                    const location: GrowLocation = {
                        id: Date.now().toString() + i,
                        name: values[0] || '',
                        type: values[1] || 'Field',
                        plantingFormat: values[2] || 'Planted in Beds',
                        status: (values[3] as 'Active' | 'Inactive') || 'Active',
                        acreage: values[4] ? parseFloat(values[4]) : undefined,
                        internalId: values[5] || undefined,
                        electronicId: values[6] || undefined,
                        numberOfBeds: values[7] ? parseInt(values[7]) : undefined,
                        bedLength: values[8] ? parseInt(values[8]) : undefined,
                        bedWidth: values[9] ? parseInt(values[9]) : undefined,
                        areaSize: values[10] ? parseFloat(values[10]) : undefined,
                        estimatedLandValue: values[11] ? parseFloat(values[11]) : undefined,
                        lightProfile: values[12] || undefined,
                        grazingRestDays: values[13] ? parseInt(values[13]) : undefined,
                        description: values[14] || undefined
                    };

                    if (location.name) {
                        locations.push(location);
                    }
                }

                if (locations.length === 0) {
                    throw new Error('No valid locations found in CSV file');
                }

                onSuccess(locations);
            } catch (error) {
                onError(error instanceof Error ? error.message : 'Failed to parse CSV file');
            }
        };

        reader.onerror = () => {
            onError('Failed to read file');
        };

        reader.readAsText(file);
    };

    input.click();
};
