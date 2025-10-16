import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface UserFormData {
  email: string;
  name: string;
  surname: string;
  gender: string;
  phone_number: string;
  role: string;
  password: string;
  confirmPassword: string;
}

interface FarmFormData {
  farmName: string;
  farmType: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: string;
  longitude: string;
}

interface PreferencesData {
  measurementSystem: string;
  timezone: string;
  currency: string;
  lastFrostMonth: string;
  lastFrostDay: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

// Extend window to include initMap
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

export const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [apiError, setApiError] = useState<string>('');
  const [apiSuccess, setApiSuccess] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mapCoordinates, setMapCoordinates] = useState<Coordinates | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Map state
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const navigate = useNavigate();

  const [userForm, setUserForm] = useState<UserFormData>({
    email: '',
    name: '',
    surname: '',
    gender: 'female',
    phone_number: '',
    role: 'staff',
    password: '',
    confirmPassword: ''
  });

  const [farmForm, setFarmForm] = useState<FarmFormData>({
    farmName: '',
    farmType: 'MIXED',
    country: 'Zimbabwe',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    latitude: '',
    longitude: ''
  });

  const [preferencesForm, setPreferencesForm] = useState<PreferencesData>({
    measurementSystem: 'metric',
    timezone: 'GMT+02:00',
    currency: 'USD',
    lastFrostMonth: 'August',
    lastFrostDay: '15'
  });

  // Load Google Maps API on component mount
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAtNURh8Jda8VTuThQwJuuhKM0I7dPpsl4`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
        // Initialize map with default location
        initializeMap({ lat: -17.8292, lng: 31.0522 }); // Default to Harare, Zimbabwe
      };
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
      initializeMap({ lat: -17.8292, lng: 31.0522 });
    }
  }, []);

  // Function to geocode address using Google Maps
  const geocodeAddress = (address: string, city: string, country: string): Promise<Coordinates | null> => {
    return new Promise((resolve) => {
      if (!window.google) {
        resolve(null);
        return;
      }

      const geocoder = new google.maps.Geocoder();
      const fullAddress = `${address}, ${city}, ${country}`;

      geocoder.geocode({ address: fullAddress }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const coordinates = {
            lat: location.lat(),
            lng: location.lng()
          };

          // Store coordinates in localStorage immediately when geocoded
          localStorage.setItem('farmCoordinates', JSON.stringify({
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            address: address,
            city: city,
            country: country,
            farmName: farmForm.farmName
          }));

          console.log('Coordinates stored in localStorage:', coordinates);
          resolve(coordinates);
        } else {
          console.warn('Geocoding failed:', status);
          resolve(null);
        }
      });
    });
  };

  // Initialize Google Maps with SATELLITE view only
  const initializeMap = (center: Coordinates) => {
    if (mapRef.current && window.google) {
      const map = new google.maps.Map(mapRef.current, {
        center: center,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE, // Only satellite view
        zoomControl: false,
        mapTypeControl: false, // Hide map type controls
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      });

      // Add marker for farm location
      new google.maps.Marker({
        position: center,
        map,
        title: farmForm.farmName || 'Farm Location',
      });

      setMapInstance(map);
    }
  };

  // Update map when address changes
  useEffect(() => {
    const updateMapLocation = async () => {
      if (farmForm.address && farmForm.city && farmForm.country && mapLoaded) {
        setIsGeocoding(true);
        try {
          const coordinates = await geocodeAddress(farmForm.address, farmForm.city, farmForm.country);
          if (coordinates) {
            setMapCoordinates(coordinates);
            // Update the farm form with coordinates
            setFarmForm(prev => ({
              ...prev,
              latitude: coordinates.lat.toString(),
              longitude: coordinates.lng.toString()
            }));

            // Update map center if map instance exists
            if (mapInstance) {
              mapInstance.setCenter(coordinates);
              // Add or update marker
              new google.maps.Marker({
                position: coordinates,
                map: mapInstance,
                title: farmForm.farmName || 'Farm Location',
              });
            } else {
              // Initialize map with new coordinates
              initializeMap(coordinates);
            }
          }
        } catch (error) {
          console.error('Geocoding error:', error);
        } finally {
          setIsGeocoding(false);
        }
      }
    };

    // Add a delay to prevent too many API calls while typing
    const timeoutId = setTimeout(() => {
      updateMapLocation();
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [farmForm.address, farmForm.city, farmForm.country, mapLoaded]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const validateStep = (step: number) => {
    const newErrors: any = {};

    if (step === 1) {
      if (!userForm.name.trim()) newErrors.name = 'First name is required';
      if (!userForm.surname.trim()) newErrors.surname = 'Last name is required';

      if (!userForm.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      const phoneNumberWithoutCode = userForm.phone_number.replace(/\D/g, '');
      if (!userForm.phone_number.trim()) {
        newErrors.phone_number = 'Phone number is required';
      } else if (phoneNumberWithoutCode.length < 9) {
        newErrors.phone_number = 'Phone number must be at least 9 digits';
      }

      if (!userForm.password) {
        newErrors.password = 'Password is required';
      } else if (userForm.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!userForm.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (userForm.password !== userForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!farmForm.farmName.trim()) newErrors.farmName = 'Farm name is required';
      if (!farmForm.address.trim()) newErrors.address = 'Address is required';
      if (!farmForm.city.trim()) newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log('Current step:', currentStep);
    console.log('Form data:', userForm);

    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setErrors({});
      setApiError('');
      setApiSuccess('');
    } else {
      console.log('Validation failed');
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
    setApiError('');
    setApiSuccess('');
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setApiError('');
    setApiSuccess('');
    setUploadProgress(0);

    try {
      // Use the already geocoded coordinates or geocode again if needed
      let latitude = parseFloat(farmForm.latitude) || 0;
      let longitude = parseFloat(farmForm.longitude) || 0;

      if ((!latitude || !longitude) && farmForm.address && farmForm.city && farmForm.country) {
        const coordinates = await geocodeAddress(farmForm.address, farmForm.city, farmForm.country);
        if (coordinates) {
          latitude = coordinates.lat;
          longitude = coordinates.lng;
        }
      }

      // Store coordinates in localStorage (in case they weren't stored during geocoding)
      localStorage.setItem('farmCoordinates', JSON.stringify({
        latitude,
        longitude,
        address: farmForm.address,
        city: farmForm.city,
        country: farmForm.country,
        farmName: farmForm.farmName
      }));

      console.log('Final coordinates stored in localStorage:', { latitude, longitude });

      const requestData = {
        user: {
          email: userForm.email,
          name: userForm.name,
          surname: userForm.surname,
          role: 'OWNER',
          gender: userForm.gender,
          password: userForm.password,
          phoneNumber: userForm.phone_number
        },
        farm: {
          farmName: farmForm.farmName,
          farmType: farmForm.farmType,
          country: farmForm.country.toLowerCase(),
          address: farmForm.address,
          city: farmForm.city,
          state: farmForm.state || 'N/A',
          postalCode: farmForm.postalCode || 'N/A',
          latitude: latitude,
          longitude: longitude
        },
        prefs: {
          measurementSystem: preferencesForm.measurementSystem,
          timezone: preferencesForm.timezone,
          currency: preferencesForm.currency,
          lastFrostMonth: preferencesForm.lastFrostMonth,
          lastFrostDay: preferencesForm.lastFrostDay
        }
      };

      console.log('Submitting registration data:', requestData);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('http://localhost:8000/v1/identity/register-user-farm-and-preferences', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.detail || result.message || `Registration failed with status: ${response.status}`;
        throw new Error(errorMessage);
      }

      console.log('Registration successful:', result);

      const successMessage = result.detail || result.message || 'Registration completed successfully.';
      setApiSuccess(successMessage);

      setTimeout(() => {
        handleNavigation('/login');
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      setApiError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const renderProgressSteps = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step <= currentStep
            ? 'bg-green-500 border-green-500 text-white'
            : step === currentStep + 1
              ? 'border-green-500 text-green-500 bg-white'
              : 'border-gray-300 text-gray-400 bg-white'
            }`}>
            {step < currentStep ? (
              <i className="fas fa-check text-sm"></i>
            ) : (
              <span className="text-sm font-medium">{step}</span>
            )}
          </div>
          {step < 3 && (
            <div className={`w-12 h-0.5 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            type="text"
            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
            placeholder="farai"
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input
            type="text"
            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.surname ? 'border-red-300' : 'border-gray-300'
              }`}
            placeholder="Kutukumira"
            value={userForm.surname}
            onChange={(e) => setUserForm({ ...userForm, surname: e.target.value })}
          />
          {errors.surname && <p className="mt-1 text-xs text-red-500">{errors.surname}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
        <input
          type="email"
          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
          placeholder="farai.rato@students.uz.ac.zw"
          value={userForm.email}
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
        <select
          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.gender ? 'border-red-300' : 'border-gray-300'
            }`}
          value={userForm.gender}
          onChange={(e) => setUserForm({ ...userForm, gender: e.target.value })}
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </select>
        {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
        <div className={`border rounded-lg focus-within:ring-2 focus-within:ring-green-200 focus-within:border-green-500 ${errors.phone_number ? 'border-red-300' : 'border-gray-300'}`}>
          <PhoneInput
            defaultCountry="zw"
            value={userForm.phone_number}
            onChange={(phone) => setUserForm({ ...userForm, phone_number: phone })}
            inputClassName="w-full px-3 py-2.5 border-0 focus:ring-0"
            countrySelectorStyleProps={{
              buttonClassName: "border-0 px-3 hover:bg-gray-50",
              dropdownStyleProps: {
                listItemClassName: "hover:bg-gray-50 px-3 py-2",
                listItemCountryNameClassName: "text-sm",
                listItemCountryDialcodeClassName: "text-sm text-gray-500",
              }
            }}
          />
        </div>
        {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
            placeholder="Enter your password"
            value={userForm.password}
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">8 characters minimum</p>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            }`}
          placeholder="Confirm your password"
          value={userForm.confirmPassword}
          onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
        />
        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
      </div>

      <div className="text-xs text-gray-500">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-green-600 hover:text-green-700">Terms</a> and have read and acknowledge the{' '}
        <a href="#" className="text-green-600 hover:text-green-700">Privacy Policy</a>.
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">About your Farm</h2>
        <p className="text-gray-600">Step 2 of 3</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What do you call your farm? *</label>
        <input
          type="text"
          className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.farmName ? 'border-red-300' : ''
            }`}
          placeholder="For example: Mary's Organic Greens"
          value={farmForm.farmName}
          onChange={(e) => setFarmForm({ ...farmForm, farmName: e.target.value })}
        />
        {errors.farmName && <p className="mt-1 text-xs text-red-500">{errors.farmName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">What type of farm or ranch do you operate?</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="farmType"
              value="MIXED"
              checked={farmForm.farmType === 'MIXED'}
              onChange={(e) => setFarmForm({ ...farmForm, farmType: e.target.value })}
              className="text-green-500 focus:ring-green-500"
            />
            <span className="ml-2">Raise livestock and grow crops</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="farmType"
              value="LIVESTOCK"
              checked={farmForm.farmType === 'LIVESTOCK'}
              onChange={(e) => setFarmForm({ ...farmForm, farmType: e.target.value })}
              className="text-green-500 focus:ring-green-500"
            />
            <span className="ml-2">Only raise livestock</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="farmType"
              value="CROPS"
              checked={farmForm.farmType === 'CROPS'}
              onChange={(e) => setFarmForm({ ...farmForm, farmType: e.target.value })}
              className="text-green-500 focus:ring-green-500"
            />
            <span className="ml-2">Only grow crops</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Where are you located?</label>
        <p className="text-xs text-gray-500 mb-4">This will help us accurately map your farm. You can always edit this later.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
            <select
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
              value={farmForm.country}
              onChange={(e) => setFarmForm({ ...farmForm, country: e.target.value })}
            >
              <option value="Zimbabwe">Zimbabwe</option>
              <option value="South Africa">South Africa</option>
              <option value="Botswana">Botswana</option>
              <option value="Zambia">Zambia</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Address *</label>
            <input
              type="text"
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.address ? 'border-red-300' : ''
                }`}
              placeholder="1741 ushewekunze"
              value={farmForm.address}
              onChange={(e) => setFarmForm({ ...farmForm, address: e.target.value })}
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">City *</label>
              <input
                type="text"
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.city ? 'border-red-300' : ''
                  }`}
                placeholder="harare"
                value={farmForm.city}
                onChange={(e) => setFarmForm({ ...farmForm, city: e.target.value })}
              />
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">State/Province</label>
              <input
                type="text"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                placeholder="harare"
                value={farmForm.state}
                onChange={(e) => setFarmForm({ ...farmForm, state: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Postal Code</label>
            <input
              type="text"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
              placeholder="none"
              value={farmForm.postalCode}
              onChange={(e) => setFarmForm({ ...farmForm, postalCode: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Farm Location Map</span>
            {isGeocoding && (
              <div className="flex items-center text-xs text-gray-500">
                <i className="fas fa-spinner fa-spin mr-1"></i>
                Locating...
              </div>
            )}
          </div>

          <div className="h-64 rounded-lg overflow-hidden">
            <div
              ref={mapRef}
              className="w-full h-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-xs text-gray-600">
            <div>
              <span className="font-medium">Latitude</span>
              <p>{mapCoordinates ? mapCoordinates.lat.toFixed(6) : '-17.829200'}</p>
            </div>
            <div>
              <span className="font-medium">Longitude</span>
              <p>{mapCoordinates ? mapCoordinates.lng.toFixed(6) : '31.052200'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Account Preferences</h2>
        <p className="text-gray-600">Step 3 of 3</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Measurement System <i className="fas fa-info-circle text-gray-400 ml-1"></i>
          </label>
          <select
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
            value={preferencesForm.measurementSystem}
            onChange={(e) => setPreferencesForm({ ...preferencesForm, measurementSystem: e.target.value })}
          >
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
            value={preferencesForm.timezone}
            onChange={(e) => setPreferencesForm({ ...preferencesForm, timezone: e.target.value })}
          >
            <option value="GMT+02:00">(GMT+02:00) Central Africa Time</option>
            <option value="GMT+00:00">(GMT+00:00) Greenwich Mean Time</option>
            <option value="GMT-05:00">(GMT-05:00) Eastern Standard Time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Currency</label>
          <select
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
            value={preferencesForm.currency}
            onChange={(e) => setPreferencesForm({ ...preferencesForm, currency: e.target.value })}
          >
            <option value="USD">United States Dollar</option>
            <option value="ZWL">Zimbabwean Dollar</option>
            <option value="ZAR">South African Rand</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Average Last Frost <i className="fas fa-info-circle text-gray-400 ml-1"></i>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <select
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
              value={preferencesForm.lastFrostMonth}
              onChange={(e) => setPreferencesForm({ ...preferencesForm, lastFrostMonth: e.target.value })}
            >
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="July">July</option>
            </select>
            <select
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
              value={preferencesForm.lastFrostDay}
              onChange={(e) => setPreferencesForm({ ...preferencesForm, lastFrostDay: e.target.value })}
            >
              <option value="15">15</option>
              <option value="1">1</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-green-500 rounded mr-2"></div>
            <h1 className="text-3xl font-bold text-gray-800">Drayce Farm</h1>
          </div>
          {currentStep < 3 && (
            <p className="text-lg text-gray-600">Ready for a more organized and productive farm?</p>
          )}
        </div>

        {renderProgressSteps()}

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            {apiError && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg flex items-start">
                <i className="fas fa-exclamation-circle mt-0.5 mr-2"></i>
                <span>{apiError}</span>
              </div>
            )}

            {apiSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-600 text-sm rounded-lg flex items-start">
                <i className="fas fa-check-circle mt-0.5 mr-2"></i>
                <span>{apiSuccess}</span>
              </div>
            )}

            {/* Upload Progress Bar */}
            {isSubmitting && (
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Creating your account...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 font-medium"
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}

              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    Next <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Getting Started...
                      </>
                    ) : (
                      <>
                        Get Started <i className="fas fa-check ml-2"></i>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {currentStep === 1 && (
              <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  onClick={handleLogin}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign In
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="mt-6 text-center">
                <a href="#" className="text-green-600 hover:text-green-700 text-sm">
                  Need Help Getting Started?
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};