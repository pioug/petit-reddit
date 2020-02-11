const { match } = require("path-to-regexp");

const rSubreddit = match("/r/:subreddit/:sort?", { decode: decodeURIComponent });

addEventListener("fetch", async event => {
  event.respondWith(handler(event));
});

async function handler(event) {
  const {
    params: { subreddit = '', sort = '' } = {}
  } = rSubreddit(new URL(event.request.url).pathname);

  const response = await fetch(`https://www.reddit.com/${subreddit ? `r/${subreddit}` : ''}/${sort}.json`);
  const data = await response.json();
  return new Response(renderToString(data), {
    status: 200,
    headers: {
      "content-type": "text/html;charset=UTF-8"
    }
  });
}

function renderToString(data) {
  const posts = data.data.children
    .map(p => `<div><a href="${p.data.url}"><p>${p.data.title}</p></a></div>`)
    .join("");
  return `<html><head><meta name="viewport" content="width=device-width, initial-scale=1">
</head><style>body {font-family: sans-serif}</style><body>${posts}</body></html>`;
}
