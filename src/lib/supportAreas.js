// Content for the /support/:slug education pages linked from the
// "Support, wherever you need it" cards. Copy is general wellbeing guidance —
// it avoids diagnosing or promising to treat conditions.

const IMG = "https://media.base44.com/images/public/6ab1997b13a801d33d37441e";

export const SUPPORT_AREAS = {
  "lower-back": {
    slug: "lower-back",
    title: "Lower Back",
    cardDescription: "Support for lifting, working, training and everyday movement.",
    image: `${IMG}/2b3d784e0_generated_418e837b.jpg`,
    heroTitle: "Why your lower back hurts, and how to support it.",
    heroText:
      "Lower back pain is one of the most common reasons people slow down. Most everyday back pain isn't caused by one big injury. It builds up from the way we sit, lift and move every day.",
    stats: [
      { value: "619M", label: "people lived with low back pain in 2020 (WHO)" },
      { value: "#1", label: "cause of disability worldwide" },
      { value: "~9 in 10", label: "cases have no single specific cause" },
    ],
    causes: [
      { title: "Long hours of sitting", body: "Sitting flattens the natural curve of your lower spine and switches off the glutes and deep core muscles that should share the load." },
      { title: "Lifting with your back", body: "Bending from the waist instead of the hips puts the load on small back muscles and ligaments instead of your legs." },
      { title: "Weak core and hips", body: "When your trunk and hip muscles tire quickly, the lower back picks up the slack and becomes overworked and sore." },
      { title: "Tight hip flexors", body: "Hours in a chair shorten the muscles at the front of your hips, which pull on your pelvis and lower back when you stand." },
      { title: "Poor sleep posture", body: "A sagging mattress or twisted sleeping position can leave your back stiff before your day even starts." },
      { title: "Stress and inactivity", body: "Tension makes muscles guard and stiffen, and moving less makes that stiffness harder to shake off." },
    ],
    cycle: ["Sitting or lifting strain", "Muscle fatigue", "Stiffness and guarding", "Pain", "Moving less"],
    helps: [
      { title: "Firm, even compression", body: "A support belt wraps your lower back in even pressure, helping you feel stable when lifting, commuting or on long shifts." },
      { title: "Posture reminders", body: "Structured panels make slouching noticeable, so you naturally sit and stand taller." },
      { title: "Soothing heat and massage", body: "Heat and shiatsu-style massage help tight muscles relax after a long day, so you can get back to moving." },
    ],
    tips: [
      "Stand up and move for 2 minutes every 30 minutes",
      "Lift with your hips and knees, keeping the load close to your body",
      "Strengthen with glute bridges and bird-dogs, 10 minutes a day",
      "Use your support for demanding tasks, not all day",
    ],
    relatedHandles: [
      "mens-fitness-lumbar-support-belt",
      "cordless-shiatsu-neck-massager-with-heat-4-silicone-massage-nodes-3-intensity-levels-2-heat-settings-2000mah-rechargeable-with-10-mins-timer-deep-tissue-massager-for-neck-shoulder-back-leg",
    ],
  },

  knee: {
    slug: "knee",
    title: "Knee",
    cardDescription: "Stability and comfort for active days and recovery.",
    image: `${IMG}/d66804c2d_generated_c60e55d4.jpg`,
    heroTitle: "Why your knees ache, and how to keep them moving.",
    heroText:
      "Your knees carry you through every step, squat and stair. When the muscles around them get weak or tight, or the joint gets stiff, everyday movement starts to hurt.",
    stats: [
      { value: "~1 in 4", label: "adults experience knee pain" },
      { value: "3–4×", label: "your body weight goes through your knees on stairs" },
      { value: "Daily", label: "movement keeps joints feeling better" },
    ],
    causes: [
      { title: "Weak thigh and hip muscles", body: "Your quads and glutes absorb shock. When they're weak, more stress goes straight through the knee joint." },
      { title: "Overuse", body: "Running, jumping or suddenly training more than usual can overload the tendons and cartilage around the knee." },
      { title: "Stiffness from inactivity", body: "Joints like movement. Sitting for hours with bent knees leaves them stiff and achy when you stand up." },
      { title: "Extra load", body: "Every extra kilo of body weight adds several kilos of force through your knees on stairs and slopes." },
      { title: "Age-related wear", body: "Over time, joint surfaces can become less smooth, which often shows up as morning stiffness." },
      { title: "Old injuries", body: "A past sprain or twist can leave the knee less stable, so the surrounding muscles overwork." },
    ],
    cycle: ["Weak or tight muscles", "Joint overload", "Stiffness and ache", "Moving less", "Muscles weaken further"],
    helps: [
      { title: "Targeted warming heat", body: "Gentle heat helps a stiff knee feel looser, which makes it easier to warm up before movement." },
      { title: "Soothing vibration", body: "Vibration massage relaxes the muscles around the joint after a long or active day." },
      { title: "Easy daily routine", body: "15–20 minute sessions fit around TV time or winding down, so recovery becomes a habit." },
    ],
    tips: [
      "Warm up before exercise, especially on cold mornings",
      "Strengthen with sit-to-stands and straight-leg raises",
      "Choose low-impact cardio like cycling or swimming",
      "Avoid kneeling or deep squats when your knee is flared up",
    ],
    relatedHandles: ["electric-heated-knee-massager-with-vibration-function"],
  },

  ankle: {
    slug: "ankle",
    title: "Ankle",
    cardDescription: "Recovery for tired feet, ankles and lower legs.",
    image: `${IMG}/8e91d887e_generated_3b55511e.jpg`,
    heroTitle: "Why your ankles hurt, and how to recover faster.",
    heroText:
      "Your ankles balance your whole body on a small base. Rolled ankles, long days on your feet and tight calves all add up, and without recovery they can stay sore or unstable.",
    stats: [
      { value: "Top 3", label: "ankle sprains are among the most common sports injuries" },
      { value: "Up to 40%", label: "of sprains can lead to long-term ankle instability" },
      { value: "Balance", label: "training helps reduce repeat sprains" },
    ],
    causes: [
      { title: "Rolled ankles", body: "Stepping awkwardly overstretches the ligaments on the outside of the ankle, the classic sprain." },
      { title: "Poor balance after an old sprain", body: "After a sprain, the ankle's position sense drops, making another roll more likely." },
      { title: "Tight calves", body: "Tight calf muscles limit how far the ankle can bend, adding strain with every step." },
      { title: "Long hours on your feet", body: "Standing and walking all day tires the small muscles that stabilise the ankle and foot." },
      { title: "Unsupportive footwear", body: "Worn-out or unstable shoes give your ankle less help on uneven ground." },
      { title: "Sudden training increases", body: "Jumping into more running or court sports than your ankles are used to overloads the tendons." },
    ],
    cycle: ["Sprain or overload", "Swelling and pain", "Less movement", "Stiffness and weak balance", "Higher risk of re-injury"],
    helps: [
      { title: "Massage for tired lower legs", body: "Deep-kneading massage relaxes tight calf muscles that pull on the ankle and limit how it moves." },
      { title: "Soothing heat after activity", body: "Heat helps stiff, achy lower legs relax once any fresh swelling has settled." },
      { title: "Recovery you'll actually do", body: "Cordless, rechargeable tools make a 10-minute recovery routine easy to fit in." },
    ],
    tips: [
      "For a fresh sprain, rest and use cold for the first 48 hours",
      "Practise balance: stand on one leg while brushing your teeth",
      "Stretch your calves daily, 30 seconds each side",
      "Replace worn-out shoes, especially for sport",
    ],
    relatedHandles: [
      "cordless-shiatsu-neck-massager-with-heat-4-silicone-massage-nodes-3-intensity-levels-2-heat-settings-2000mah-rechargeable-with-10-mins-timer-deep-tissue-massager-for-neck-shoulder-back-leg",
    ],
  },
};

export const SUPPORT_AREA_LIST = Object.values(SUPPORT_AREAS);
