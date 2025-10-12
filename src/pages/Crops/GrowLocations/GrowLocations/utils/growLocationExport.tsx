import { GrowLocation } from '../types/growLocation';

export const exportToJSON = (locations: GrowLocation[]): void => {
    const dataStr = JSON.stringify(locations, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportFileDefaultName = `grow-locations-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

export const exportToCSV = (locations: GrowLocation[]): void => {
    const headers = [
        'Name',
        'Type',
        'Planting Format',
        'Status',
        'Acreage',
        'Internal ID',
        'Electronic ID',
        'Number of Beds',
        'Bed Length',
        'Bed Width',
        'Area Size',
        'Estimated Land Value',
        'Light Profile',
        'Grazing Rest Days',
        'Description'
    ];

    const csvRows = [
        headers.join(','),
        ...locations.map(loc => [
            `"${loc.name}"`,
            `"${loc.type}"`,
            `"${loc.plantingFormat}"`,
            `"${loc.status}"`,
            loc.acreage || '',
            `"${loc.internalId || ''}"`,
            `"${loc.electronicId || ''}"`,
            loc.numberOfBeds || '',
            loc.bedLength || '',
            loc.bedWidth || '',
            loc.areaSize || '',
            loc.estimatedLandValue || '',
            `"${loc.lightProfile || ''}"`,
            loc.grazingRestDays || '',
            `"${loc.description || ''}"`
        ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const dataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;

    const exportFileDefaultName = `grow-locations-${new Date().toISOString().split('T')[0]}.csv`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

export const downloadPDF = (locations: GrowLocation[]): void => {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Grow Locations Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    color: #333;
                    margin: 0;
                }
                h1 {
                    color: #16a34a;
                    margin-bottom: 20px;
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }
                th {
                    background-color: #f3f4f6;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f9fafb;
                }
                .header-info {
                    margin-bottom: 20px;
                    color: #6b7280;
                    text-align: center;
                }
                .no-print {
                    display: none;
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <button class="no-print" onclick="window.print()" style="
                margin-bottom: 20px;
                padding: 10px 20px;
                background-color: #16a34a;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            ">Print Report</button>
            
            <h1>Grow Locations Report</h1>
            <div class="header-info">
                <p><strong>Generated:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
                <p><strong>Total Locations:</strong> ${locations.length}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Planting Format</th>
                        <th>Status</th>
                        <th>Acreage</th>
                        <th>Internal ID</th>
                    </tr>
                </thead>
                <tbody>
                    ${locations.map(loc => `
                        <tr>
                            <td>${loc.name}</td>
                            <td>${loc.type}</td>
                            <td>${loc.plantingFormat}</td>
                            <td>${loc.status}</td>
                            <td>${loc.acreage || 'N/A'}</td>
                            <td>${loc.internalId || 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <script>
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `grow-locations-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const printLocations = (locations: GrowLocation[]): void => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print Grow Locations</title>
            <style>
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    color: #333;
                }
                h1 {
                    color: #16a34a;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }
                th {
                    background-color: #f3f4f6;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f9fafb;
                }
                .header-info {
                    margin-bottom: 20px;
                    color: #6b7280;
                }
                .print-button {
                    margin-bottom: 20px;
                    padding: 10px 20px;
                    background-color: #16a34a;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .print-button:hover {
                    background-color: #15803d;
                }
            </style>
        </head>
        <body>
            <button class="print-button no-print" onclick="window.print()">Print</button>
            <h1>Grow Locations</h1>
            <div class="header-info">
                <p>Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
                <p>Total Locations: ${locations.length}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Planting Format</th>
                        <th>Status</th>
                        <th>Acreage</th>
                        <th>Internal ID</th>
                    </tr>
                </thead>
                <tbody>
                    ${locations.map(loc => `
                        <tr>
                            <td>${loc.name}</td>
                            <td>${loc.type}</td>
                            <td>${loc.plantingFormat}</td>
                            <td>${loc.status}</td>
                            <td>${loc.acreage || 'N/A'}</td>
                            <td>${loc.internalId || 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </body>
        </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
};