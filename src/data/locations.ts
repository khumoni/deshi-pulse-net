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
    id: "news",
    name: "সংবাদ",
    nameEn: "News",
    icon: "📰",
    subcategories: [
      { id: "local-news", name: "স্থানীয় সংবাদ", nameEn: "Local News" },
      { id: "politics", name: "রাজনীতি", nameEn: "Politics" },
      { id: "sports", name: "খেলাধুলা", nameEn: "Sports" }
    ]
  },
  {
    id: "electricity",
    name: "বিদ্যুৎ",
    nameEn: "Electricity",
    icon: "⚡",
    subcategories: [
      { id: "power-outage", name: "বিদ্যুৎ বিভ্রাট", nameEn: "Power Outage" },
      { id: "line-problem", name: "লাইনের সমস্যা", nameEn: "Line Problem" },
      { id: "billing", name: "বিল সংক্রান্ত", nameEn: "Billing" }
    ]
  },
  {
    id: "shops",
    name: "দোকানপাট",
    nameEn: "Shops",
    icon: "🛍️",
    subcategories: [
      { id: "grocery", name: "মুদি দোকান", nameEn: "Grocery" },
      { id: "pharmacy", name: "ফার্মেসি", nameEn: "Pharmacy" },
      { id: "electronics", name: "ইলেকট্রনিক্স", nameEn: "Electronics" }
    ]
  },
  {
    id: "services",
    name: "সেবা",
    nameEn: "Services",
    icon: "🛠️",
    subcategories: [
      { id: "repair", name: "মেরামত সেবা", nameEn: "Repair Service" },
      { id: "transport", name: "পরিবহন", nameEn: "Transport" },
      { id: "education", name: "শিক্ষা", nameEn: "Education" }
    ]
  },
  {
    id: "emergency",
    name: "জরুরি",
    nameEn: "Emergency",
    icon: "🚑",
    subcategories: [
      { id: "hospital", name: "হাসপাতাল", nameEn: "Hospital" },
      { id: "police", name: "পুলিশ", nameEn: "Police" },
      { id: "fire-service", name: "ফায়ার সার্ভিস", nameEn: "Fire Service" }
    ]
  },
  {
    id: "market-prices",
    name: "বাজার দর",
    nameEn: "Market Prices",
    icon: "📈",
    subcategories: [
      { id: "vegetables", name: "সবজির দাম", nameEn: "Vegetable Prices" },
      { id: "fish", name: "মাছের দাম", nameEn: "Fish Prices" },
      { id: "rice", name: "চালের দাম", nameEn: "Rice Prices" }
    ]
  },
  {
    id: "jobs",
    name: "চাকরি সেবা",
    nameEn: "Job Services",
    icon: "🧰",
    subcategories: [
      { id: "government", name: "সরকারি চাকরি", nameEn: "Government Jobs" },
      { id: "private", name: "বেসরকারি চাকরি", nameEn: "Private Jobs" },
      { id: "part-time", name: "খণ্ডকালীন কাজ", nameEn: "Part-time Work" }
    ]
  }
];