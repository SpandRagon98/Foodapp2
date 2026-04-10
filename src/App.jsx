import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  Languages,
  Volume2,
  Sparkles,
  ScanLine,
  MapPin,
  ChefHat,
  QrCode,
  Store,
  Globe,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Wheat,
  Fish,
  Milk,
  Drumstick,
  Egg,
  Leaf,
  Flame,
  Mic,
  LayoutDashboard,
  Smartphone,
  WifiOff,
  Wand2,
  Search,
  Clock3,
  ChevronRight,
} from "lucide-react";

const supportedLanguages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
];

const travelerPhrases = [
  { id: 1, en: "Is this spicy?", local: "क्या यह मसालेदार है?" },
  { id: 2, en: "Does this contain egg?", local: "क्या इसमें अंडा है?" },
  { id: 3, en: "Does this contain nuts?", local: "क्या इसमें मेवे हैं?" },
  { id: 4, en: "Can you make it less spicy?", local: "क्या इसे कम मसालेदार बना सकते हैं?" },
  { id: 5, en: "Is this vegetarian?", local: "क्या यह शाकाहारी है?" },
  { id: 6, en: "What do you recommend for first-time visitors?", local: "पहली बार आने वालों के लिए आप क्या सुझाएंगे?" },
];

const sampleMenuData = [
  {
    id: 1,
    originalName: "মশলা দোসা",
    romanizedOriginal: "Moshla Dosa",
    translated: {
      en: "Masala Dosa",
      hi: "मसाला डोसा",
      bn: "মসলা দোসা",
      ta: "மசாலா தோசை",
    },
    pronunciation: "muh-saa-laa doh-saa",
    category: "Breakfast / South Indian",
    region: "Tamil Nadu / Karnataka",
    description:
      "A crisp fermented rice-and-lentil crepe filled with spiced potato masala, usually served with sambar and coconut chutney.",
    ingredients: ["rice batter", "lentils", "potato", "onion", "mustard seeds", "curry leaves"],
    diet: "veg",
    spiceLevel: 2,
    allergens: ["dairy (possible)"] ,
    tags: ["savory", "light", "crispy", "popular"],
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80",
    explanation:
      "Great for travelers who want something familiar-looking but distinctly South Indian. Mild to medium spice, filling without feeling too heavy.",
  },
  {
    id: 2,
    originalName: "लिट्टी चोखा",
    romanizedOriginal: "Litti Chokha",
    translated: {
      en: "Litti Chokha",
      hi: "लिट्टी चोखा",
      bn: "লিট্টি চোখা",
      ta: "லிட்டி சோக்கா",
    },
    pronunciation: "lit-tee cho-khaa",
    category: "Main Course / Bihari",
    region: "Bihar",
    description:
      "Roasted wheat dumplings stuffed with spiced gram flour, served with smoky mashed eggplant, tomato, and potato.",
    ingredients: ["wheat", "sattu", "eggplant", "tomato", "potato", "mustard oil"],
    diet: "veg",
    spiceLevel: 3,
    allergens: ["gluten"],
    tags: ["earthy", "smoky", "traditional", "hearty"],
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80",
    explanation:
      "A deeply regional dish with a rustic flavor. Best described as stuffed baked dumplings with a smoky mashed vegetable side.",
  },
  {
    id: 3,
    originalName: "চিংড়ি মালাইকারি",
    romanizedOriginal: "Chingri Malaikari",
    translated: {
      en: "Prawn Malai Curry",
      hi: "प्रॉन मलाई करी",
      bn: "চিংড়ি মালাইকারি",
      ta: "பிரான் மலாய் கறி",
    },
    pronunciation: "prawn muh-lie curry",
    category: "Seafood / Bengali",
    region: "West Bengal",
    description:
      "Large prawns cooked in a silky coconut milk gravy with warm spices, lightly sweet and aromatic rather than fiery.",
    ingredients: ["prawns", "coconut milk", "onion", "ginger", "garam masala"],
    diet: "seafood",
    spiceLevel: 2,
    allergens: ["shellfish", "dairy (possible)"],
    tags: ["creamy", "rich", "aromatic", "coastal"],
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1b3d54b3?auto=format&fit=crop&w=1200&q=80",
    explanation:
      "Ideal for travelers who enjoy seafood but want something gentle and elegant rather than very spicy.",
  },
  {
    id: 4,
    originalName: "ઉંધિયું",
    romanizedOriginal: "Undhiyu",
    translated: {
      en: "Undhiyu",
      hi: "उंधियू",
      bn: "উন্ধিয়ু",
      ta: "உந்தியு",
    },
    pronunciation: "oon-dhee-yoo",
    category: "Main Course / Gujarati",
    region: "Gujarat",
    description:
      "A slow-cooked mixed vegetable specialty with beans, yam, potatoes, and fenugreek dumplings in a sweet-savory spiced masala.",
    ingredients: ["beans", "yam", "potato", "fenugreek", "coconut", "spice mix"],
    diet: "veg",
    spiceLevel: 2,
    allergens: ["nuts (possible)"] ,
    tags: ["seasonal", "comforting", "sweet-savory", "vegetable-forward"],
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
    explanation:
      "A complex regional dish with many textures. Good for curious eaters who want to try something celebratory and distinctly Gujarati.",
  },
  {
    id: 5,
    originalName: "അപ്പം സ്റ്റ്യൂ",
    romanizedOriginal: "Appam Stew",
    translated: {
      en: "Appam with Stew",
      hi: "अप्पम विद स्ट्यू",
      bn: "আপ্পম স্ট্যু",
      ta: "அப்பம் ஸ்ட்யூ",
    },
    pronunciation: "up-pum with styoo",
    category: "Breakfast / Kerala",
    region: "Kerala",
    description:
      "Soft lacy rice pancakes paired with a mild coconut-based vegetable or meat stew, fragrant with pepper and curry leaves.",
    ingredients: ["rice", "coconut milk", "vegetables or chicken", "pepper", "curry leaves"],
    diet: "egg",
    spiceLevel: 1,
    allergens: ["dairy (possible)", "egg (possible in appam batter)"] ,
    tags: ["mild", "soft", "comforting", "breakfast"],
    image:
      "https://images.unsplash.com/photo-1630409351217-bc4fa6422075?auto=format&fit=crop&w=1200&q=80",
    explanation:
      "Very traveler-friendly: soft texture, low spice, and familiar stew format. One of the safest introductions to Kerala cuisine.",
  },
  {
    id: 6,
    originalName: "मिसळ पाव",
    romanizedOriginal: "Misal Pav",
    translated: {
      en: "Misal Pav",
      hi: "मिसळ पाव",
      bn: "মিসল পাও",
      ta: "மிசல் பாவ்",
    },
    pronunciation: "mee-sul paav",
    category: "Street Food / Maharashtrian",
    region: "Maharashtra",
    description:
      "A spicy sprouted bean curry topped with crunchy farsan and served with bread rolls. Bold, layered, and intensely flavorful.",
    ingredients: ["sprouted beans", "onion", "tomato", "farsan", "bread roll"],
    diet: "veg",
    spiceLevel: 4,
    allergens: ["gluten", "nuts (possible)"] ,
    tags: ["spicy", "street-food", "crunchy", "bold"],
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
    explanation:
      "Famous and delicious, but often quite spicy. Great for adventurous eaters; less ideal for travelers avoiding heat.",
  },
];

