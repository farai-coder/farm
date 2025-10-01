export interface InventoryItem {
    id: number;
    name: string;
    quantity: string;
    value: string;
    avgDailyUsage: string;
    variety?: string;
}

export interface Photo {
    id: number;
    name: string;
    date: string;
    url: string;
}

export interface Recipe {
    id: number;
    name: string;
    makes: number;
    unit: string;
    instructions?: string;
}

export interface Note {
    content: string;
    date: string;
    keywords: string;
    assignTask: string;
    addToCalendar: boolean;
}

export interface SidebarItem {
    id: string;
    label: string;
}

export type ModalType = 'add' | 'warehouse' | 'remove' | 'adjust' | 'newType' | '';