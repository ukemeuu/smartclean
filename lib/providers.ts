export type ProviderTestimonial = {
  quote: string;
  name: string;
  relationship: string;
};

export type ProviderAvailability = {
  day: string;
  slots: string[];
};

export interface ProviderProfile {
  id: string;
  slug: string;
  name: string;
  location: string;
  zonesServed: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  minBookingHours: number;
  serviceTypes: string[];
  specialties: string[];
  about: string;
  experience: string;
  languages: string[];
  badges: string[];
  backgroundCheck: boolean;
  suppliesIncluded: boolean;
  responseTime: string;
  highlights: string[];
  availabilityTags: string[];
  availability: ProviderAvailability[];
  testimonials: ProviderTestimonial[];
}

export const providers: ProviderProfile[] = [
  {
    id: "prv-001",
    slug: "sparkle-pro-cleaning",
    name: "SparklePro Cleaning",
    location: "Westlands",
    zonesServed: ["Westlands", "Parklands", "Lavington"],
    rating: 4.9,
    reviewCount: 182,
    hourlyRate: 1500,
    minBookingHours: 3,
    serviceTypes: [
      "Home Cleaning",
      "Deep Cleaning",
      "Move-in/Move-out",
      "Laundry & Ironing",
    ],
    specialties: [
      "Eco-friendly supplies",
      "Steam sanitation",
      "Pet-friendly cleaning",
    ],
    about:
      "SparklePro is a boutique cleaning collective that specialises in immaculate finishes and thoughtful customer care. Our team of vetted cleaners arrives with professional-grade, non-toxic supplies and a checklist tailored to your home.",
    experience: "8 years of professional residential cleaning",
    languages: ["English", "Swahili"],
    badges: ["Verified ID", "Top Rated", "COVID-19 Trained"],
    backgroundCheck: true,
    suppliesIncluded: true,
    responseTime: "Under 1 hour",
    highlights: [
      "Flexible rescheduling up to 2 hours before the visit",
      "Uses HEPA-certified vacuums",
      "Leaves a personalised care report after every booking",
    ],
    availabilityTags: ["Weekdays", "Saturday mornings"],
    availability: [
      { day: "Monday - Friday", slots: ["7:30 am - 5:30 pm"] },
      { day: "Saturday", slots: ["9:00 am - 2:00 pm"] },
    ],
    testimonials: [
      {
        quote:
          "SparklePro has transformed my apartment. They remember all the small details, from organising my pantry to leaving a handwritten note.",
        name: "Lucy – Riverside",
        relationship: "Weekly client for 2 years",
      },
      {
        quote:
          "Reliable, trustworthy, and genuinely kind cleaners. Communication is fast and professional.",
        name: "Michael – Parklands",
        relationship: "Bi-weekly client",
      },
    ],
  },
  {
    id: "prv-002",
    slug: "sunrise-nanny-agency",
    name: "Sunrise Nanny Agency",
    location: "Kilimani",
    zonesServed: ["Kilimani", "Kileleshwa", "Lavington"],
    rating: 4.8,
    reviewCount: 134,
    hourlyRate: 1800,
    minBookingHours: 4,
    serviceTypes: [
      "Full-time Nanny",
      "Part-time Nanny",
      "Night Nurse",
      "After-school Care",
    ],
    specialties: [
      "Infant care",
      "Special needs support",
      "Homework coaching",
    ],
    about:
      "Sunrise carefully matches families with career caregivers. Each nanny is first-aid certified, background checked, and supported by our training programme and family success manager.",
    experience: "12 years connecting families with professional caregivers",
    languages: ["English", "Swahili", "French"],
    badges: ["Verified ID", "Paediatric First Aid"],
    backgroundCheck: true,
    suppliesIncluded: false,
    responseTime: "Within 3 hours",
    highlights: [
      "Monthly coaching visits to ensure a great match",
      "On-call backup care",
      "Structured developmental activities",
    ],
    availabilityTags: ["Weekdays", "Evenings", "Overnight"],
    availability: [
      { day: "Monday - Friday", slots: ["6:00 am - 10:00 pm"] },
      { day: "Saturday", slots: ["8:00 am - 6:00 pm"] },
      { day: "Overnight", slots: ["10:00 pm - 6:00 am"] },
    ],
    testimonials: [
      {
        quote:
          "We were matched with a nanny who feels like part of our family. The agency checks in regularly and genuinely cares about our needs.",
        name: "Grace – Kilimani",
        relationship: "Full-time placement",
      },
      {
        quote:
          "Professional, responsive, and caring. They helped us arrange overnight support when our twins were newborns.",
        name: "Amina – Lavington",
        relationship: "Night nurse client",
      },
    ],
  },
  {
    id: "prv-003",
    slug: "greenleaf-home-care",
    name: "GreenLeaf Home Care",
    location: "Lavington",
    zonesServed: ["Lavington", "Kileleshwa", "Karen"],
    rating: 4.7,
    reviewCount: 96,
    hourlyRate: 1300,
    minBookingHours: 3,
    serviceTypes: [
      "Home Cleaning",
      "Garden Tidying",
      "Laundry & Ironing",
      "Errand Assistance",
    ],
    specialties: [
      "Plant care",
      "Senior companionship",
      "Eco detergents",
    ],
    about:
      "GreenLeaf blends cleaning, light gardening, and concierge-style errands. Ideal for households that need a steady, detail-oriented helping hand.",
    experience: "5 years serving gated communities and townhouses",
    languages: ["English", "Kikuyu", "Swahili"],
    badges: ["Verified ID", "Green Certified"],
    backgroundCheck: true,
    suppliesIncluded: true,
    responseTime: "Within 2 hours",
    highlights: [
      "Dedicated household manager for recurring clients",
      "Custom checklist per visit",
      "Green cleaning products included",
    ],
    availabilityTags: ["Weekdays", "Saturday", "Sunday"],
    availability: [
      { day: "Monday - Saturday", slots: ["8:00 am - 6:30 pm"] },
      { day: "Sunday", slots: ["10:00 am - 3:00 pm"] },
    ],
    testimonials: [
      {
        quote:
          "They handle everything from laundry to grocery drops with a smile. I love the sustainability focus.",
        name: "Njeri – Lavington",
        relationship: "Weekly client",
      },
      {
        quote:
          "Our elderly parents appreciate the companionship and consistency. Highly recommend.",
        name: "Brian – Karen",
        relationship: "Family care client",
      },
    ],
  },
  {
    id: "prv-004",
    slug: "elite-housekeeping-collective",
    name: "Elite Housekeeping Collective",
    location: "Kileleshwa",
    zonesServed: ["Kileleshwa", "Kilimani", "Upper Hill"],
    rating: 4.85,
    reviewCount: 208,
    hourlyRate: 1700,
    minBookingHours: 4,
    serviceTypes: [
      "Premium Home Cleaning",
      "Corporate Apartments",
      "Event Clean-up",
      "House Manager"],
    specialties: [
      "High-end finishes",
      "Butler-style turndown",
      "Guest preparation",
    ],
    about:
      "Elite Housekeeping serves diplomatic and executive residences that expect five-star presentation. A lead supervisor is present at every job to ensure impeccable standards.",
    experience: "10 years servicing embassies and executive rentals",
    languages: ["English", "Swahili"],
    badges: ["Verified ID", "Security Vetted", "Luxury Certified"],
    backgroundCheck: true,
    suppliesIncluded: true,
    responseTime: "Within 1 hour",
    highlights: [
      "On-site supervisor for every visit",
      "Discreet staff trained in hospitality etiquette",
      "Detailed handover reports with photos",
    ],
    availabilityTags: ["Weekdays", "Evenings", "Weekends"],
    availability: [
      { day: "Monday - Sunday", slots: ["6:00 am - 9:00 pm"] },
    ],
    testimonials: [
      {
        quote:
          "Our furnished apartments have never looked better. Guests constantly compliment the presentation.",
        name: "Joan – Upper Hill",
        relationship: "Corporate housing manager",
      },
      {
        quote:
          "Detail-oriented and trustworthy. They handle special events and VIP visits flawlessly.",
        name: "Embassy Admin",
        relationship: "Diplomatic residence",
      },
    ],
  },
  {
    id: "prv-005",
    slug: "little-steps-nannies",
    name: "Little Steps Nannies",
    location: "Runda",
    zonesServed: ["Runda", "Gigiri", "Muthaiga"],
    rating: 4.92,
    reviewCount: 152,
    hourlyRate: 1900,
    minBookingHours: 5,
    serviceTypes: [
      "Live-in Nanny",
      "Travel Nanny",
      "Homework Mentor",
      "Infant Specialist",
    ],
    specialties: [
      "Montessori-inspired play",
      "Sleep training",
      "Nutritional meal prep",
    ],
    about:
      "Little Steps recruits university-educated caregivers with ongoing professional development. Families receive personalised transition plans and secure daily updates.",
    experience: "9 years placing live-in and travel nannies",
    languages: ["English", "Swahili", "German"],
    badges: ["Verified ID", "Child CPR", "Travel Ready"],
    backgroundCheck: true,
    suppliesIncluded: false,
    responseTime: "Same day",
    highlights: [
      "Digital daily logs with photo updates",
      "Curriculum-based activities",
      "Emergency backup care",
    ],
    availabilityTags: ["Live-in", "Weekends", "Overnight"],
    availability: [
      { day: "Live-in", slots: ["Full time with scheduled rests"] },
      { day: "Short-term", slots: ["Custom travel schedules"] },
    ],
    testimonials: [
      {
        quote:
          "Our toddler warmed to her nanny instantly. The daily updates keep us connected even when we travel.",
        name: "Sonia – Gigiri",
        relationship: "Live-in placement",
      },
      {
        quote:
          "Professionalism from start to finish. They found us a bilingual nanny who fits our family's lifestyle.",
        name: "Marcus – Runda",
        relationship: "Travel nanny client",
      },
    ],
  },
  {
    id: "prv-006",
    slug: "swift-turnover-team",
    name: "Swift Turnover Team",
    location: "Westlands",
    zonesServed: ["Westlands", "Riverside", "Kilimani"],
    rating: 4.6,
    reviewCount: 88,
    hourlyRate: 1400,
    minBookingHours: 2,
    serviceTypes: [
      "Airbnb Changeover",
      "Laundry Service",
      "Inventory Restock",
      "Maintenance Checks",
    ],
    specialties: [
      "48-hour emergency turnovers",
      "Damage reporting",
      "Guest welcome styling",
    ],
    about:
      "Swift Turnover keeps short-stay rentals guest-ready with hotel-level cleaning, linen service, and consumable restocking. Includes digital checklists and photo documentation after each visit.",
    experience: "6 years supporting 120+ short-stay hosts",
    languages: ["English", "Swahili"],
    badges: ["Verified ID", "Host Preferred"],
    backgroundCheck: true,
    suppliesIncluded: true,
    responseTime: "Within 90 minutes",
    highlights: [
      "Integrates with Airbnb and Booking.com calendars",
      "Provides consumables restock",
      "Detailed guest-ready staging",
    ],
    availabilityTags: ["Weekdays", "Weekends", "Emergency"],
    availability: [
      { day: "Monday - Sunday", slots: ["7:00 am - 10:00 pm"] },
      { day: "Emergency", slots: ["24/7 rapid response team"] },
    ],
    testimonials: [
      {
        quote:
          "Their consistency has boosted our review scores. The photo updates are invaluable.",
        name: "Eric – Airbnb Superhost",
        relationship: "Daily turnovers",
      },
      {
        quote:
          "Even late check-outs aren't a problem. They always have a backup crew ready.",
        name: "Mary – Riverside",
        relationship: "Serviced apartment manager",
      },
    ],
  },
];

const formatSet = (values: string[]) =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

export const providerLocations = formatSet(
  providers.flatMap((provider) => [provider.location, ...provider.zonesServed]),
);

export const providerServices = formatSet(
  providers.flatMap((provider) => provider.serviceTypes),
);

export const providerAvailabilityTags = formatSet(
  providers.flatMap((provider) => provider.availabilityTags),
);

export const featuredProviders = providers
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3);

export function getProviderBySlug(slug: string): ProviderProfile | undefined {
  return providers.find((provider) => provider.slug === slug);
}
