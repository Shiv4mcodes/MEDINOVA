export const DEFAULT_REMINDERS = [];

export const DEFAULT_HISTORY_LOGS = [
  { day: "Mon", adherence: 0, mood: 3 },
  { day: "Tue", adherence: 0, mood: 3 },
  { day: "Wed", adherence: 0, mood: 3 },
  { day: "Thu", adherence: 0, mood: 3 },
  { day: "Fri", adherence: 0, mood: 3 },
  { day: "Sat", adherence: 0, mood: 3 },
  { day: "Sun", adherence: 0, mood: 3 }
];

export const DEFAULT_PRESCRIPTIONS = [];

export const DRUG_SAFETY_DB = {
  paracetamol: {
    name: "Paracetamol / Acetaminophen",
    usage: "Fever relief & mild to moderate pain management.",
    sideEffects: "Rare when taken correctly. Overdose can cause severe liver damage.",
    warning: "Avoid taking other products containing paracetamol. Limit to 4000mg/day. Take after food.",
    color: "healthTeal"
  },
  dolo: {
    name: "Dolo 650",
    usage: "Fever reducer & analgesic for pain relief.",
    sideEffects: "Mild nausea, sweating, or skin rash in rare cases.",
    warning: "Do not double dose. Extremely crucial to take after food to protect stomach lining.",
    color: "warmOrange"
  },
  azithromycin: {
    name: "Azithromycin (Antibiotic)",
    usage: "Bacterial infections including respiratory and skin infections.",
    sideEffects: "Diarrhea, nausea, abdominal pain, vomiting.",
    warning: "Complete the full prescribed course even if symptoms disappear. Best taken 1 hr before or 2 hrs after meals.",
    color: "purple"
  },
  vitamin: {
    name: "Vitamin C (Ascorbic Acid)",
    usage: "Immune support, antioxidant, and tissue repair booster.",
    sideEffects: "High doses (>2000mg) may cause digestive upset or kidney stones.",
    warning: "Drink plenty of water. Best taken with meals to improve absorption.",
    color: "healthTeal"
  },
  atorvastatin: {
    name: "Atorvastatin (Lipitor)",
    usage: "Cholesterol reduction and prevention of cardiovascular events.",
    sideEffects: "Muscle aches, mild joint pain, digestive upset.",
    warning: "Avoid eating grapefruit or drinking grapefruit juice as it increases active drug levels in blood.",
    color: "purple"
  },
  eno: {
    name: "Eno Antacid powder",
    usage: "Quick relief from acidity, heartburn, and gas bloating.",
    sideEffects: "Mild stomach cramps, increased sodium intake.",
    warning: "Do not use for more than 14 consecutive days. Take dissolved in water immediately after symptoms start.",
    color: "warmOrange"
  },
  aspirin: {
    name: "Aspirin (Acetylsalicylic Acid)",
    usage: "Pain relief, inflammation reduction, and blood thinner.",
    sideEffects: "Indigestion, increased bleeding risk, stomach ulcers.",
    warning: "Take strictly after food. Avoid if you have asthma or bleeding disorders.",
    color: "warmOrange"
  },
  ibuprofen: {
    name: "Ibuprofen (Advil/Motrin)",
    usage: "Anti-inflammatory pain reliever for muscles, joints, and toothaches.",
    sideEffects: "Heartburn, dizziness, gastric irritation.",
    warning: "Never take on an empty stomach. Take with milk or food to protect stomach.",
    color: "warmOrange"
  }
};
