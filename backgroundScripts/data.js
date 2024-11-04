let RANDOM_NEWS = [];
let searchKeywordIndex = 0;

function generateMixedKeywords(num) {
   const adjectives = [
      "Global",
      "National",
      "Local",
      "International",
      "Tech",
      "Economic",
      "Financial",
      "Political",
      "Environmental",
      "Social",
      "Corporate",
      "Healthcare",
      "Educational",
      "Legal",
      "Military",
      "Public",
      "Private",
      "Medical",
      "Renewable",
      "Digital",
      "Climate",
      "Energy",
      "Trade",
      "Market",
      "Cryptocurrency",
      "Artificial",
      "Automotive",
      "Defense",
      "Tourism",
      "Sports",
      "Cultural",
      "Government",
      "Consumer",
      "Infrastructure",
      "Housing",
      "Labor",
      "Telecommunication",
      "Agriculture",
      "Maritime",
      "Veteran",
      "Charity",
      "Tax",
      "Prison",
      "Workforce",
      "Retail",
      "Environmental",
   ];

   const nouns = [
      "market",
      "election",
      "change",
      "league",
      "analysis",
      "deals",
      "innovations",
      "plans",
      "coverage",
      "protection",
      "trends",
      "policies",
      "statistics",
      "reforms",
      "organization",
      "deficit",
      "crime",
      "improvements",
      "reports",
      "strategy",
      "crisis",
      "debates",
      "research",
      "advancements",
      "projects",
      "spending",
      "negotiations",
      "violations",
      "regulations",
      "responsibility",
      "funding",
      "subsidies",
      "cuts",
      "security",
      "initiatives",
      "solutions",
      "funds",
      "programs",
      "agreements",
      "discoveries",
      "missions",
      "updates",
      "laws",
      "responses",
      "debates",
      "access",
      "bans",
      "adoption",
      "forecasts",
      "increases",
      "education",
      "collaborations",
      "transformation",
      "additions",
      "strategies",
      "discussion",
      "conservation",
      "expansion",
      "diversity",
      "training",
      "development",
      "standards",
      "infrastructure",
      "automation",
   ];

   const verbs = [
      "trends",
      "effects",
      "results",
      "statistics",
      "reforms",
      "initiatives",
      "plans",
      "proposals",
      "solutions",
      "innovations",
      "predictions",
      "announcements",
      "mandates",
      "projections",
      "projects",
      "negotiations",
      "increases",
      "discoveries",
      "funding",
      "expansion",
      "reduction",
      "policies",
      "collaborations",
      "forecasts",
      "additions",
      "developments",
      "reviews",
      "reports",
      "discussions",
      "improvements",
      "strategies",
      "updates",
      "support",
      "findings",
      "protection",
      "impacts",
      "adoption",
      "exploration",
      "mitigation",
      "modernization",
      "resolution",
      "advancements",
      "efforts",
      "cuts",
      "expansion",
      "support",
   ];

   const questionTemplates = [
      "What is the impact of {noun} on {noun}?",
      "How does {adjective} {noun} affect {noun}?",
      "Why is {noun} important for {noun}?",
      "What are the effects of {adjective} {noun}?",
      "How can we improve {noun} through {noun}?",
      "What trends are shaping {noun} in {adjective} {noun}?",
      "How does {adjective} {noun} influence {noun}?",
      "What are the challenges of {noun} in {adjective} {noun}?",
      "How do I implement {noun} in {adjective} programming?",
      "What are the best practices for {noun} in coding?",
      "Why is {noun} essential for software development?",
      "How does {adjective} {noun} optimize performance in coding?",
      "What is the difference between {noun} and {noun} in programming?",
      "How can I debug {noun} effectively?",
      "How does elsesourav coding {verb} {noun}?",
      "elsesourav {noun} affect network?",
      "How does elsesourav {noun} {verb} {noun}?",
      "elsesourav {noun} affect {noun}?",
      "How does elsesourav GitHub {verb} {noun}?"
   ];

   const keywords = new Set();

   while (keywords.size < num) {
      const randomType = Math.floor(Math.random() * 4); // Randomly choose from 0-3
      if (randomType === 0) {
         // Add a single word (random adjective, noun, or verb)
         const word = [adjectives, nouns, verbs][
            Math.floor(Math.random() * 3)
         ];
         const newWord = word[Math.floor(Math.random() * word.length)];
         keywords.add(newWord);
      } else if (randomType === 1) {
         // Add a three-word phrase (adjective + noun + verb)
         const adjective =
            adjectives[Math.floor(Math.random() * adjectives.length)];
         const noun = nouns[Math.floor(Math.random() * nouns.length)];
         const verb = verbs[Math.floor(Math.random() * verbs.length)];
         const phrase = `${adjective} ${noun} ${verb}`;
         keywords.add(phrase);
      } else {
         // Add a dynamically generated question
         const template =
            questionTemplates[
               Math.floor(Math.random() * questionTemplates.length)
            ];
         const randomAdjective =
            adjectives[Math.floor(Math.random() * adjectives.length)];
         const randomVerb = verbs[Math.floor(Math.random() * nouns.length)];
         const randomNoun1 = nouns[Math.floor(Math.random() * nouns.length)];
         const randomNoun2 = nouns[Math.floor(Math.random() * nouns.length)];
         const question = template
            .replace(/{adjective}/g, randomAdjective)
            .replace(/{noun}/g, randomNoun1)
            .replace(/{verb}/g, randomVerb)
            .replace(/{noun}/g, randomNoun2);
         keywords.add(question);
      }
   }

   return Array.from(keywords); // Convert Set back to an Array
}

RANDOM_NEWS = generateMixedKeywords(500);
