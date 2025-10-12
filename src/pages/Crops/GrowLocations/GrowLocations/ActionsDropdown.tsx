import React, { useRef, useEffect } from 'react';

interface ActionsDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onExport: () => void;
    onImport: () => void;
    onDownload: () => void;
    onPrint: () => void;
    hasLocations?: boolean;
}

export const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
    isOpen,
    onClose,
    onExport,
    onImport,
    onDownload,
    onPrint,
    hasLocations = true
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const menuItems = [
        {
            label: 'Import',
            icon: 'fa-file-import',
            onClick: onImport,
            alwaysShow: true
        },
        ...(hasLocations ? [
            {
                label: 'Export',
                icon: 'fa-file-export',
                onClick: onExport,
                alwaysShow: false
            },
            {
                label: 'Download',
                icon: 'fa-download',
                onClick: onDownload,
                alwaysShow: false
            },
            {
                label: 'Print',
                icon: 'fa-print',
                onClick: onPrint,
                alwaysShow: false
            }
        ] : [])
    ];

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200"
        >
            <div className="py-1">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            item.onClick();
                            onClose();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 flex items-center space-x-3"
                    >
                        <i className={`fas ${item.icon} text-gray-500`}></i>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};