const mockOCRExtract = [
  "মশলা দোসা",
  "চিংড়ি মালাইকারি",
  "মিসল পাভ",
  "અંધિયું",
  "അപ്പം സ്റ്റ്യൂ",
];

const sectionClass =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

function Badge({ children, icon: Icon, tone = "default" }) {
  const tones = {
    default: "bg-white/10 text-white/90 border-white/10",
    soft: "bg-white text-slate-900 border-white/70",
    green: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
    amber: "bg-amber-500/15 text-amber-200 border-amber-400/20",
    rose: "bg-rose-500/15 text-rose-200 border-rose-400/20",
    blue: "bg-sky-500/15 text-sky-200 border-sky-400/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} mb-8`}>
      {eyebrow ? (
        <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function ModeToggle({ mode, setMode }) {
  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
      {[
        { key: "traveler", label: "Traveler Mode", icon: Globe },
        { key: "restaurant", label: "Restaurant Mode", icon: Store },
      ].map(({ key, label, icon: Icon }) => {
        const active = mode === key;
        return (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              active
                ? "bg-white text-slate-900 shadow-lg"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function StatCard({ value, label, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-3 inline-flex rounded-2xl bg-white/10 p-3 text-sky-200">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-300">{label}</div>
    </div>
  );
}

function UploadScanner({ targetLanguage, setTargetLanguage, onRunDemo, mode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {mode === "traveler" ? "Scan a regional menu" : "Upload a menu for digitization"}
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Mock OCR + AI flow for demo. Plug in real OCR, translation, TTS, and backend later.
            </p>
          </div>
          <Badge icon={WifiOff} tone="blue">Offline-ready UI concept</Badge>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <button className="group rounded-3xl border border-dashed border-white/15 bg-gradient-to-br from-sky-500/15 to-cyan-400/10 p-6 text-left transition hover:border-sky-300/30 hover:bg-sky-500/15">
            <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-sky-200">
              <Upload className="h-5 w-5" />
            </div>
            <div className="text-lg font-medium text-white">Upload Menu Image</div>
            <div className="mt-2 text-sm leading-6 text-slate-300">
              Drag menu photos, paper scans, or screenshots. Ideal for travelers browsing printed menus.
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-200">
              Choose file <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </button>

          <button className="group rounded-3xl border border-dashed border-white/15 bg-gradient-to-br from-emerald-500/15 to-teal-400/10 p-6 text-left transition hover:border-emerald-300/30 hover:bg-emerald-500/15">
            <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-emerald-200">
              <Camera className="h-5 w-5" />
            </div>
            <div className="text-lg font-medium text-white">Open Camera Scanner</div>
            <div className="mt-2 text-sm leading-6 text-slate-300">
              Point camera at a physical menu. Auto-detect regional script and structure items into dish cards.
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-200">
              Start scan <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Translate into</span>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-sky-400"
            >
              {supportedLanguages.map((lang) => (
                <option className="bg-slate-950" key={lang.code} value={lang.code}>
                  {lang.label} · {lang.native}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={onRunDemo}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
          >
            <Sparkles className="h-4 w-4" />
            Run Demo Scan
          </button>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-2xl sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3 text-violet-200">
            <ScanLine className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">What the AI understands</h3>
            <p className="text-sm text-slate-300">Beyond literal translation</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[
            "Script detection: Bengali / Gujarati / Malayalam / Hindi mixed menu",
            "OCR cleanup: item grouping, section recovery, typo correction",
            "Food interpretation: ingredients, texture, spice, dietary fit",
            "Traveler assist: quick phrases and pronunciation support",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/10 p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-300" />
              <span className="text-sm leading-6 text-slate-200">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">
            Placeholder integration points
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-200">
            OCR: Google Vision / Tesseract · Translation: OpenAI / Azure / Google Translate · TTS: Web Speech / ElevenLabs · Backend: Node / Supabase / Firebase
          </div>
        </div>
      </div>
    </div>
  );
}

function SpiceDots({ value }) {
  return (
    <div className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-2.5 w-2.5 rounded-full ${n <= value ? "bg-orange-400" : "bg-white/10"}`}
        />
      ))}
    </div>
  );
}

function DietBadge({ diet }) {
  const config = {
    veg: { label: "Veg", icon: Leaf, tone: "green" },
    "non-veg": { label: "Non-Veg", icon: Drumstick, tone: "rose" },
    egg: { label: "Egg / Flexible", icon: Egg, tone: "amber" },
    seafood: { label: "Seafood", icon: Fish, tone: "blue" },
  };
  const item = config[diet] || config["non-veg"];
  return <Badge icon={item.icon} tone={item.tone}>{item.label}</Badge>;
}

function AllergenIcon({ name }) {
  if (name.includes("dairy")) return <Milk className="h-3.5 w-3.5" />;
  if (name.includes("nuts")) return <AlertTriangle className="h-3.5 w-3.5" />;
  if (name.includes("shellfish") || name.includes("seafood")) return <Fish className="h-3.5 w-3.5" />;
  if (name.includes("gluten")) return <Wheat className="h-3.5 w-3.5" />;
  if (name.includes("egg")) return <Egg className="h-3.5 w-3.5" />;
  return <AlertTriangle className="h-3.5 w-3.5" />;
}

function DishCard({ dish, targetLanguage }) {
  const translatedName = dish.translated[targetLanguage] || dish.translated.en;

  const playPronunciation = () => {
    // Placeholder for future TTS integration.
    // Example: call Web Speech API or a backend TTS service.
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translatedName);
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={dish.image}
          alt={translatedName}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <DietBadge diet={dish.diet} />
          <Badge icon={Flame} tone="amber">Spice {dish.spiceLevel}/5</Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-sky-200">
            <MapPin className="h-3.5 w-3.5" />
            {dish.region}
          </div>
          <div className="text-xl font-semibold text-white">{translatedName}</div>
          <div className="mt-1 text-sm text-slate-200">{dish.originalName}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-sm text-slate-300">Pronunciation</div>
            <div className="mt-1 text-sm font-medium text-white">{dish.pronunciation}</div>
          </div>
          <button
            onClick={playPronunciation}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
          >
            <Volume2 className="h-4 w-4" />
            Listen
          </button>
        </div>

        <div className="mt-4 text-sm leading-6 text-slate-200">{dish.description}</div>

        <div className="mt-4 rounded-2xl border border-sky-400/15 bg-sky-500/10 p-4 text-sm leading-6 text-slate-100">
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">
            AI food explainer
          </div>
          {dish.explanation}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-sm font-medium text-white">Main ingredients</div>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm font-medium text-white">Allergens / cautions</div>
            <div className="flex flex-wrap gap-2">
              {dish.allergens.map((item) => (
                <Badge key={item} icon={() => <AllergenIcon name={item} />}>{item}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {dish.tags.map((tag) => (
            <Badge key={tag} tone="soft">{tag}</Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
          <div>
            <div className="text-sm font-medium text-white">Spice comfort guide</div>
            <div className="mt-1 flex items-center gap-3 text-xs text-slate-300">
              <SpiceDots value={dish.spiceLevel} />
              {dish.spiceLevel <= 2 ? "Usually friendly for most travelers" : dish.spiceLevel <= 3 ? "Moderate spice" : "Potentially hot"}
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400" />
        </div>
      </div>
    </motion.div>
  );
}

function ResultsPanel({ results, targetLanguage, hasScanned }) {
  return (
    <div className="mt-16">
      <SectionTitle
        eyebrow="Results"
        title="Translated menu, explained like a local food guide"
        subtitle="Instead of flat text translation, each dish gets meaning, texture, ingredients, dietary cues, and ordering confidence."
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3 text-sky-200">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">OCR extraction preview</div>
              <div className="text-sm text-slate-300">Detected raw text from menu image</div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {(hasScanned ? mockOCRExtract : mockOCRExtract.slice(0, 3)).map((line, idx) => (
              <div key={`${line}-${idx}`} className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 font-medium text-slate-100">
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-5 backdrop-blur-xl">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard value={`${results.length}`} label="Items interpreted" icon={ChefHat} />
            <StatCard value="9" label="Indian scripts supported" icon={Languages} />
            <StatCard value="< 5 sec" label="Mock AI processing time" icon={Clock3} />
          </div>
        </div>
      </div>

      <motion.div layout className="grid gap-6 xl:grid-cols-2">
        <AnimatePresence>
          {results.map((dish) => (
            <DishCard key={dish.id} dish={dish} targetLanguage={targetLanguage} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function TravelerHelper() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3 text-emerald-200">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Traveler phrase helper</h3>
            <p className="mt-1 text-sm text-slate-300">
              Tap once to show, speak, or translate common restaurant questions.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {travelerPhrases.map((phrase) => (
            <button
              key={phrase.id}
              className="flex w-full items-start justify-between gap-4 rounded-2xl border border-white/8 bg-black/10 px-4 py-4 text-left transition hover:border-sky-300/20 hover:bg-white/5"
            >
              <div>
                <div className="font-medium text-white">{phrase.en}</div>
                <div className="mt-1 text-sm text-slate-300">{phrase.local}</div>
              </div>
              <Volume2 className="mt-1 h-4 w-4 flex-none text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-white">Why this feels different</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Context, not just translation",
              copy: "Explains whether a dish is like a stew, pancake, stuffed bread, snack, or curry so travelers can decide faster.",
              icon: Wand2,
            },
            {
              title: "Built for dietary confidence",
              copy: "Flags egg, dairy, shellfish, meat, nuts, and likely gluten so users avoid surprises.",
              icon: AlertTriangle,
            },
            {
              title: "Pronunciation support",
              copy: "Helps travelers say dish names more comfortably while ordering.",
              icon: Volume2,
            },
            {
              title: "Business-ready expansion",
              copy: "Restaurants can generate multilingual QR menus and reduce ordering friction for tourists.",
              icon: QrCode,
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 inline-flex rounded-2xl bg-white/10 p-3 text-emerald-200">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-base font-semibold text-white">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-300">{item.copy}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LanguageSupport() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
      <SectionTitle
        eyebrow="Language coverage"
        title="Designed for real regional menus across India"
        subtitle="The product is meant to work across diverse scripts, mixed-language menus, and traveler-first explanations."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {supportedLanguages.map((lang) => (
          <div
            key={lang.code}
            className="rounded-3xl border border-white/10 bg-black/10 px-4 py-5 transition hover:border-sky-300/20 hover:bg-white/5"
          >
            <div className="text-sm text-slate-400">{lang.label}</div>
            <div className="mt-1 text-xl font-semibold text-white">{lang.native}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BusinessSection({ mode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-6 backdrop-blur-xl sm:p-7">
        <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-fuchsia-200">
          <QrCode className="h-5 w-5" />
        </div>
        <h3 className="text-2xl font-semibold text-white">Restaurant QR menu support</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Restaurants upload a menu once, then instantly generate a multilingual digital menu with dish explanations, dietary flags, and traveler phrase support.
        </p>
        <div className="mt-6 grid gap-3">
          {[
            "Upload regional menu as image, PDF, or spreadsheet",
            "Auto-detect language and create structured dish records",
            "Generate multilingual QR dining pages for tourists",
            "Add restaurant notes, spice customizations, and chef recommendations",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/10 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
              <span className="text-sm leading-6 text-slate-200">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-slate-400">Future dashboard preview</div>
            <div className="text-2xl font-semibold text-white">Restaurant intelligence layer</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 text-sky-200">
            <LayoutDashboard className="h-5 w-5" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Menus digitized", value: "1,248" },
            { label: "Languages live", value: "9" },
            { label: "Traveler scans", value: "18.4k" },
            { label: "Top viewed dish", value: "Masala Dosa" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/8 bg-black/10 p-4">
              <div className="text-sm text-slate-400">{item.label}</div>
              <div className="mt-2 text-xl font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-3xl border border-sky-400/20 bg-sky-500/10 p-4">
          <div className="mb-2 text-sm font-semibold text-white">Suggested roadmap</div>
          <div className="flex flex-wrap gap-2">
            {[
              "Menu CMS",
              "Restaurant onboarding",
              "Analytics",
              "Review insights",
              "Dynamic pricing notes",
              "Local recommendation engine",
            ].map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-5 text-sm leading-6 text-slate-300">
          Current mode: <span className="font-semibold text-white">{mode === "traveler" ? "Traveler Mode" : "Restaurant Mode"}</span>. The UI adapts the hero, upload copy, and CTA emphasis accordingly.
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("traveler");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [hasScanned, setHasScanned] = useState(false);
  const [query, setQuery] = useState("");

  const filteredResults = useMemo(() => {
    const base = hasScanned ? sampleMenuData : sampleMenuData.slice(0, 4);
    if (!query.trim()) return base;
    return base.filter((dish) => {
      const translated = dish.translated[targetLanguage] || dish.translated.en;
      const haystack = [
        dish.originalName,
        dish.romanizedOriginal,
        translated,
        dish.region,
        dish.category,
        ...dish.ingredients,
        ...dish.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [hasScanned, query, targetLanguage]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/8 bg-slate-950/70 backdrop-blur-xl">
        <div className={`${sectionClass} flex items-center justify-between gap-4 py-4`}>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-2.5 text-sky-200">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[0.2em] text-sky-200 uppercase">MenuMitra AI</div>
              <div className="text-xs text-slate-400">Menu interpreter for travelers</div>
            </div>
          </div>
          <ModeToggle mode={mode} setMode={setMode} />
        </div>
      </header>

      <main>
        <section className="relative py-14 sm:py-20">
          <div className={sectionClass}>
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge icon={Sparkles} tone="blue">AI-powered menu interpreter</Badge>
                  <Badge icon={Smartphone} tone="green">Mobile-first travel UX</Badge>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                  Understand regional menus like a local,
                  <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent"> order with confidence like a traveler.</span>
                </motion.h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Scan a printed menu, detect the script automatically, translate dish names into your preferred language, and get cultural food explanations that help you actually decide what to eat.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setHasScanned(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
                  >
                    <ScanLine className="h-4 w-4" />
                    {mode === "traveler" ? "Try traveler demo" : "Try restaurant demo"}
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    <QrCode className="h-4 w-4" />
                    View QR menu concept
                  </button>
                </div>

                <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
                  <StatCard value="9+" label="Regional languages" icon={Languages} />
                  <StatCard value="AI + OCR" label="Interpretive engine" icon={Wand2} />
                  <StatCard value="Tourism + B2B" label="Dual-mode product" icon={Store} />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-2xl">
                  <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-300">Live dish preview</div>
                        <div className="text-xl font-semibold text-white">Prawn Malai Curry</div>
                      </div>
                      <Badge icon={Fish} tone="blue">Seafood</Badge>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                      <div className="text-sm text-slate-400">AI explanation</div>
                      <div className="mt-2 text-sm leading-6 text-slate-100">
                        A creamy Bengali prawn curry made with coconut milk. Rich, aromatic, and usually gentler than many spicy Indian seafood dishes.
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge>shellfish</Badge>
                        <Badge>creamy</Badge>
                        <Badge>low-medium spice</Badge>
                        <Badge>good for seafood lovers</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-5 -left-5 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200 backdrop-blur-xl">
                  Auto-detect: Bengali script
                </div>
                <div className="absolute -right-4 top-8 rounded-3xl border border-emerald-300/20 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-100 backdrop-blur-xl">
                  Traveler-safe explanation
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8">
          <div className={sectionClass}>
            <UploadScanner
              targetLanguage={targetLanguage}
              setTargetLanguage={setTargetLanguage}
              onRunDemo={() => setHasScanned(true)}
              mode={mode}
            />
          </div>
        </section>

        <section className="py-10">
          <div className={sectionClass}>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm text-slate-400">Search within interpreted results</div>
                <div className="text-lg font-semibold text-white">Filter by dish, region, or ingredient</div>
              </div>
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dosa, prawn, Gujarat, coconut…"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sky-400"
                />
              </div>
            </div>
            <ResultsPanel results={filteredResults} targetLanguage={targetLanguage} hasScanned={hasScanned} />
          </div>
        </section>

        <section className="py-16">
          <div className={sectionClass}>
            <SectionTitle
              eyebrow="Traveler confidence"
              title="Built for the moment right before you order"
              subtitle="Fast reassurance on spice, dietary restrictions, and how to ask the right follow-up question at the table."
            />
            <TravelerHelper />
          </div>
        </section>

        <section className="py-16">
          <div className={sectionClass}>
            <LanguageSupport />
          </div>
        </section>

        <section className="py-16">
          <div className={sectionClass}>
            <SectionTitle
              eyebrow="B2B expansion"
              title="Not just a traveler app — also a restaurant growth product"
              subtitle="Restaurants, cafés, hotels, and tourism venues can use the same engine to create multilingual digital menus and reduce ordering friction for tourists."
            />
            <BusinessSection mode={mode} />
          </div>
        </section>

        <section className="pb-20 pt-6">
          <div className={sectionClass}>
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-sky-500/10 via-white/5 to-emerald-500/10 p-8 text-center backdrop-blur-2xl">
              <div className="mx-auto max-w-3xl">
                <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                  MVP demo ready
                </div>
                <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                  Menu translation that feels like a food-savvy travel companion.
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  This single-file MVP is intentionally mock-driven so you can demo the product experience now, then wire real OCR, translation, TTS, QR generation, authentication, and restaurant dashboards later.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
                    Launch investor demo
                  </button>
                  <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    Explore restaurant solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
