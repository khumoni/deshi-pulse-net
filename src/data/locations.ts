export const bangladeshLocations = {
  divisions: {
    dhaka: {
      name: "ঢাকা",
      districts: {
        dhaka: {
          name: "ঢাকা",
          upazilas: ["ধানমন্ডি", "গুলশান", "উত্তরা", "মিরপুর", "রমনা", "তেজগাঁও", "পল্লবী", "শাহআলী"]
        },
        gazipur: {
          name: "গাজীপুর",
          upazilas: ["গাজীপুর সদর", "কালীগঞ্জ", "কাপাসিয়া", "শ্রীপুর", "টঙ্গী"]
        },
        narayanganj: {
          name: "নারায়ণগঞ্জ",
          upazilas: ["নারায়ণগঞ্জ সদর", "আড়াইহাজার", "বন্দর", "রূপগঞ্জ", "সোনারগাঁ"]
        }
      }
    },
    chittagong: {
      name: "চট্টগ্রাম",
      districts: {
        chittagong: {
          name: "চট্টগ্রাম",
          upazilas: ["চট্টগ্রাম সদর", "হাটহাজারী", "রাউজান", "সীতাকুণ্ড", "মীরসরাই", "ফটিকছড়ি"]
        },
        coxsbazar: {
          name: "কক্সবাজার",
          upazilas: ["কক্সবাজার সদর", "চকরিয়া", "টেকনাফ", "রামু", "উখিয়া"]
        }
      }
    },
    sylhet: {
      name: "সিলেট",
      districts: {
        sylhet: {
          name: "সিলেট",
          upazilas: ["সিলেট সদর", "বিয়ানীবাজার", "গোলাপগঞ্জ", "জৈন্তাপুর", "কানাইঘাট"]
        }
      }
    },
    rajshahi: {
      name: "রাজশাহী",
      districts: {
        rajshahi: {
          name: "রাজশাহী",
          upazilas: ["রাজশাহী সদর", "গোদাগাড়ী", "দুর্গাপুর", "মোহনপুর", "পবা"]
        }
      }
    }
  }
};

export const categories = [
  {
    id: "submit-info",
    name: "আমি তথ্য দিতে চাই",
    nameEn: "I Want to Submit Info",
    icon: "📝",
    color: "bg-green-100 text-green-700",
    subcategories: [
      { id: "emergency-report", name: "জরুরি সংবাদ", nameEn: "Emergency Report" },
      { id: "service-info", name: "সেবা তথ্য", nameEn: "Service Information" },
      { id: "market-update", name: "বাজার আপডেট", nameEn: "Market Update" },
      { id: "community-news", name: "কমিউনিটি খবর", nameEn: "Community News" }
    ]
  },
  {
    id: "happening-now",
    name: "ঘটছে এখন",
    nameEn: "Happening Now",
    icon: "🔴",
    color: "bg-red-100 text-red-700",
    subcategories: [
      { id: "live-events", name: "লাইভ ইভেন্ট", nameEn: "Live Events" },
      { id: "traffic-update", name: "ট্রাফিক আপডেট", nameEn: "Traffic Update" },
      { id: "breaking-news", name: "ব্রেকিং নিউজ", nameEn: "Breaking News" },
      { id: "current-situation", name: "বর্তমান পরিস্থিতি", nameEn: "Current Situation" }
    ]
  },
  {
    id: "alert-info",
    name: "এলার্ট তথ্য",
    nameEn: "Alert Information",
    icon: "⚠️",
    color: "bg-yellow-100 text-yellow-700",
    subcategories: [
      { id: "power-outage", name: "বিদ্যুৎ বিভ্রাট", nameEn: "Power Outage" },
      { id: "water-shortage", name: "পানি সংকট", nameEn: "Water Shortage" },
      { id: "road-closure", name: "রাস্তা বন্ধ", nameEn: "Road Closure" },
      { id: "health-alert", name: "স্বাস্থ্য সতর্কতা", nameEn: "Health Alert" }
    ]
  },
  {
    id: "weather-info",
    name: "বাতাস ও আবহাওয়া",
    nameEn: "Wind & Weather",
    icon: "🌤️",
    color: "bg-blue-100 text-blue-700",
    subcategories: [
      { id: "weather-forecast", name: "আবহাওয়া পূর্বাভাস", nameEn: "Weather Forecast" },
      { id: "storm-warning", name: "ঝড়ের সতর্কতা", nameEn: "Storm Warning" },
      { id: "rain-update", name: "বৃষ্টির আপডেট", nameEn: "Rain Update" },
      { id: "temperature", name: "তাপমাত্রা", nameEn: "Temperature" }
    ]
  },
  {
    id: "local-services",
    name: "স্থানীয় সেবা",
    nameEn: "Local Services",
    icon: "🏥",
    color: "bg-purple-100 text-purple-700",
    subcategories: [
      { id: "doctor", name: "ডাক্তার", nameEn: "Doctor" },
      { id: "electrician", name: "ইলেকট্রিশিয়ান", nameEn: "Electrician" },
      { id: "mechanic", name: "মিস্ত্রি", nameEn: "Mechanic" },
      { id: "car-service", name: "গাড়ি সার্ভিস", nameEn: "Car Service" },
      { id: "legal-help", name: "আইন সহায়তা", nameEn: "Legal Help" },
      { id: "pharmacy", name: "ওষুধ দোকান", nameEn: "Pharmacy" }
    ]
  },
  {
    id: "tuition-jobs",
    name: "টিউশন / চাকরি",
    nameEn: "Tuition / Jobs",
    icon: "💼",
    color: "bg-indigo-100 text-indigo-700",
    subcategories: [
      { id: "tuition-needed", name: "টিউশন চাই", nameEn: "Tuition Needed" },
      { id: "tuition-available", name: "টিউশন দিচ্ছি", nameEn: "Tuition Available" },
      { id: "job-vacancy", name: "চাকরি আছে", nameEn: "Job Vacancy" },
      { id: "job-wanted", name: "চাকরি চাই", nameEn: "Job Wanted" }
    ]
  },
  {
    id: "agriculture-business",
    name: "কৃষি / শিক্ষা / ব্যবসা",
    nameEn: "Agriculture / Education / Business",
    icon: "🌾",
    color: "bg-green-100 text-green-700",
    subcategories: [
      { id: "farming-tips", name: "কৃষি পরামর্শ", nameEn: "Farming Tips" },
      { id: "crop-prices", name: "ফসলের দাম", nameEn: "Crop Prices" },
      { id: "education-news", name: "শিক্ষা সংবাদ", nameEn: "Education News" },
      { id: "business-info", name: "ব্যবসা তথ্য", nameEn: "Business Information" },
      { id: "loan-info", name: "ঋণ তথ্য", nameEn: "Loan Information" }
    ]
  }
];