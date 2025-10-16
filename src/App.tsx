// src/App.tsx

import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Login } from './authentication/login';
import { SignUp } from './authentication/signUp';
import Verification from './authentication/Verification';
import { AuthProvider } from './authentication/AuthProvider';
import ProtectedRoute from './authentication/RouteProtector';
import { useAuth } from './authentication/AuthProvider';
import { CropPlan } from './pages/Crops/CropPlan/components/CropPlan';
import { YieldComparison } from './pages/Crops/YieldComparison/YieldComparison';
import { LocationMap } from './pages/Crops/LocationMap/LocationMap';
import { GrowLocationTasks } from './pages/Crops/GrowLocations/Tasks/Tasks';
import { GrowLocationCalendar } from "./pages/Crops/GrowLocations/Calendar/Calendar";
import { GrowLocationNutrients } from "./pages/Crops/GrowLocations/Nutrients/Nutrients";
import { GrowLocationTreatments } from "./pages/Crops/GrowLocations/Treatment/Treatment";
import { GrowLocationPlantings } from "./pages/Crops/GrowLocations/Planting/Planting";
import { MyCropsHarvests } from './pages/Crops/MyCrops/Harvest/Harvest';
import { GrowLocationNotes } from "./pages/Crops/GrowLocations/Notes/Notes";
import { GrowLocationAccounting } from "./pages/Crops/GrowLocations/Accounting/Accounting";
import { GrowLocationImages } from "./pages/Crops/GrowLocations/Images/Images";
import { MyCurrentPlantings } from "./pages/Crops/MyCrops/CurrentPlanting/CurrentPlanting";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks/Tasks";
import { ContactsPage } from "./pages/Contact/Contact"
import { SchedulePage } from './pages/Schedule/Schedule';
import { CashFlowPage } from './pages/Accounting/Cashflow/Cashflow';
import { PnLStatementPage } from './pages/Accounting/PnLStatement/PnLStatement';
import { TransactionsPage } from './pages/Accounting/Transactions/Transaction';
import { MarketDashboardPage } from './pages/Marketing/Dashboard/MarketingDashboard'
import { MarketProductsPage } from './pages/Marketing/Products/Products'
import { MarketOrdersPage } from './pages/Marketing/MarketOrders/MarketOrders'
import { EquipmentLayout } from "./pages/Resources/Equipment/EquipemntLayout"
import { WarehouseManagement } from "./pages/Resources/Warehouse/Warehouse"
// import { ResourcesInventory } from "./pages/Resources/Inventory/Inventory"
import { StandardReports } from './pages/Reports/Reports';
import { FarmMap } from './pages/FarmMap/Map';
import { BalanceSheet } from './pages/Accounting/BalanceSheet/BalanceSheet';
import { Budgeting } from './pages/Accounting/Budget/Budget';
import { WeatherHistory } from './pages/Climate/WeatherHistory/WeatherHistory';
import { ClimateGauges } from './pages/Climate/ClimateGauge/ClimateGauge';
import { WeatherLogs } from './pages/Climate/WeatherLogs/WeatherLogs';
import { WeatherMap } from './pages/Climate/WeatherMap/WeatherMap'
import { MyCropsPage } from './pages/Crops/MyCrops/MyCrops';
import { CropDetailsPage } from './pages/Crops/MyCrops/Details/Details';
import { CropHistoryPage } from './pages/Crops/MyCrops/CropHistory/CropHistory';
import { HarvestManagement } from './pages/Crops/MyCrops/Harvest/Harvest';
import { FuturePlantingsPage } from './pages/Crops/MyCrops/FuturePlanting/FuturePlanting';
import { MyCropsAccounting } from './pages/Crops/MyCrops/Accounting/Accounting';
import { MyCropsImages } from './pages/Crops/MyCrops/Images/Images';
import { MyCropsYieldComparison } from './pages/Crops/MyCrops/YieldComparison/YieldComparison';
import { MyCropsTasks } from './pages/Crops/MyCrops/Tasks/Tasks';
import { MyCropsNotes } from './pages/Crops/MyCrops/Notes/Notes';
import { GrowLocationsPage } from './pages/Crops/GrowLocations/GrowLocations/GrowLocationsPage';
import { GrowLocationDetails } from './pages/Crops/GrowLocations/GrowLocationDetails/GrowLocationDetails';
import { GrowLocationCropPlan } from './pages/Crops/GrowLocations/GrowLocationCropMap/GrowLocationCropMap';
import { GrowLocationsImages } from './pages/Crops/GrowLocations/GrowLocationImages/GrowLocationImages';
import { GrowLocationMap } from './pages/Crops/GrowLocations/GrowLocationMap/GrowLocationMap';
import { GrazingPage } from './pages/Crops/GrowLocations/Grazing/Grazing';
import { PlantingHistory } from './pages/Crops/GrowLocations/GrowLocationPlantingHistory/GrowLocationPlantingHistory';
import { ResourcesEquipmentPage } from './pages/Resources/Equipment/Equipment';
import { ForgotPassword } from './authentication/ForgotPassword';
import { ResourcesInventory } from './pages/Resources/Inventory/ResourcesInventory';
import { GrowLocationSensors } from './pages/Crops/GrowLocations/EnvironmentData/EnvironmentData';
import { GrowLocationYieldComparison } from './pages/Crops/GrowLocations/GrowLocationYieldComparison/GrowLocationYieldComparison';

