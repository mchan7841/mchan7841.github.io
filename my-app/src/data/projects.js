const projects = [
  {
    id: 'cybercab-grok',
    kind: 'tweet',
    title: 'Cybercab Grok',
    blurb:
      'Built automation and validation so Grok in Cybercab can handle rider and vehicle info, media, and climate — no screen needed.',
    href: 'https://x.com/robotaxi/status/2096428461166588208',
    tweet: {
      name: 'Robotaxi',
      handle: 'robotaxi',
      avatar: '/avatars/robotaxi.jpg',
      text: 'Talk to Grok to control your Cybercab',
      quote: {
        name: 'OwenSparks',
        handle: 'OwenSparks',
        text:
          'Cybercab has some pretty in-depth Grok integration, so for many actions, you never have to touch the screen.',
      },
      image: '/tweets/cybercab.jpg',
      meta: 'Sep 5, 2026 · 3.7K likes',
    },
  },
  {
    id: 'summer-grok',
    kind: 'article',
    title: 'Expanded Grok — Summer Release',
    blurb:
      'Owned the automation and validation tooling behind expanded Grok commands: phone calls, music, climate, glovebox, and Tesla Q&A.',
    href: 'https://x.com/tesla/status/2079584176182087827',
    articleTitle: 'Summer Release 2026',
    articleImage: '/articles/summer.jpg',
  },
  {
    id: 'wake-word',
    kind: 'tweet',
    title: 'Wake Word',
    blurb:
      'Built automation and validation for “Hey Grok” wake word and location-based reminders.',
    href: 'https://x.com/tesla/status/2043782316850573312',
    tweet: {
      name: 'Tesla',
      handle: 'Tesla',
      avatar: '/avatars/tesla.png',
      text:
        'Say “Hey Grok” to launch Grok, including location-based reminders on the road.',
      meta: 'Apr 13, 2026 · 13.5K likes',
    },
  },
  {
    id: 'navigation',
    kind: 'tweet',
    title: 'Nearby places & local history',
    blurb:
      'Built automation and validation for Grok on nearby places, local history, and geological features.',
    href: 'https://x.com/tesla/status/2058638532353434023',
    tweet: {
      name: 'Tesla',
      handle: 'Tesla',
      avatar: '/avatars/tesla.png',
      text:
        '.@Grok can be your guide while exploring new spots.\n\nJust say “Hey Grok” to ask about geological features, local history, or places to check out nearby.',
      meta: 'May 24, 2026 · 5.2K likes',
    },
  },
  {
    id: 'grok-nav',
    kind: 'article',
    title: 'Grok nav',
    blurb:
      'Built tools and validation so Grok can add and edit navigation destinations reliably.',
    href: 'https://x.com/tesla/status/1997094007948627975',
    articleTitle: 'Grok with Navigation Commands',
    articleImage: '/articles/grok-nav.jpg',
  },
  {
    id: 'playstation',
    kind: 'job',
    title: 'PlayStation',
    role: 'Validation tooling',
    blurb:
      'Built automation and validation tooling for PS5 checkout when existing tooling wasn’t enough.',
    image: '/jobs/ps5.jpg',
  },
];

export default projects;
