// // server.js
// const express = require("express");
// //const fetch = require("node-fetch"); // install with: npm install node-fetch
// const cors = require("cors");

// const app = express();
// const PORT = 3000;

// // Enable CORS for all routes
// app.use(cors());

// // Endpoint to fetch trending posts from r/todayilearned
// app.get("/trending", async (req, res) => {
//   try {
//     const response = await fetch(
//       "https://www.reddit.com/r/todayilearned/top.json?t=week&limit=5",
//     );
//     const data = await response.json();

//     // Transform Reddit data into a simpler format
//     const posts = data.data.children.map((child, i) => {
//       const post = child.data;
//       return {
//         num: String(i + 1).padStart(2, "0"),
//         title: post.title,
//         url: "https://reddit.com" + post.permalink,
//         upvotes: post.ups,
//       };
//     });

//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch Reddit data" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// // server.js
// const express = require("express");

// const cors = require("cors");

// const app = express();
// const PORT = 3000;

// app.use(cors());

// // Subreddits to pull from
// const subreddits = [
//   { name: "science", category: "🔬 Science" },
//   { name: "history", category: "🏛️ History" },
//   { name: "psychology", category: "🧠 Psychology" },
//   { name: "space", category: "🚀 Space" },
//   { name: "nature", category: "🌿 Nature" },
//   { name: "technology", category: "💻 Tech" },
// ];

// // Unified endpoint
// app.get("/facts", async (req, res) => {
//   try {
//     const results = await Promise.all(
//       subreddits.map(async (sub) => {
//         const response = await fetch(
//           `https://www.reddit.com/r/${sub.name}/top.json?t=week&limit=2`,
//         );
//         const data = await response.json();

//         return data.data.children.map((child) => {
//           const post = child.data;
//           return {
//             category: sub.category,
//             title: post.title,
//             body: post.selftext || "Read more on Reddit",
//             url: "https://reddit.com" + post.permalink,
//             upvotes: post.ups,
//           };
//         });
//       }),
//     );

//     // Flatten results into one array
//     const facts = results.flat();

//     res.json(facts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch facts" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// // server.js
// const express = require("express");

// const cors = require("cors");

// const app = express();
// const PORT = 3000;

// app.use(cors());

// const subreddits = [
//   { name: "science", category: "🔬 Science" },
//   { name: "history", category: "🏛️ History" },
//   { name: "psychology", category: "🧠 Psychology" },
//   { name: "space", category: "🚀 Space" },
//   { name: "nature", category: "🌿 Nature" },
//   { name: "technology", category: "💻 Tech" },
// ];

// // Cache variables
// let cachedFacts = [];
// let lastFetchTime = 0;
// const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in ms

// async function fetchFacts() {
//   const results = await Promise.all(
//     subreddits.map(async (sub) => {
//       const response = await fetch(
//         `https://www.reddit.com/r/${sub.name}/top.json?t=week&limit=2`,
//       );
//       const data = await response.json();

//       return data.data.children.map((child) => {
//         const post = child.data;
//         return {
//           category: sub.category,
//           title: post.title,
//           body: post.selftext || "Read more on Reddit",
//           url: "https://reddit.com" + post.permalink,
//           upvotes: post.ups,
//         };
//       });
//     }),
//   );

//   cachedFacts = results.flat();
//   lastFetchTime = Date.now();
// }

// // Endpoint
// app.get("/facts", async (req, res) => {
//   try {
//     const now = Date.now();
//     if (!cachedFacts.length || now - lastFetchTime > CACHE_DURATION) {
//       await fetchFacts();
//     }
//     res.json(cachedFacts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch facts" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// // server.js
// const express = require("express");

// const cors = require("cors");

// const app = express();
// const PORT = 3000;

// app.use(cors());

// // Subreddits for facts grid
// const subreddits = [
//   { name: "science", category: "🔬 Science" },
//   { name: "history", category: "🏛️ History" },
//   { name: "psychology", category: "🧠 Psychology" },
//   { name: "space", category: "🚀 Space" },
//   { name: "nature", category: "🌿 Nature" },
//   { name: "technology", category: "💻 Tech" },
// ];

