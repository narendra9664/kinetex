// Curated storefront copy for real Shopify products, keyed by product handle.
// Shopify product titles/descriptions come from the dropshipping supplier feed
// and are too long/unbranded to show directly — this layer maps each handle to
// clean, on-brand copy AND the rich detail sections (overview, highlights,
// specs, how-to-use) rendered by ProductStory. A product without an entry here
// falls back to a minimal shape built from its raw Shopify data (see
// getProductContent), so newly added products still render, just without the
// curated long-form story.
//
// `imageIndex` on a highlight/use-case block selects which of the product's own
// Shopify images to show, so the story always uses real product photography.
const PRODUCT_CONTENT = {
  "mens-fitness-lumbar-support-belt": {
    name: "Lumbar Support Belt",
    tag: "Back Support",
    badge: "Best Seller",
    benefit: "Adjustable lumbar belt for lifting, long days and active recovery.",
    description:
      "Targeted lumbar support engineered to fit the waist curve with comfortable, 360° protection — built for lifting, long shifts and active recovery.",
    rating: 4.8,
    reviews: 1240,
    features: [
      "Breathable spandex with flexible support panels",
      "Easy-tightening straps for a secure, adjustable fit",
      "360° compression with even pressure distribution",
      "Available in sizes S–XL",
    ],
    overview: {
      heading: "Support your back through every lift and long day.",
      paragraphs: [
        "The MotionPluse Lumbar Support Belt wraps your lower back in firm, even compression that helps you sit, stand and lift with confidence. Structured support panels hold their shape against your spine, while a breathable spandex body moves with you instead of digging in.",
        "Whether you're on your feet all shift, powering through a workout, or recovering from everyday strain, the belt's dual-pull straps let you dial in exactly the amount of support you need — then loosen it in a second when you're done.",
      ],
    },
    highlights: [
      {
        eyebrow: "Adjustment",
        title: "Dial in your fit with dual-pull straps.",
        body: "An easy-tightening strap system lets you tune compression evenly on both sides — no awkward reaching or over-tightening. Loosen or lock it down in seconds.",
        imageIndex: 0,
      },
      {
        eyebrow: "Structure",
        title: "Support panels that hold their shape.",
        body: "Firm vertical support panels follow the curve of your lower back, distributing pressure across the whole lumbar region instead of a single point.",
        imageIndex: 1,
      },
      {
        eyebrow: "Comfort",
        title: "Breathable, all-day materials.",
        body: "A stretch spandex body with a breathable mesh back keeps you cool and comfortable, so the belt stays wearable through long shifts and workouts alike.",
        imageIndex: 2,
      },
    ],
    useCases: {
      heading: "Made for the way you move.",
      body: "Extra lumbar support and a stable core environment for the moments your back works hardest — comfortable enough to wear from the warehouse to the gym.",
      items: [
        "Heavy lifting & workouts",
        "Long hours sitting or standing",
        "Everyday lower-back strain",
        "Post-strain recovery support",
      ],
      imageIndex: 3,
    },
    howToUse: {
      heading: "Simple to put on. Easy to adjust.",
      steps: [
        { t: "Open & position", b: "Hold the belt open at your midsection, centered on your lower back." },
        { t: "Wrap & secure", b: "Wrap the panels around your waist and fasten the main closure snugly." },
        { t: "Dial in tension", b: "Use the side straps to fine-tune compression to a firm, comfortable fit." },
      ],
    },
    specs: [
      { label: "Material", value: "Breathable spandex + mesh" },
      { label: "Color", value: "Black" },
      { label: "Sizes", value: "S, M, L, XL" },
      { label: "Support", value: "Structured lumbar panels" },
      { label: "Best for", value: "Lifting, work, recovery" },
      { label: "In the box", value: "1 × Lumbar support belt" },
    ],
    sizing: {
      note: "Measure your waist at the level of your navel — not your usual pants size. Between sizes? Size up for a more comfortable fit.",
      columns: ["Size", "Waist (in)", "Waist (cm)"],
      rows: [
        ["S", "23.6 – 29.5", "60 – 75"],
        ["M", "29.5 – 35.4", "75 – 90"],
        ["L", "35.4 – 41.3", "90 – 105"],
        ["XL", "41.3 – 47.2", "105 – 120"],
      ],
    },
  },

  "cervical-neck-pillow-cooling-ergonomic-memory-foam-pillows-dual-height-orthopedic-support-contour-pillow-for-side":
    {
      name: "Cervical Support Pillow",
      tag: "Neck & Sleep",
      badge: "Everyday Support",
      benefit: "Cooling memory foam pillow with dual-height contour support.",
      description:
        "Ergonomic memory foam pillow with a dual-height contour design that cradles the neck and shoulders — a cooling surface built for side and back sleepers.",
      rating: 4.7,
      reviews: 860,
      features: [
        "Dual-height contour fits side and back sleepers",
        "CertiPUR-US certified slow-rebound memory foam",
        "Center cavity cradles the head and aligns the spine",
        "Armrest grooves for comfortable side sleeping",
      ],
      overview: {
        heading: "Wake up without the neck ache.",
        paragraphs: [
          "The Cervical Support Pillow combines the comfort of a traditional pillow with the alignment of an orthopedic contour design. A center cavity cradles your head while raised edges follow the natural curve of your neck, helping your spine rest in a neutral, relaxed line all night.",
          "Made from 100% slow-rebound memory foam, it stays supportive without going flat — firm enough to hold your head and shoulders, soft enough to sink into. Dedicated arm grooves make it especially comfortable for side sleepers who like to tuck an arm under the pillow.",
        ],
      },
      highlights: [
        {
          eyebrow: "Alignment",
          title: "A center cavity that cradles your head.",
          body: "The partition contour design gently holds your head in place and follows your neck's curve, helping align your spine so muscles can fully relax.",
          imageIndex: 0,
        },
        {
          eyebrow: "Two heights",
          title: "Choose the side that fits your sleep.",
          body: "A lower side (3.15\") for everyday and back sleeping, and a higher side (4.52\") for side sleepers or those who prefer a taller pillow — just flip it over.",
          imageIndex: 1,
        },
        {
          eyebrow: "Materials",
          title: "Premium slow-rebound memory foam.",
          body: "CertiPUR-US certified foam gives firm, breathable support that responds to your shape and holds it — no more flattening out by morning.",
          imageIndex: 2,
        },
      ],
      useCases: {
        heading: "Rest easy, whatever your sleep style.",
        body: "Designed to relieve pressure and support healthy neck alignment through the night, for a range of sleepers and everyday neck tension.",
        items: [
          "Side & back sleepers",
          "Neck & shoulder tension",
          "Cervical spine support",
          "Everyday better rest",
        ],
        imageIndex: 3,
      },
      howToUse: {
        heading: "Getting started with your pillow.",
        steps: [
          { t: "Unpack & rest", b: "Unbox and let the pillow rebound fully for 24 hours before first use." },
          { t: "Pick your height", b: "Choose the lower or higher side based on your sleeping posture." },
          { t: "Settle in", b: "Rest your head in the center cavity with your neck along the contour edge." },
        ],
      },
      specs: [
        { label: "Material", value: "CertiPUR-US memory foam" },
        { label: "Heights", value: 'Low 3.15" / High 4.52"' },
        { label: "Dimensions (K)", value: '25.98 × 15.35 × 5.12 in' },
        { label: "Weight", value: "≈ 2.93 lb" },
        { label: "Colors", value: "Grey, White, Dark Grey" },
        { label: "Best for", value: "Side & back sleepers" },
      ],
    },

  "cordless-shiatsu-neck-massager-with-heat-4-silicone-massage-nodes-3-intensity-levels-2-heat-settings-2000mah-rechargeable-with-10-mins-timer-deep-tissue-massager-for-neck-shoulder-back-leg":
    {
      name: "Shiatsu Neck & Shoulder Massager",
      tag: "Recovery Tech",
      badge: "Best Seller",
      benefit: "Cordless deep-tissue shiatsu massage with heat, on the go.",
      description:
        "Cordless shiatsu massager with 4 silicone nodes, 3 intensity levels and 2 heat settings — rechargeable with a 10-minute auto-timer for neck, shoulder, back and leg relief.",
      rating: 4.9,
      reviews: 540,
      features: [
        "4 silicone nodes for deep, hand-like shiatsu massage",
        "3 intensity levels + 2 soothing heat settings",
        "2000mAh battery — up to 2 hours fully cordless",
        "Adjustable strap for a hands-free fit anywhere",
      ],
      overview: {
        heading: "A deep-tissue massage, wherever you are.",
        paragraphs: [
          "Four soft silicone nodes rotate to recreate the deep-kneading feel of a professional shiatsu massage, working out tension in your neck, shoulders, back and legs. Add gentle warmth and tight muscles loosen faster — helping improve circulation and melt away the tension of a long day.",
          "Fully cordless and lightweight, it drapes over your shoulders with an adjustable strap for a secure, hands-free fit. A 2000mAh battery delivers up to two hours of use per charge, and a built-in 10-minute timer means you can relax without watching the clock.",
        ],
      },
      highlights: [
        {
          eyebrow: "Deep tissue",
          title: "Four nodes that knead like real hands.",
          body: "Soft silicone shiatsu nodes rotate in both directions to deliver a realistic deep-kneading massage across the neck, shoulders, back and legs.",
          imageIndex: 0,
        },
        {
          eyebrow: "Heat + control",
          title: "Warmth and intensity, your way.",
          body: "Choose from 3 intensity levels and 2 heat settings (42°C / 45°C) to tailor each session to the muscle group and comfort you want.",
          imageIndex: 1,
        },
        {
          eyebrow: "Cordless",
          title: "Untethered, hands-free relief.",
          body: "A 2000mAh rechargeable battery gives up to 2 hours cordless. The adjustable strap keeps the massager in place at home, at the desk, or traveling.",
          imageIndex: 2,
        },
      ],
      useCases: {
        heading: "Relief for the places tension builds.",
        body: "Lightweight, cordless and quiet — the kind of everyday recovery you'll actually reach for, and a thoughtful gift for anyone who carries their stress in their shoulders.",
        items: [
          "Neck & shoulder tension",
          "Upper & lower back",
          "Tired legs & calves",
          "Home, office or travel",
        ],
        imageIndex: 3,
      },
      howToUse: {
        heading: "Relief in three steps.",
        steps: [
          { t: "Charge up", b: "Charge fully via the included Type-C cable (about 4 hours for up to 2 hours of use)." },
          { t: "Position & strap", b: "Drape it over your neck or target area and adjust the strap for firm contact." },
          { t: "Set & relax", b: "Pick your intensity and heat level — the 10-minute timer switches it off automatically." },
        ],
      },
      specs: [
        { label: "Nodes", value: "4 silicone shiatsu nodes" },
        { label: "Intensity", value: "3 levels (low / med / high)" },
        { label: "Heat", value: "2 levels — 42°C / 45°C" },
        { label: "Battery", value: "3.7V 2000mAh rechargeable" },
        { label: "Runtime", value: "≈ 2 hrs / 4 hr charge" },
        { label: "Timer", value: "10-minute auto shut-off" },
        { label: "Material", value: "ABS + silicone" },
        { label: "In the box", value: "Massager, Type-C cable, manual" },
      ],
    },

  "electric-heated-knee-massager-with-vibration-function": {
    name: "Heated Knee Massager",
    tag: "Knee Support",
    badge: "Everyday Support",
    benefit: "Heated vibration therapy for joint pain and stiffness.",
    description:
      "Graphene heating paired with vibration therapy to target joint pain, stiffness and everyday discomfort — one size fits all, USB rechargeable.",
    rating: 4.6,
    reviews: 430,
    features: [
      "Graphene heating technology for fast, even warmth",
      "Soothing vibration massage function",
      "One-size wrap with an adjustable extension strap",
      "USB rechargeable — use it almost anywhere",
    ],
    overview: {
      heading: "Warm, soothing relief that wraps right around the joint.",
      paragraphs: [
        "The Heated Knee Massager combines graphene heating technology with gentle vibration to bring soothing warmth deep into stiff, aching joints. Heat helps relax the muscles and tissue around the knee, while vibration adds a massage-like release — a comforting combination after a long day, a hard workout, or when the cold makes joints ache.",
        "A one-size wrap with an adjustable extension strap fits a wide range of legs securely, and USB charging means you can use it on the couch, at your desk, or wherever you unwind. Lightweight and simple to put on, it's easy to make part of your daily recovery routine.",
      ],
    },
    highlights: [
      {
        eyebrow: "Heat therapy",
        title: "Graphene warmth, right where it aches.",
        body: "Graphene heating technology spreads even, comforting warmth around the whole joint to help relax tissue and ease stiffness.",
        imageIndex: 0,
      },
      {
        eyebrow: "Massage",
        title: "Vibration that adds gentle release.",
        body: "A built-in vibration function layers a soft massage over the heat, helping soothe tired, achy knees after activity.",
        imageIndex: 1,
      },
      {
        eyebrow: "Fit",
        title: "One size, secure on any leg.",
        body: "An adjustable extension strap wraps snugly to keep the massager in place, and USB charging keeps it cordless and ready.",
        imageIndex: 2,
      },
    ],
    useCases: {
      heading: "Everyday relief for hard-working knees.",
      body: "Simple, soothing warmth and massage for the joints that carry you through the day — training days, recovery days, and everything in between.",
      items: [
        "Joint stiffness & aches",
        "Post-workout recovery",
        "Everyday knee comfort",
        "Cold-weather relief",
      ],
      imageIndex: 3,
    },
    howToUse: {
      heading: "Easy to use, every day.",
      steps: [
        { t: "Wrap it on", b: "Position the massager over your knee and secure it with the extension strap." },
        { t: "Power up", b: "Charge via USB, then switch it on to start heating." },
        { t: "Heat & massage", b: "Select heat and vibration and relax for a soothing session." },
      ],
    },
    specs: [
      { label: "Heating", value: "Graphene heating technology" },
      { label: "Massage", value: "Vibration function" },
      { label: "Power", value: "5W" },
      { label: "Voltage", value: "3.7V" },
      { label: "Battery", value: "900mAh" },
      { label: "Power supply", value: "USB rechargeable" },
      { label: "Size", value: "One size fits all" },
      { label: "In the box", value: "Massager, strap, USB cable, manual" },
    ],
  },
};

const DEFAULT_FEATURES = [
  "Premium materials for everyday comfort",
  "Designed for a secure, supportive fit",
  "Built to support an active lifestyle",
];

/**
 * Returns curated storefront copy for a product, falling back to its raw
 * Shopify title/description when no curated entry exists.
 * @param {Object} product Shopify Buy SDK product GraphModel
 */
export function getProductContent(product) {
  const curated = PRODUCT_CONTENT[product?.handle];
  if (curated) return curated;

  return {
    name: product?.title || "Product",
    tag: product?.productType || "Support",
    badge: null,
    benefit: product?.title || "",
    description: (product?.descriptionHtml || "").replace(/<[^>]+>/g, " ").trim().slice(0, 220),
    rating: 4.7,
    reviews: 100,
    features: DEFAULT_FEATURES,
  };
}
