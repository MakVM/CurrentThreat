# CurrentThreat - AI Product
An AI-powered product made from the [Product Kit Template](https://github.com/1712n/product-kit-template) using [CPW API](https://rapidapi.com/CPWatch/api/cpw-tracker).

Developer's Telegram: @macareeena
## 🚀 **LIVE WEBSITE** 🚀
### https://makvm.github.io/CurrentThreat/

### Use case


### Features


## Product Kit Template

Auto-fetch data from CPW API and build your product on top.

### Setup and Build

1. Use this template: Click "Use this template" button above
2. Subscribe to API: Go to [CPW API](https://rapidapi.com/CPWatch/api/cpw-tracker) and subscribe to `Basic` plan (100 free requests/month)
3. Add API key: Go to Settings → Secrets → Actions, add `RAPIDAPI_KEY`
4. Сustomize data source: Edit [`scripts/api-call.js`](scripts/api-call.js) to change what you track
5. Build your product: Use the auto-updating [`data/events.json`](data/events.json) however you want

### What It Does

- Monitors industry chatter for catastrophic event signals
- Fetches fresh data weekly (configurable schedule)
- Saves results to [`data/events.json`](data/events.json)
- Provides foundation for early detection tools

### Customize Your Detection

Edit [`scripts/api-call.js`](scripts/api-call.js):

```javascript
// Change these parameters:
entities: "financial custodians",        // What to monitor
topic: "cyberattack",                   // Event type (default: "catastrophic event")
industry: "finance",                    // Fixed to finance
```

Time range is configurable (max 7 days):
```javascript
startTime.setDate(startTime.getDate() - 1)  // Last 24 hours
 ```

### Build Your Tool

Use the event data to build alert systems, monitoring dashboards, notification tools, research platforms, or whatever problem you're interested in.

> [!NOTE]
> The [workflow file](.github/workflows/deploy.yml) includes commented examples for GitHub Pages deployment and social media integration.