// // Cache variables
// let cachedFacts = [];
// let lastFetchTime = 0;
// const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// // Fetch multiple subreddits for facts grid
// async function fetchFacts() {
//   const results = await Promise.all(
//     subreddits.map(async (sub) => {
//       const response = await fetch(
//         `https://www.reddit.com/r/${sub.name}/top.json?t=week&limit=10`,
//       );
//       const data = await response.json();

//       return data.data.children.map((child) => {
//         const post = child.data;
//         return {
//           category: sub.category,
//           title: post.title,
//           body: post.selftext || "Read more on Reddit",
//           url: "https://reddit.com" + post.permalink,
//           upvotes: post.ups,
//         };
//       });
//     }),
//   );

//   cachedFacts = results.flat();
//   lastFetchTime = Date.now();
// }

// // Utility: shuffle array
// function shuffle(array) {
//   return array
//     .map((item) => ({ item, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ item }) => item);
// }

// // Endpoint for facts grid
// app.get("/facts", async (req, res) => {
//   try {
//     const now = Date.now();
//     if (!cachedFacts.length || now - lastFetchTime > CACHE_DURATION) {
//       await fetchFacts();
//     }

//     // Shuffle and pick 8 random facts
//     const randomized = shuffle(cachedFacts).slice(0, 8);
//     res.json(randomized);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch facts" });
//   }
// });

// // Endpoint for trending sidebar (r/todayilearned only)
// app.get("/trending", async (req, res) => {
//   try {
//     const response = await fetch(
//       "https://www.reddit.com/r/todayilearned/top.json?t=week&limit=5",
//     );
//     const data = await response.json();

//     const posts = data.data.children.map((child, i) => {
//       const post = child.data;
//       return {
//         num: String(i + 1).padStart(2, "0"),
//         title: post.title,
//         url: "https://reddit.com" + post.permalink,
//         upvotes: post.ups,
//       };
//     });

//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch trending" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// server.js
const express = require("express");

const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ["https://til-daily.puter.site/", "http://127.0.0.1:8080/public/"],
  }),
);

const subreddits = [
  { name: "science", category: "🔬 Science" },
  { name: "history", category: "🏛️ History" },
  { name: "psychology", category: "🧠 Psychology" },
  { name: "space", category: "🚀 Space" },
  { name: "nature", category: "🌿 Nature" },
  { name: "technology", category: "💻 Tech" },
];

let cachedFacts = [];
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function fetchFacts() {
  const results = await Promise.all(
    subreddits.map(async (sub) => {
      const response = await fetch(
        `https://www.reddit.com/r/${sub.name}/top.json?t=week&limit=20`,
      );
      const data = await response.json();

      return data.data.children.map((child) => {
        const post = child.data;
        return {
          category: sub.category,
          title: post.title,
          body: post.selftext || "Read more on Reddit",
          url: "https://reddit.com" + post.permalink,
          upvotes: post.ups,
        };
      });
    }),
  );

  cachedFacts = results.flat();
  lastFetchTime = Date.now();
}

// Utility: shuffle array
function shuffle(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

// Facts endpoint with pagination
app.get("/facts", async (req, res) => {
  //res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.header("Access-Control-Allow-Origin", "https://til-daily.puter.site/");
  try {
    const now = Date.now();
    if (!cachedFacts.length || now - lastFetchTime > CACHE_DURATION) {
      await fetchFacts();
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 8;

    const randomized = shuffle(cachedFacts);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const pagedFacts = randomized.slice(start, end);

    res.json({
      page,
      pageSize,
      total: randomized.length,
      facts: pagedFacts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch facts" });
  }
});

// Trending endpoint (r/todayilearned only)
app.get("/trending", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.header("Access-Control-Allow-Origin", "https://til-daily.puter.site/");
  try {
    const response = await fetch(
      "https://www.reddit.com/r/todayilearned/top.json?t=week&limit=5",
    );
    const data = await response.json();

    const posts = data.data.children.map((child, i) => {
      const post = child.data;
      return {
        num: String(i + 1).padStart(2, "0"),
        title: post.title,
        url: "https://reddit.com" + post.permalink,
        upvotes: post.ups,
      };
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trending" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// ✨ With this setup:

// /trending serves your sidebar with top 5 posts from r/todayilearned.

// /facts serves your grid with randomized posts from multiple subreddits, cached for efficiency.
