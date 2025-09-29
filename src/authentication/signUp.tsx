import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserFormData {
  email: string;
  name: string;
  surname: string;
  gender: string;
  phone_number: string;
  license_plate: string;
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

export const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [apiError, setApiError] = useState<string>('');
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState<UserFormData>({
    email: '',
    name: '',
    surname: '',
    gender: 'female',
    phone_number: '',
    license_plate: '',
    role: 'staff',
    password: '',
    confirmPassword: ''
  });

  const [farmForm, setFarmForm] = useState<FarmFormData>({
    farmName: '',
    farmType: 'mixed',
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

  const handleLogin = () => {
    navigate('/login');
  };

  const validateStep = (step: number) => {
    const newErrors: any = {};

    if (step === 1) {
      if (!userForm.name) newErrors.name = 'Required';
      if (!userForm.surname) newErrors.surname = 'Required';
      if (!userForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email)) {
        newErrors.email = 'Invalid email';
      }
      if (!userForm.phone_number || userForm.phone_number.length < 10) {
        newErrors.phone_number = 'Must be 10+ digits';
      }
      if (!userForm.license_plate) newErrors.license_plate = 'Required';
      if (!userForm.password || userForm.password.length < 8) {
        newErrors.password = '8+ characters required';
      }
      if (userForm.password !== userForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords must match';
      }
    }

    if (step === 2) {
      if (!farmForm.farmName) newErrors.farmName = 'Farm name is required';
      if (!farmForm.address) newErrors.address = 'Address is required';
      if (!farmForm.city) newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      // This would integrate with your existing API calls
      console.log('Submitting:', { userForm, farmForm, preferencesForm });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to success or dashboard
      handleNavigation('/dashboard');
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
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
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.phone_number ? 'border-red-300' : 'border-gray-300'
              }`}
            value={userForm.phone_number}
            onChange={(e) => setUserForm({ ...userForm, phone_number: e.target.value })}
          />
          {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number}</p>}
        </div>
        
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
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
        <p className="mt-1 text-xs text-gray-500">8 characters min • One uppercase • One lowercase</p>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            }`}
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
        <p className="text-gray-600">Step 1 of 2</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What do you call your farm?</label>
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
              value="mixed"
              checked={farmForm.farmType === 'mixed'}
              onChange={(e) => setFarmForm({ ...farmForm, farmType: e.target.value })}
              className="text-green-500 focus:ring-green-500"
            />
            <span className="ml-2">Raise livestock and grow crops</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="farmType"
              value="livestock"
              checked={farmForm.farmType === 'livestock'}
              onChange={(e) => setFarmForm({ ...farmForm, farmType: e.target.value })}
              className="text-green-500 focus:ring-green-500"
            />
            <span className="ml-2">Only raise livestock</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="farmType"
              value="crops"
              checked={farmForm.farmType === 'crops'}
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
            <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
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
              <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
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
            <span className="text-sm font-medium text-gray-700">Tagged Location</span>
            <i className="fas fa-info-circle text-gray-400"></i>
          </div>
          <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Map preview would appear here</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-xs text-gray-600">
            <div>
              <span className="font-medium">Latitude</span>
              <p>-17.8396095</p>
            </div>
            <div>
              <span className="font-medium">Longitude</span>
              <p>31.2183039</p>
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
        <p className="text-gray-600">Step 2 of 2</p>
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
            <h1 className="text-3xl font-bold text-gray-800">farm</h1>
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

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 font-medium"
                >
                  Back
                </button>
              )}

              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center"
                  >
                    Next <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center"
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