// Crops Secondary Sidebar Component
const CropsSecondarySidebar: React.FC<{
  activeSubmenu: string;
  setActiveSubmenu: (submenu: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({
  activeSubmenu,
  setActiveSubmenu,
  isOpen,
  setIsOpen
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const cropsMenuItems = [
      { id: 'details', label: 'Details', path: '/crops/my-crops/details' },
      { id: 'current-plantings', label: 'Current Plantings', path: '/crops/my-crops/current-plantings' },
      { id: 'future-plantings', label: 'Future Plantings', path: '/crops/my-crops/future-plantings' },
      { id: 'history', label: 'History', path: '/crops/my-crops/history' },
      { id: 'harvests', label: 'Harvests', path: '/crops/my-crops/harvests' },
      { id: 'tasks', icon: 'fa-tasks', label: 'Tasks', path: '/crops/my-crops/tasks' },
      { id: 'yield-comparison', label: 'Yield Comparison', path: '/crops/my-crops/yield-comparison' },
      { id: 'photos', label: 'Photos', path: '/crops/my-crops/photos' },
    ];


    React.useEffect(() => {
      const currentPath = location.pathname;
      const activeItem = cropsMenuItems.find(item => currentPath.includes(item.id));
      if (activeItem) {
        setActiveSubmenu(activeItem.id);
      }
    }, [location.pathname, setActiveSubmenu]);

    const handleMenuClick = (item: typeof cropsMenuItems[0]) => {
      navigate(item.path);
      setActiveSubmenu(item.id);
      setIsOpen(false); // Close mobile drawer on navigation
    };



    return (
      <>
        {/* Desktop Sidebar */}
        <div className="hidden md:block bg-gray-50 w-48 flex-shrink-0 relative h-full">
          <div className="absolute right-0 top-0 h-screen w-px bg-gray-200"></div>
          <div className="py-4">
            {cropsMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 relative ${activeSubmenu === item.id
                  ? 'bg-white text-green-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {item.label}
                {activeSubmenu === item.id && (
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-green-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-16' : '-translate-y-full'
            }`}
        >
          <div className="h-full w-full flex flex-col">
            {/* Mobile Drawer Header */}
            <div className="bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 flex-shrink-0">
              <span className="text-lg font-semibold text-gray-800">My Crops Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden">
              {cropsMenuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${activeSubmenu === item.id
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <span className="text-sm font-medium truncate">{item.label}</span>
                  {activeSubmenu === item.id && (
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </>
    );
  };

// Grow Locations Secondary Sidebar Component
const GrowLocationsSecondarySidebar: React.FC<{
  activeSubmenu: string;
  setActiveSubmenu: (submenu: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({
  activeSubmenu,
  setActiveSubmenu,
  isOpen,
  setIsOpen
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const growLocationsMenuItems = [
      { id: 'details', label: 'Details', path: '/crops/grow-locations/details' },
      { id: 'plantings', label: 'Plantings', path: '/crops/grow-locations/plantings' },
      { id: 'crop-plan', label: 'Crop Plan', path: '/crops/grow-locations/crop-plan' },
      { id: 'planting-history', label: 'Planting History', path: '/crops/grow-locations/planting-history' },
      { id: 'yield-comparison', label: 'Yield Comparison', path: '/crops/grow-locations/yield-comparison' },
      { id: 'grazing', label: 'Grazing', path: '/crops/grow-locations/grazing' },
      { id: 'treatments', label: 'Treatments', path: '/crops/grow-locations/treatments' },
      { id: 'nutrients', label: 'Nutrients', path: '/crops/grow-locations/nutrients' },
      { id: 'sensors', label: 'Environmental Data', path: '/crops/grow-locations/sensors' },
      { id: 'calendar', label: 'Calendar', path: '/crops/grow-locations/calendar' },
      { id: 'tasks', label: 'Tasks', path: '/crops/grow-locations/tasks' },
      { id: 'notes', label: 'Notes', path: '/crops/grow-locations/notes' },
      { id: 'map', label: 'Map', path: '/crops/grow-locations/map' },
      { id: 'images', label: 'Images', path: '/crops/grow-locations/images' },
    ];

    React.useEffect(() => {
      const currentPath = location.pathname;
      const activeItem = growLocationsMenuItems.find(item => currentPath.includes(item.id));
      if (activeItem) {
        setActiveSubmenu(activeItem.id);
      }
    }, [location.pathname, setActiveSubmenu]);

    const handleMenuClick = (item: typeof growLocationsMenuItems[0]) => {
      navigate(item.path);
      setActiveSubmenu(item.id);
      setIsOpen(false); // Close mobile drawer on navigation
    };

    return (
      <>
        {/* Desktop Sidebar */}
        <div className="hidden md:block bg-gray-50 w-48 flex-shrink-0 relative h-full">
          <div className="absolute right-0 top-0 h-screen w-px bg-gray-200"></div>
          <div className="py-4">
            {growLocationsMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 relative ${activeSubmenu === item.id
                  ? 'bg-white text-green-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {item.label}
                {activeSubmenu === item.id && (
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-green-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-16' : '-translate-y-full'
            }`}
        >
          <div className="h-full w-full flex flex-col">
            {/* Mobile Drawer Header */}
            <div className="bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 flex-shrink-0">
              <span className="text-lg font-semibold text-gray-800">Grow Locations Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden">
              {growLocationsMenuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${activeSubmenu === item.id
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <span className="text-sm font-medium truncate">{item.label}</span>
                  {activeSubmenu === item.id && (
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </>
    );
  };

// New component for the protected layout
const ProtectedLayout: React.FC = () => {
  const { userRole } = useAuth();
  const [activeMenu, setActiveMenu] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCropsSubmenu, setActiveCropsSubmenu] = useState('details');
  const [activeGrowLocationsSubmenu, setActiveGrowLocationsSubmenu] = useState('details');
  const [showCropsSubmenu, setShowCropsSubmenu] = useState(false);
  const [showGrowLocationsSubmenu, setShowGrowLocationsSubmenu] = useState(false);
  const [isCropsSubmenuOpen, setIsCropsSubmenuOpen] = useState(false);
  const [isGrowLocationsSubmenuOpen, setIsGrowLocationsSubmenuOpen] = useState(false);

  // State to track if crop types exist
  const [hasCropTypes, setHasCropTypes] = useState(false);
  // Add new state for crop selection
  const [hasCropSelected, setHasCropSelected] = useState(false);

  const location = useLocation();

  const [selectedGrowLocation, setSelectedGrowLocation] = useState<any>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const isInMyCropsSection = location.pathname.startsWith('/crops/my-crops');
    const isInGrowLocationsSection = location.pathname.startsWith('/crops/grow-locations');

    // Check if we're on a specific sub-route, not just the main route
    const isOnGrowLocationsSubroute = location.pathname !== '/crops/grow-locations' &&
      location.pathname.startsWith('/crops/grow-locations');

    setShowCropsSubmenu(isInMyCropsSection && hasCropTypes && hasCropSelected);
    // Only show submenu when on sub-routes AND a location is selected
    setShowGrowLocationsSubmenu(isOnGrowLocationsSubroute && selectedGrowLocation);

    // Reset states when not in their respective sections
    if (!isInMyCropsSection && !isInGrowLocationsSection) {
      setShowCropsSubmenu(false);
      setShowGrowLocationsSubmenu(false);
      setIsCropsSubmenuOpen(false);
      setIsGrowLocationsSubmenuOpen(false);
    }

    // Reset grow location selection when not in grow locations section
    if (!isInGrowLocationsSection && selectedGrowLocation) {
      setSelectedGrowLocation(null);
    }

    // Reset crop selection when not in crops section
    if (!isInMyCropsSection && hasCropSelected) {
      setHasCropSelected(false);
    }
  }, [location.pathname, hasCropTypes, hasCropSelected, selectedGrowLocation]);

  // Add handler for grow location selection
  const handleLocationSelect = (location: any) => {
    setSelectedGrowLocation(location);
    // Navigate to the details page of the selected location
    navigate('/crops/grow-locations/details');
  };

  const handleCropTypesChange = (cropTypesExist: boolean, cropSelected: boolean) => {
    setHasCropTypes(cropTypesExist);
    setHasCropSelected(cropSelected); // Add this new state
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        role={userRole || 'none'}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Mobile Menu Toggle Button - Only show when secondary menu should be visible */}
      {(showCropsSubmenu || showGrowLocationsSubmenu) && (
        <button
          onClick={() => {
            if (showCropsSubmenu) setIsCropsSubmenuOpen(true);
            if (showGrowLocationsSubmenu) setIsGrowLocationsSubmenuOpen(true);
          }}
          className="md:hidden fixed top-20 left-4 z-30 text-gray-700 p-2 rounded-md bg-gray-100 hover:bg-gray-500 transition-colors duration-200"
        >
          <i className="fas fa-bars text-base"></i>
        </button>
      )}

      {/* Main Content Area - FIXED: Only apply ml-64 on desktop */}
      <div className="md:ml-64 flex min-h-screen">
        {/* Secondary Sidebar for My Crops */}
        {showCropsSubmenu && (
          <div className="pt-16 flex-shrink-0 h-screen">
            <CropsSecondarySidebar
              activeSubmenu={activeCropsSubmenu}
              setActiveSubmenu={setActiveCropsSubmenu}
              isOpen={isCropsSubmenuOpen}
              setIsOpen={setIsCropsSubmenuOpen}
            />
          </div>
        )}

        {/* Secondary Sidebar for Grow Locations */}
        {showGrowLocationsSubmenu && (
          <div className="pt-16 flex-shrink-0 h-screen">
            <GrowLocationsSecondarySidebar
              activeSubmenu={activeGrowLocationsSubmenu}
              setActiveSubmenu={setActiveGrowLocationsSubmenu}
              isOpen={isGrowLocationsSubmenuOpen}
              setIsOpen={setIsGrowLocationsSubmenuOpen}
            />
          </div>
        )}

        {/* Content area with responsive padding */}
        <main className="pt-20 p-4 md:pt-20 md:p-6 bg-gray-50 min-h-screen flex-1 w-full">
          <Routes>
            <Route path="/livestock" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Livestock</h1>
                <p className="text-gray-600">Manage your livestock inventory and health</p>
              </div>
            } />

            {/* My Crops Route - Pass the callback function */}
            <Route
              path="/crops/my-crops"
              element={
                <MyCropsPage onCropTypesChange={handleCropTypesChange} />
              }
            />
            <Route
              path="/crops/my-crops/*"
              element={
                <MyCropsPage onCropTypesChange={handleCropTypesChange} />
              }
            />

            {/* Conditional routes for when crop types exist - My Crops submenu */}
            {hasCropTypes && (
              <>

              </>
            )}

            {/* Other crops routes */}


            <Route path="/crops/crop-plan" element={<CropPlan />} />
            <Route path="/crops/yield-comparison" element={<YieldComparison />} />
            <Route path="/crops/location-map" element={<LocationMap />} />
            <Route path="/crops/grow-locations/tasks" element={<GrowLocationTasks />} />
            <Route path="/crops/grow-locations/calendar" element={<GrowLocationCalendar />} />
            <Route path="/crops/grow-locations/nutrients" element={<GrowLocationNutrients />} />
            <Route path="/crops/grow-locations/treatments" element={<GrowLocationTreatments />} />
            <Route path="/crops/grow-locations/plantings" element={<GrowLocationPlantings />} />
            {/* <Route path="/crops/my-crops/harvests" element={<MyCropsHarvests />} /> */}
            <Route path="/crops/grow-locations/notes" element={<GrowLocationNotes />} />
            <Route path="/crops/grow-locations/accounting" element={<GrowLocationAccounting />} />
            {/* <Route path="/crops/my-crops/photos" element={<GrowLocationImages />} /> */}
            <Route path="/crops/my-crops/current-plantings" element={<MyCurrentPlantings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/accounting/cashflow" element={<CashFlowPage />} />
            <Route path="/accounting/pnl" element={<PnLStatementPage />} />
            <Route path="/accounting/transactions" element={<TransactionsPage />} />
            <Route path="/market/dashboard" element={<MarketDashboardPage />} />
            <Route path="/market/products" element={<MarketProductsPage />} />
            <Route path="/market/orders" element={<MarketOrdersPage />} />
            {/* <Route path="/resources/equipment" element={<EquipmentLayout />} /> */}
            <Route path="/resources/warehouse" element={<WarehouseManagement />} />
            <Route path="/resources/inventory" element={<ResourcesInventory />} />
            <Route path="/reports" element={<StandardReports />} />
            <Route path="/farm-map" element={<FarmMap />} />
            <Route path="/accounting/balance-sheet" element={<BalanceSheet />} />
            <Route path="/accounting/budgeting" element={<Budgeting />} />
            <Route path="/climate/weather-history" element={<WeatherHistory />} />
            <Route path="/climate/gauges" element={<ClimateGauges />} />
            <Route path="/climate/weather-logs" element={<WeatherLogs />} />
            <Route path="/climate/weather-map" element={<WeatherMap />} />
            <Route path="/crops/my-crops/details" element={<CropDetailsPage />} />
            <Route path="/crops/my-crops/history" element={<CropHistoryPage />} />
            <Route path="/crops/my-crops/harvests" element={<HarvestManagement />} />
            <Route path="/crops/my-crops/future-plantings" element={<FuturePlantingsPage />} />
            <Route path="crops/my-crops/accounting" element={<MyCropsAccounting />} />
            <Route path="/crops/my-crops/photos" element={<MyCropsImages />} />
            <Route path="/crops/my-crops/yield-comparison" element={<MyCropsYieldComparison />} />
            <Route path="/crops/my-crops/tasks" element={<MyCropsTasks />} />
            <Route path="/crops/my-crops/notes" element={<MyCropsNotes />} />
            <Route path="/crops/grow-locations/sensors" element={<GrowLocationSensors />} />
            <Route path="/crops/grow-locations/yield-comparison" element={<GrowLocationYieldComparison />} />
            <Route
              path="/crops/grow-locations"
              element={<GrowLocationsPage onLocationSelect={handleLocationSelect} />}
            />
            <Route path="/crops/grow-locations/details" element={<GrowLocationDetails />} />
            <Route path="/crops/grow-locations/crop-plan" element={<GrowLocationCropPlan />} />
            <Route path="/crops/grow-locations/images" element={<GrowLocationsImages />} />
            <Route path="/crops/grow-locations/map" element={<GrowLocationMap />} />
            <Route path="crops/grow-locations/grazing" element={<GrazingPage />} />
            <Route path="/crops/grow-locations/planting-history" element={<PlantingHistory />} />
            <Route path="/resources/equipment" element={<ResourcesEquipmentPage />} />
            <Route path="/resources/equipment/:tab" element={<EquipmentLayout />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;