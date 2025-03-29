import React from 'react';
import Hero_section_image from '../assets/Hero_section_image.jpg';
import landing_page_logo from '../assets/landing_page_logo.png';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto sm:h-10 mr-3"
                src={landing_page_logo}
                alt="Logo"
              />
              <span className="hidden sm:block text-xl font-bold">Faculty Excellence Tracker</span>
            </div>
            <div>
              <button
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => window.location.href = '/login'}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Track and Improve</span>{' '}
                  <span className="block text-indigo-600 xl:inline">Faculty Excellence</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Empower your institution with comprehensive faculty tracking and development tools.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => window.location.href = '/login'}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={Hero_section_image}
            alt="Faculty Excellence"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Are We Providing?
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {feature.icon}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-gray-400">&copy; 2024 Faculty Excellence Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature data
const features = [
  {
    name: 'Effortless Appraisal',
    description: 'Streamline your appraisal process with easy form submissions and automated data imports.',
    icon: '📝',
  },
  {
    name: 'Data-Driven Insights',
    description: 'Leverage powerful analytics to make informed decisions and identify areas for improvement.',
    icon: '📊',
  },
  {
    name: 'Fair and Transparent Evaluations', 
    description: 'Ensure objectivity and accountability with role-based access, hierarchical models, and secure data privacy.',
    icon: '⚖️',
  },
  {
    name: 'Fairness and Transparency',
    description: 'Our system promotes unbiased evaluations through a transparent and secure process.',
    icon: '🔒',
  },
  {
    name: 'Data-Driven Insights',
    description: 'Gain valuable insights from robust analytics based on various benchmarks and criteria.',
    icon: '📈',
  },
  {
    name: 'Streamlined Efficiency',
    description: 'Simplify your appraisal workflow with easy-to-use forms and automated data imports.',
    icon: '⚡',
  },
];

// Pricing data
const pricingPlans = [
  {
    name: 'Free Plan',
    subtitle: 'Essential Access',
    price: '₹0',
    description: 'Perfect for small institutions or pilot programs. Get started with the core features of FET to manage faculty appraisals.',
    features: [
      'Form Submission: Basic features to create and submit faculty appraisal forms',
      'Benchmarks: Set benchmarks and track faculty performance',
      'Appraisal Scores: Generate and view final faculty appraisal scores'
    ],
    
    href: '/login',
    cta: 'Start for free',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100'
  },
  {
    name: 'Premium Plan',
    subtitle: 'Flexible & Scalable',
    price: '₹999',
    popular: true,
    description: 'Ideal for growing institutions that require more flexibility and scalability.',
    features: [
      'Pay as you grow—expand the number of faculty members and admins as needed',
      'Benchmarks: Set benchmarks and track faculty performance',
      'Appraisal Scores: Generate and view final faculty appraisal scores'
    ],
    
    href: '/login',
    cta: 'Get Plus',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100'
  },
  {
    name: 'Pro Plan',
    subtitle: 'Premium Access',
    price: '₹1999',
    description: 'This plan is designed to meet the unique requirements of your faculty appraisal processes.',
    features: [
      'Tailor the platform to meet your institution’s specific faculty appraisal requirements.',
      'Dedicated support to ensure smooth operations.',
      ' Unlimited access to all features without restrictions.'
    ],
    
    href: '/login',
    cta: 'Get Pro',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100'
  },
  {
    name: 'Pro+ Plan',
    subtitle: 'Custom Solutions',
    price: 'Custom',
    description: 'For organizations that want to rebrand FET as their own platform.',
    features: [
      'Use FET’s faculty appraisal platform and rebrand it to align with your organizations identity.',
      'Only pay for the services you use no unnecessary overhead.',
      ' Maintain control over branding and user experience while outsourcing technical management.'
    ],
    
    href: '/login',
    cta: 'Contact Us',
    bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100'
  }
];

// Update the pricing section JSX
const PricingSection = () => (
  <div className="bg-gray-100 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center mb-12">
        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Choose Your Plan
        </p>
      </div>

      <div className="mt-10 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:max-w-full lg:mx-auto">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className={`${plan.bgColor} rounded-lg shadow-lg h-full flex flex-col relative`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 -mr-1 -mt-1 w-24 h-24 overflow-hidden">
                <div className="absolute transform rotate-45 bg-indigo-600 text-white text-xs text-center font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
                  POPULAR
                </div>
              </div>
            )}
            <div className="p-6 flex-grow flex flex-col">
              {/* Header Section */}
              <div className="mb-8">
                <h2 className="text-2xl leading-6 font-semibold text-gray-900">{plan.name}</h2>
                <p className="mt-1 text-sm text-indigo-600 font-medium">{plan.subtitle}</p>
                <p className="mt-4 text-sm text-gray-500 min-h-[60px]">{plan.description}</p>
              </div>

              {/* Pricing Section */}
              <div className="mb-8">
                <p className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {typeof plan.price === 'number' ? `₹${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'number' && (
                    <span className="text-base font-medium text-gray-500 ml-2">/month</span>
                  )}
                </p>
              </div>

              {/* Features Section */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Key Features:</h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button Section - Always at bottom */}
              <div className="mt-auto">
                <button
                  onClick={() => window.location.href = plan.href}
                  className="w-full bg-indigo-600 rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-indigo-700 transition-colors duration-200"
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Landing;
