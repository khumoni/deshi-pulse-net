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
    id: "emergency-info",
    name: "জরুরি তথ্য",
    nameEn: "Emergency Info",
    icon: "📢",
    subcategories: [
      { id: "urgent-news", name: "আজকের জরুরি খবর", nameEn: "Today's Urgent News" },
      { id: "electricity-notice", name: "বিদ্যুৎ সংক্রান্ত নোটিশ", nameEn: "Electricity Notices" },
      { id: "weather-alert", name: "আবহাওয়ার সতর্কবার্তা", nameEn: "Weather Alert" },
      { id: "road-traffic", name: "রাস্তা/জ্যাম তথ্য", nameEn: "Road/Traffic Info" },
      { id: "health-alert", name: "স্বাস্থ্য সতর্কতা", nameEn: "Health Alert" },
      { id: "local-news", name: "স্থানীয় সংবাদ", nameEn: "Local News" },
      { id: "govt-notice", name: "সরকারি বিজ্ঞপ্তি", nameEn: "Government Notice" }
    ]
  },
  {
    id: "shops-market",
    name: "দোকান ও বাজার",
    nameEn: "Shops & Markets",
    icon: "🛍️",
    subcategories: [
      { id: "nearby-shops", name: "নিকটস্থ দোকান", nameEn: "Nearby Shops" },
      { id: "electronics-hardware", name: "ইলেকট্রনিক / হার্ডওয়্যার", nameEn: "Electronics/Hardware" },
      { id: "clothing", name: "জামা-কাপড়", nameEn: "Clothing" },
      { id: "pharmacy", name: "ফার্মেসি", nameEn: "Pharmacy" },
      { id: "market-prices", name: "আজকের বাজার দর", nameEn: "Today's Market Prices" },
      { id: "market-days", name: "হাট দিন ও অবস্থান", nameEn: "Market Days & Location" }
    ]
  },
  {
    id: "service-providers",
    name: "সার্ভিস প্রোভাইডার",
    nameEn: "Service Providers",
    icon: "🧰",
    subcategories: [
      { id: "electrician", name: "ইলেকট্রিশিয়ান", nameEn: "Electrician" },
      { id: "mechanic", name: "মিস্ত্রি", nameEn: "Mechanic" },
      { id: "housekeeping", name: "হাউজকিপিং", nameEn: "Housekeeping" },
      { id: "rickshaw-van", name: "রিকশা/ভ্যান", nameEn: "Rickshaw/Van" },
      { id: "car-rental", name: "গাড়ি ভাড়া", nameEn: "Car Rental" },
      { id: "painter", name: "রংমিস্ত্রি", nameEn: "Painter" }
    ]
  },
  {
    id: "essential-services",
    name: "প্রয়োজনীয় সেবা",
    nameEn: "Essential Services",
    icon: "👨‍⚕️",
    subcategories: [
      { id: "nearby-hospital", name: "নিকটস্থ হাসপাতাল", nameEn: "Nearby Hospital" },
      { id: "ambulance", name: "অ্যাম্বুলেন্স", nameEn: "Ambulance" },
      { id: "police-station", name: "থানা", nameEn: "Police Station" },
      { id: "union-office", name: "ইউনিয়ন অফিস", nameEn: "Union Office" },
      { id: "women-helpline", name: "নারী সহায়তা হেল্পলাইন", nameEn: "Women Support Helpline" },
      { id: "emergency-hotline", name: "জরুরি হটলাইন", nameEn: "Emergency Hotline" }
    ]
  },
  {
    id: "community-info",
    name: "কমিউনিটি তথ্য",
    nameEn: "Community Info",
    icon: "🗣️",
    subcategories: [
      { id: "submit-info", name: "আমি তথ্য দিতে চাই", nameEn: "I Want to Submit Info" },
      { id: "under-review", name: "যাচাই চলছে", nameEn: "Under Review" },
      { id: "approved-info", name: "এপ্রুভড তথ্য", nameEn: "Approved Info" },
      { id: "rejected-info", name: "বাতিল তথ্য", nameEn: "Rejected Info" },
      { id: "volunteers", name: "স্থানীয় স্বেচ্ছাসেবক", nameEn: "Local Volunteers" },
      { id: "tuition", name: "টিউশন চাই / দিচ্ছি", nameEn: "Tuition Needed/Available" },
      { id: "women-products", name: "মহিলা প্রডাক্ট/গ্রুপ", nameEn: "Women Products/Groups" }
    ]
  }
];