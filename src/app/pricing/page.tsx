'use client';
import { useState, useEffect } from 'react';
//  import Header from'../../components/common/Header';
//  import Footer from'../../components/common/Footer';
 import { Button } from'../../components/ui/button';
 import { Switch } from'../../components/ui/switch';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
  buttonStyle: 'primary' | 'secondary';
}

interface FeatureComparison {
  category: string;
  features: {
    name: string;
    starter: string | boolean;
    business: string | boolean;
    enterprise: string | boolean;
  }[];
}

interface AddonBundle {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: string;
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<string>('Contract Analysis')
  const [userCount, setUserCount] = useState<number>(5)
  const [contractCount, setContractCount] = useState<number>(50)
  const [advancedRisk, setAdvancedRisk] = useState<boolean>(false)
  const [compliance, setCompliance] = useState<boolean>(false)
  const [estimatedCost, setEstimatedCost] = useState<number>(200)

  useEffect(() => {
    // Calculate estimated cost based on selections
    let cost = userCount * 20 + contractCount * 2
    if (advancedRisk) cost += 50
    if (compliance) cost += 75
    setEstimatedCost(cost)
  }, [userCount, contractCount, advancedRisk, compliance])

  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$49',
      period: '/mo',
      description: 'For solo lawyers and freelancers.',
      features: [
        '1 User',
        '10 Contract Analyses /mo',
        'Basic Risk Detection',
        'Email Support'
      ],
      buttonText: 'Get Started',
      isPopular: false,
      buttonStyle: 'secondary'
    },
    {
      id: 'business',
      name: 'Business',
      price: '$199',
      period: '/mo',
      description: 'For growing legal teams.',
      features: [
        '5 Users',
        'Unlimited Analyses',
        'Advanced Risk & Compliance',
        'Comparison Tools',
        'Priority Support'
      ],
      buttonText: 'Start Free Trial',
      isPopular: true,
      buttonStyle: 'primary'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations.',
      features: [
        'Unlimited Users',
        'Custom AI Models',
        'API Access & Integrations',
        'Dedicated Success Manager',
        'SSO & Audit Logs'
      ],
      buttonText: 'Contact Sales',
      isPopular: false,
      buttonStyle: 'secondary'
    }
  ]

  const featureComparison: FeatureComparison[] = [
    {
      category: 'Core Features',
      features: [
        { name: 'Contract Analysis', starter: true, business: true, enterprise: true },
        { name: 'Clause Extraction', starter: 'Basic', business: 'Advanced', enterprise: 'Advanced' },
        { name: 'Document Storage', starter: '1GB', business: '50GB', enterprise: 'Unlimited' },
        { name: 'Search & Filtering', starter: true, business: true, enterprise: true }
      ]
    },
    {
      category: 'Intelligence',
      features: [
        { name: 'Risk Detection', starter: 'Basic', business: 'Advanced', enterprise: 'Custom' },
        { name: 'Comparison Tool', starter: false, business: true, enterprise: true },
        { name: 'Playbook Matching', starter: false, business: true, enterprise: true },
        { name: 'Multi-language', starter: false, business: '5 Languages', enterprise: 'Unlimited' }
      ]
    },
    {
      category: 'Security & Support',
      features: [
        { name: 'SSO (SAML)', starter: false, business: false, enterprise: true },
        { name: 'Data Residency', starter: 'US', business: 'US/EU', enterprise: 'Global' },
        { name: 'Support', starter: 'Email', business: 'Priority Email', enterprise: '24/7 Dedicated' }
      ]
    }
  ]

  const addonBundles: AddonBundle[] = [
    {
      id: 'legal-team',
      name: 'Legal Team Bundle',
      price: '$99/mo',
      description: 'Perfect for teams scaling up.',
      features: [
        '5 Additional User Seats',
        'Shared Team Workspace',
        'Collaborative Commenting'
      ],
      icon: '/images/img_background_blue_50_02.svg'
    },
    {
      id: 'compliance',
      name: 'Compliance Bundle',
      price: '$149/mo',
      description: 'Advanced regulatory checks.',
      features: [
        'GDPR & CCPA Scans',
        'HIPAA Compliance Check',
        'Audit Log Export'
      ],
      icon: '/images/img_background_blue_50_02_48x48.svg'
    },
    {
      id: 'intensive',
      name: 'Intensive Review Bundle',
      price: '$199/mo',
      description: 'For high-volume periods.',
      features: [
        '+500 Extra Analyses',
        'Priority Processing',
        'Concierge Onboarding'
      ],
      icon: '/images/img_background_48x48.svg'
    }
  ]

  const tabs = [
    'Contract Analysis',
    'Comparison',
    'Risk Detection',
    'Legal Compliance',
    'Clause Insights',
    'API & Integrations'
  ]

  const handlePlanSelection = (planId: string) => {
    console.log('Selected plan:', planId)
  }

  const handleAddonSelection = (addonId: string) => {
    console.log('Selected addon:', addonId)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      {/* <Header /> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="w-full bg-gradient-to-b from-[#fffefe00] via-[#fffefe33] to-white py-16 sm:py-20 md:py-24 lg:py-32"
          style={{ backgroundImage: "url('/images/img_image.png')" }}
        >
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20">
            <div className="flex flex-col gap-12 justify-start items-center">
              {/* Title and Description */}
              <div className="flex flex-col gap-6 justify-start items-center w-full">
                <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold leading-tight text-center capitalize text-[#0e2259] max-w-4xl">
                  <span className="text-[#0e2259]">Simple, transparent pricing</span><br />
                  <span className="text-[#2761ff]">for every legal team.</span>
                </h1>
                
                <div className="flex flex-col gap-6 justify-start items-center w-full max-w-2xl mx-auto px-3">
                  <p className="text-lg sm:text-xl font-normal leading-[37px] text-center text-[#0e2259]">
                    From solo practitioners to enterprise legal departments. Choose the plan that<br className="hidden sm:block" />
                    fits your scale.
                  </p>
                  
                  {/* Billing Toggle */}
                  <div className="flex flex-row justify-center items-start w-auto gap-4">
                    <span className="text-xl font-medium leading-[38px] text-center text-[#515151] self-center">
                      Monthly
                    </span>
                    <div className="mt-1">
                      <Switch 
                        checked={isYearly}
                        onCheckedChange={setIsYearly}
                        className="ml-4"
                      />
                    </div>
                    <div className="flex flex-row justify-center items-center ml-4">
                      <span className="text-xl font-semibold leading-[37px] text-center text-[#2761ff]">
                        Yearly 
                      </span>
                      <span className="text-xs font-medium leading-[16px] text-center text-[#1f4ecc] bg-[#dfe7ff] px-2 py-1 rounded-[10px] ml-2">
                        -20%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4 sm:px-8">
                {pricingTiers.map((tier, index) => (
                  <div 
                    key={tier.id}
                    className={`flex flex-col justify-start items-center w-full h-auto shadow-[0px_1px_2px_#00000019] border rounded-[16px] mt-2 mb-2 ${
                      tier.isPopular 
                        ? 'border-[#e9efff] bg-white relative' 
                        : 'border-[#e1e8f0] bg-[#fffefecc]'
                    }`}
                  >
                    {/* Popular Badge */}
                    {tier.isPopular && (
                      <>
                        <div className="w-full h-1 bg-[#2761ff] rounded-t-[16px]"></div>
                        <div className="absolute top-4 right-6 bg-[#bcceff] px-2 py-1 rounded-[10px] shadow-[0px_1px_2px_#0000000c]">
                          <span className="text-xs font-semibold leading-[16px] text-[#1d49bf]">
                            Most Popular
                          </span>
                        </div>
                      </>
                    )}

                    <div className="flex flex-col justify-start items-start w-full p-6">
                      {/* Header */}
                      <div className="flex flex-row justify-start items-center w-full mb-6">
                        <h3 className="text-2xl font-bold leading-[31px] text-left text-[#0e162b]">
                          {tier.name}
                        </h3>
                        {tier.name === 'Business' && (
                          <img 
                            src="/images/img_svg_blue_a700.svg" 
                            alt="Popular" 
                            className="w-4 h-4 ml-2"
                          />
                        )}
                      </div>

                      <p className="text-base font-normal leading-[29px] text-left text-[#3f3f3f] mb-6">
                        {tier.description}
                      </p>

                      {/* Price */}
                      <div className="flex flex-row justify-start items-center w-full mb-8">
                        <span className={`font-bold leading-[67px] text-left text-[#05090f] ${
                          tier.name === 'Enterprise' ? 'text-4xl' : 'text-4xl'
                        }`}>
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-base font-normal leading-[22px] text-left text-[#878787] self-end ml-2">
                            {tier.period}
                          </span>
                        )}
                      </div>

                      {/* Features */}
                      <div className="flex flex-col gap-1 justify-start items-start w-full mb-8">
                        {tier.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex flex-row justify-start items-start w-full">
                            <img 
                              src="/images/img_svg.svg" 
                              alt="Check" 
                              className="w-4 h-4 mt-1"
                            />
                            <span className="text-base font-normal leading-[29px] text-left text-[#0d1b2a] ml-3 self-center">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Button
                        variant={tier.buttonStyle === 'primary' ? 'default' : 'outline'}
                        size="lg"
                        className="w-full py-2 px-8 mt-4"
                        onClick={() => handlePlanSelection(tier.id)}
                      >
                        {tier.buttonText}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platform Solutions */}
        <section className="w-full bg-[#f8f9fb] py-12 -mt-18">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-14">
            <div className="flex flex-col gap-12 justify-start items-center">
              <div className="flex flex-col gap-4 justify-start items-center w-full max-w-4xl">
                <h2 className="text-3xl font-bold leading-[59px] text-center text-[#0e2259]">
                  One platform, multiple solutions.
                </h2>
                <p className="text-xl font-normal leading-[26px] text-center text-[#0d1b2a] px-14">
                  Everything you need to manage the contract lifecycle.
                </p>
              </div>

              <div className="flex flex-col gap-8 justify-start items-center w-full max-w-4xl">
                {/* Tab Navigation */}
                <div className="flex flex-row justify-center items-start w-full overflow-x-auto">
                  <div className="flex flex-row justify-center items-center bg-white border border-[#e1e8f0] rounded-[28px] p-1 shadow-[0px_1px_2px_#00000019] min-w-max">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-4 py-2 rounded-[22px] text-base font-semibold leading-[30px] text-center transition-all whitespace-nowrap ${
                          selectedTab === tab 
                            ? 'bg-[#2761ff] text-white shadow-[0px_1px_2px_#00000019]' 
                            : 'text-[#3f3f3f] hover:text-[#2761ff]'
                        } ${index > 0 ? 'ml-4 sm:ml-8' : ''}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full bg-white border border-[#e9efff] rounded-[16px] p-12 shadow-[0px_1px_2px_#00000019]">
                  <div className="flex flex-col lg:flex-row justify-start items-center gap-6">
                    {/* Left Content */}
                    <div className="flex flex-col gap-6 justify-start items-start w-full lg:w-1/2">
                      <img 
                        src="/images/img_background.svg" 
                        alt="Feature Icon" 
                        className="w-12 h-12 rounded-[16px]"
                      />
                      
                      <div className="flex flex-col justify-start items-center w-full">
                        <div className="flex flex-col gap-3 justify-start items-start w-full mb-6">
                          <h3 className="text-2xl font-bold leading-[44px] text-left text-[#0e2259]">
                            Instant Contract Review
                          </h3>
                          <p className="text-base font-semibold leading-[29px] text-left text-[#3f3f3f]">
                            Upload any legal document and get an instant summary, key clause<br className="hidden sm:block" />
                            extraction, and obligation mapping in seconds.
                          </p>
                        </div>

                        {/* Feature List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-4">
                          <div className="flex flex-col gap-1 justify-start items-center">
                            <div className="flex flex-row justify-start items-start w-full">
                              <img 
                                src="/images/img_svg_green_a700.svg" 
                                alt="Check" 
                                className="w-4 h-4 mt-1"
                              />
                              <span className="text-sm font-normal leading-[26px] text-left text-[#3f3f3f] ml-2">
                                Automatic Summary
                              </span>
                            </div>
                            <div className="flex flex-row justify-start items-start w-full">
                              <img 
                                src="/images/img_svg_green_a700.svg" 
                                alt="Check" 
                                className="w-4 h-4 mt-1"
                              />
                              <span className="text-sm font-normal leading-[26px] text-left text-[#3f3f3f] ml-2">
                                Obligation Tracking
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 justify-start items-center">
                            <div className="flex flex-row justify-start items-start w-full">
                              <img 
                                src="/images/img_svg_green_a700.svg" 
                                alt="Check" 
                                className="w-4 h-4 mt-1"
                              />
                              <span className="text-sm font-normal leading-[26px] text-left text-[#3f3f3f] ml-2">
                                Clause Extraction
                              </span>
                            </div>
                            <div className="flex flex-row justify-start items-start w-full">
                              <img 
                                src="/images/img_svg_green_a700.svg" 
                                alt="Check" 
                                className="w-4 h-4 mt-1"
                              />
                              <span className="text-sm font-normal leading-[26px] text-left text-[#3f3f3f] ml-2">
                                Multi-language Support
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row justify-between items-end w-full border-t border-[#f0f4f9] pt-4 mt-4">
                          <div className="flex flex-col justify-start items-center mb-4 sm:mb-0">
                            <span className="text-sm font-semibold leading-[26px] text-left text-[#3f3f3f]">
                              Pricing
                            </span>
                            <span className="text-base font-semibold leading-[29px] text-left text-[#2761ff] -mt-2">
                              Included in all plans
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 px-6 py-1"
                          >
                            <span>Learn more</span>
                            <img 
                              src="/images/img_svg_black_900.svg" 
                              alt="Arrow" 
                              className="w-4 h-4"
                            />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full lg:w-1/2">
                      <img 
                        src="/images/img_background_border.png" 
                        alt="Feature Preview" 
                        className="w-full h-auto rounded-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="w-full bg-white py-20">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-14">
            <div className="flex flex-col gap-12 justify-start items-center">
              <div className="flex flex-col justify-start items-center w-full max-w-3xl">
                <h2 className="text-3xl font-bold leading-[59px] text-center text-[#05090f]">
                  Compare Features
                </h2>
                <p className="text-base font-normal leading-[21px] text-center text-[#3f3f3f] px-14">
                  Detailed breakdown of what is included.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="w-full max-w-3xl bg-white border border-[#e1e8f0] rounded-[16px] shadow-[0px_1px_2px_#00000019] overflow-hidden">
                {/* Table Header */}
                <div className="flex flex-row justify-between items-end bg-[#f8f9fb] px-8 py-2">
                  <span className="text-xl font-semibold leading-[37px] text-left text-[#05090f] w-2/12">
                    Feature
                  </span>
                  <span className="text-xl font-semibold leading-[37px] text-center text-[#05090f] w-2/12">
                    Starter
                  </span>
                  <span className="text-xl font-semibold leading-[37px] text-center text-[#2761ff] w-2/12">
                    Business
                  </span>
                  <span className="text-xl font-semibold leading-[37px] text-center text-[#05090f] w-2/12">
                    Enterprise
                  </span>
                </div>

                {/* Table Body */}
                <div className="flex flex-col justify-start items-center w-full">
                  {featureComparison.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="flex flex-col justify-start items-center w-full">
                      {/* Category Header */}
                      <div className="flex flex-row justify-start items-end w-full border-t border-b border-[#f0f4f9] bg-[#f8f9fb7f] px-8 py-2">
                        <span className="text-sm font-normal leading-[26px] text-left text-[#0e2259]">
                          {category.category}
                        </span>
                      </div>

                      {/* Category Features */}
                      {category.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex flex-row justify-start items-center w-full px-8 py-4 border-b border-[#f0f4f9] last:border-b-0">
                          <span className="text-sm font-semibold leading-[26px] text-left text-[#314157] w-3/12">
                            {feature.name}
                          </span>
                          
                          <div className="w-3/12 text-center">
                            {typeof feature.starter === 'boolean' ? (
                              feature.starter ? (
                                <img src="/images/img_vector.svg" alt="Yes" className="w-3 h-2 mx-auto" />
                              ) : (
                                <div className="w-3 h-0.5 bg-[#9ca3af] mx-auto"></div>
                              )
                            ) : (
                              <span className="text-sm font-semibold leading-[26px] text-[#05090f]">
                                {feature.starter}
                              </span>
                            )}
                          </div>
                          
                          <div className="w-3/12 text-center">
                            {typeof feature.business === 'boolean' ? (
                              feature.business ? (
                                <div className="bg-[#eef2ff7f] py-2 px-4 rounded">
                                  <img src="/images/img_vector.svg" alt="Yes" className="w-3 h-2 mx-auto" />
                                </div>
                              ) : (
                                <div className="w-3 h-0.5 bg-[#9ca3af] mx-auto"></div>
                              )
                            ) : (
                              <div className="bg-[#eef2ff7f] py-2 px-4 rounded">
                                <span className="text-sm font-semibold leading-[26px] text-[#0e2259]">
                                  {feature.business}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="w-3/12 text-center">
                            {typeof feature.enterprise === 'boolean' ? (
                              feature.enterprise ? (
                                <img src="/images/img_vector.svg" alt="Yes" className="w-3 h-2 mx-auto" />
                              ) : (
                                <div className="w-3 h-0.5 bg-[#9ca3af] mx-auto"></div>
                              )
                            ) : (
                              <span className="text-sm font-semibold leading-[26px] text-[#05090f]">
                                {feature.enterprise}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add-on Bundles */}
        <section className="w-full bg-[#f8f9fb] py-20 -mt-7">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-14">
            <div className="flex flex-col gap-12 justify-start items-center">
              <div className="flex flex-col gap-1 justify-start items-center w-full">
                <h2 className="text-3xl font-bold leading-[38px] text-center text-[#0e162b]">
                  Add-on Bundles
                </h2>
                <p className="text-base font-normal leading-[21px] text-center text-[#45556c]">
                  Enhance your plan with specialized capabilities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {addonBundles.map((bundle) => (
                  <div 
                    key={bundle.id}
                    className="flex flex-col justify-center items-center w-full h-auto bg-white border border-[#e1e8f0] rounded-[16px] p-6 shadow-[0px_1px_2px_#00000019]"
                  >
                    <div className="flex flex-col justify-start items-start w-full">
                      <img 
                        src={bundle.icon} 
                        alt="Bundle Icon" 
                        className="w-12 h-12 rounded-[16px] mb-4"
                      />
                      
                      <div className="flex flex-col justify-start items-center w-full mb-3">
                        <h3 className="text-xl font-bold leading-[37px] text-left text-[#05090f] w-full">
                          {bundle.name}
                        </h3>
                        <span className="text-2xl font-bold leading-[44px] text-left text-[#2761ff] w-full -mt-1">
                          {bundle.price}
                        </span>
                      </div>

                      <p className="text-sm font-normal leading-[26px] text-left text-[#515151] mb-4">
                        {bundle.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-col gap-1 justify-start items-center w-full mb-6">
                        {bundle.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex flex-row justify-start items-start w-full">
                            <img 
                              src="/images/img_svg_margin.svg" 
                              alt="Check" 
                              className="w-4 h-[18px]"
                            />
                            <span className="text-sm font-semibold leading-[26px] text-left text-[#05090f] ml-3">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full py-2 px-8"
                        onClick={() => handleAddonSelection(bundle.id)}
                      >
                        Add to Plan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Custom Estimate Calculator */}
        <section className="w-full bg-white py-20 border-t border-[#f0f4f9]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-14">
            <div className="flex flex-col gap-12 justify-start items-center">
              <div className="flex flex-col gap-1 justify-start items-center w-full max-w-2xl">
                <h2 className="text-3xl font-bold leading-[38px] text-center text-[#0e162b]">
                  Get a custom estimate
                </h2>
                <p className="text-base font-normal leading-[21px] text-center text-[#45556c]">
                  Calculate your monthly costs based on volume.
                </p>
              </div>

              <div className="w-full max-w-3xl bg-white border border-[#e1e8f0] rounded-[24px] p-12 shadow-[0px_8px_10px_#00000019]">
                <div className="flex flex-col lg:flex-row gap-12 justify-center items-center">
                  {/* Left Controls */}
                  <div className="flex flex-col gap-7 justify-start items-center w-full lg:w-1/2">
                    {/* User Count */}
                    <div className="flex flex-col gap-4 justify-start items-center w-full">
                      <div className="flex flex-row justify-between items-center w-full">
                        <span className="text-xl font-normal leading-[37px] text-left text-[#0e2259]">
                          Number of Users
                        </span>
                        <div className="bg-[#e9efff] px-3 py-1 rounded-[14px]">
                          <span className="text-sm font-bold leading-[18px] text-left text-[#2761ff]">
                            {userCount} users
                          </span>
                        </div>
                      </div>
                      <img 
                        src="/images/img_container.svg" 
                        alt="Slider" 
                        className="w-full h-[38px]"
                      />
                      <p className="text-xs font-normal leading-[16px] text-left text-[#3f3f3f] w-full">
                        Includes access to workspace and collaboration tools.
                      </p>
                    </div>

                    {/* Contract Count */}
                    <div className="flex flex-col gap-4 justify-start items-center w-full">
                      <div className="flex flex-row justify-between items-center w-full">
                        <span className="text-xl font-normal leading-[37px] text-left text-[#0e2259]">
                          Contracts / mo
                        </span>
                        <div className="bg-[#e9efff] px-3 py-1 rounded-[14px]">
                          <span className="text-sm font-bold leading-[18px] text-left text-[#2761ff]">
                            {contractCount} docs
                          </span>
                        </div>
                      </div>
                      <img 
                        src="/images/img_container.svg" 
                        alt="Slider" 
                        className="w-full h-[38px]"
                      />
                      <p className="text-xs font-semibold leading-[22px] text-left text-[#3f3f3f] w-full">
                        Monthly volume of contracts analyzed.
                      </p>
                    </div>

                    {/* Additional Options */}
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row justify-between items-start w-full">
                        <span className="text-base font-normal leading-[29px] text-left text-[#05090f] self-center">
                          Advanced Risk Mode
                        </span>
                        <Switch 
                          checked={advancedRisk}
                          onCheckedChange={setAdvancedRisk}
                        />
                      </div>
                      <div className="flex flex-row justify-between items-start w-full">
                        <span className="text-base font-normal leading-[29px] text-left text-[#05090f] self-center">
                          Regulatory Compliance
                        </span>
                        <Switch 
                          checked={compliance}
                          onCheckedChange={setCompliance}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Estimate Card */}
                  <div className="relative w-full lg:w-1/2">
                    <div className="absolute top-0 right-0 w-[88px] h-[88px]">
                      <img src="/images/img_background_blur.png" alt="Decoration" className="w-full h-full" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-[56px] h-[56px]">
                      <img src="/images/img_background_blur_56x56.png" alt="Decoration" className="w-full h-full" />
                    </div>
                    
                    <div className="bg-[#0e162b] rounded-[16px] p-8 mx-8 relative z-10">
                      <div className="flex flex-col justify-start items-start w-full">
                        <span className="text-xl font-normal leading-[37px] text-left text-[#e9efff]">
                          Estimated Cost
                        </span>
                        <span className="text-5xl font-bold leading-[89px] text-left text-white mt-2">
                          ${estimatedCost}
                        </span>
                        <p className="text-sm font-normal leading-[26px] text-left text-[#e9efff] w-1/2">
                          per month billed annually
                        </p>

                        {/* Cost Breakdown */}
                        <div className="flex flex-col gap-3 w-full mt-8">
                          <div className="flex flex-row justify-between items-start w-full">
                            <span className="text-sm font-semibold leading-[26px] text-left text-[#e7e8ea]">
                              Users ({userCount})
                            </span>
                            <span className="text-sm font-normal leading-[18px] text-left text-[#e7e8ea]">
                              ${userCount * 20}
                            </span>
                          </div>
                          <div className="flex flex-row justify-between items-start w-full">
                            <span className="text-sm font-semibold leading-[26px] text-left text-[#e7e8ea]">
                              Contracts ({contractCount})
                            </span>
                            <span className="text-sm font-normal leading-[18px] text-left text-[#e7e8ea]">
                              ${contractCount * 2}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="default"
                          size="lg"
                          className="w-full py-3 px-8 mt-10"
                        >
                          Contact Sales
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="w-full bg-gradient-to-r from-[#0e2259] to-[#1e48bf] py-24 -mt-1"
          style={{ 
            background: 'linear-gradient(165deg, #0e2259 0%, #1e48bf 100%)'
          }}
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-14">
            <div className="flex flex-row justify-between items-start w-full">
              <img 
                src="/images/img_ellipse_3.png" 
                alt="Decoration" 
                className="w-[84px] h-[170px]"
              />
              
              <div className="flex flex-col gap-5 justify-start items-center self-end w-full max-w-2xl mt-24 px-4">
                <h2 className="text-[20px] sm:text-[30px] md:text-[40px] font-bold leading-[74px] text-center text-white">
                  Ready to streamline your legal review?
                </h2>
                <p className="text-xl font-normal leading-[37px] text-center text-[#90a1b8]">
                  Join 500+ legal teams using ContractAI to close deals faster.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-end w-full px-14">
                  <Button
                    variant="default"
                    size="lg"
                    className="px-8 py-4 rounded-[16px] shadow-[0px_4px_6px_#302c857f]"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 rounded-[16px] border-[#314157] text-white hover:bg-white/10"
                  >
                    Book Demo
                  </Button>
                </div>
              </div>

              <img 
                src="/images/img_ellipse_2.png" 
                alt="Decoration" 
                className="w-[140px] h-[160px]"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  )
}