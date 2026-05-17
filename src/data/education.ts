/** Educational articles for maternal cardiovascular health */

export type Trimester = "First" | "Second" | "Third" | "Postpartum" | "All";

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  trimester: Trimester[];
  category: string;
  severity: "info" | "caution" | "urgent";
  didYouKnow?: string;
}

export const articles: Article[] = [
  {
    id: "hbp-pregnancy",
    title: "High Blood Pressure During Pregnancy",
    summary: "Understanding gestational hypertension and when to speak up.",
    category: "Blood Pressure",
    trimester: ["Second", "Third"],
    severity: "caution",
    didYouKnow:
      "Gestational hypertension affects up to 10% of pregnancies in the U.S. Early monitoring saves lives.",
    content:
      "Blood pressure above 140/90 during pregnancy requires medical attention. Symptoms like headache, vision changes, or upper abdominal pain may seem unrelated to your heart—but they can signal serious cardiovascular stress. Advocate for home monitoring and never dismiss persistent symptoms as 'just pregnancy.'",
  },
  {
    id: "preeclampsia",
    title: "Preeclampsia: Warning Signs",
    summary: "Recognize symptoms that need immediate evaluation.",
    category: "Complications",
    trimester: ["Second", "Third"],
    severity: "urgent",
    didYouKnow:
      "Preeclampsia can develop after 20 weeks and also postpartum—up to 6 weeks after delivery.",
    content:
      "Preeclampsia involves high blood pressure plus organ stress. Watch for sudden swelling, severe headache, vision spots, shortness of breath, or pain under the ribs. These are NOT normal pregnancy discomforts. Say clearly: 'I'm concerned about preeclampsia' and request blood pressure and urine protein testing.",
  },
  {
    id: "heart-warning",
    title: "Heart Disease Warning Signs",
    summary: "Symptoms women often overlook or attribute to other causes.",
    category: "Heart Health",
    trimester: ["All"],
    severity: "urgent",
    didYouKnow:
      "Women's heart attack symptoms often differ from men's—fatigue and nausea are common instead of crushing chest pain.",
    content:
      "Unusual fatigue, shortness of breath, jaw or back pain, nausea, and anxiety can signal heart problems during or after pregnancy. Peripartum cardiomyopathy affects the heart muscle around delivery. If symptoms worsen with activity or lying flat, seek emergency care.",
  },
  {
    id: "postpartum-recovery",
    title: "Postpartum Cardiovascular Recovery",
    summary: "Your heart works hard after delivery—here's what to watch.",
    category: "Recovery",
    trimester: ["Postpartum"],
    severity: "caution",
    content:
      "Blood volume changes rapidly after birth. Monitor blood pressure for 6+ weeks. Leg swelling, racing heart, cough, or inability to lie flat warrant urgent evaluation. Postpartum follow-up should include cardiovascular screening, especially after hypertensive pregnancy.",
  },
  {
    id: "nutrition",
    title: "Heart-Healthy Nutrition for Moms",
    summary: "Fuel your body and protect your cardiovascular system.",
    category: "Lifestyle",
    trimester: ["All"],
    severity: "info",
    didYouKnow:
      "DASH-style eating patterns can lower blood pressure as effectively as some medications.",
    content:
      "Focus on vegetables, whole grains, lean protein, and limited sodium. Stay hydrated. Small frequent meals help nausea while stabilizing energy. Discuss supplements with your provider—folate matters, but so does overall cardiovascular nutrition.",
  },
  {
    id: "exercise",
    title: "Safe Exercise During & After Pregnancy",
    summary: "Movement that supports heart health without overexertion.",
    category: "Lifestyle",
    trimester: ["All"],
    severity: "info",
    content:
      "Most pregnant people benefit from moderate activity like walking or prenatal yoga. Stop if you experience chest pain, dizziness, vaginal bleeding, or contractions. Postpartum, gradually increase activity as cleared by your provider.",
  },
  {
    id: "stress",
    title: "Stress Management & Heart Health",
    summary: "Chronic stress affects blood pressure and recovery.",
    category: "Mental Health",
    trimester: ["All"],
    severity: "info",
    content:
      "Stress hormones elevate blood pressure. Breathing exercises, support groups, therapy, and sleep hygiene protect your heart. You deserve emotional support—it's medical care, not a luxury.",
  },
  {
    id: "emergency",
    title: "Emergency Symptoms — Call 911",
    summary: "When every minute counts for maternal heart health.",
    category: "Emergency",
    trimester: ["All"],
    severity: "urgent",
    content:
      "Call 911 immediately for: chest pain or pressure, severe shortness of breath, fainting, seizure, stroke symptoms (face droop, arm weakness, speech difficulty), uncontrolled bleeding, or thoughts of harming yourself. Trust your instincts—if something feels wrong, seek help.",
  },
];
