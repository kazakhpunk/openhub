# OpenRouter-Only Setup for Morphic

This version of Morphic uses **only OpenRouter** for all LLM models, including GPT, Claude, Gemini, and other popular models.

## 🚀 Quick Setup

### 1. Environment Variables

Add to your `.env.local`:

```bash
# Only OpenRouter API key needed
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Model hash secret for URL security
MODEL_HASH_SECRET=your-secret-key-here

# Optional
ENABLE_SAVE_CHAT_HISTORY=false
```

### 2. Get OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai)
2. Sign up/login
3. Go to [Settings](https://openrouter.ai/settings/keys)
4. Create an API key
5. Add credits to your account

## 🤖 Available Models

All models run through OpenRouter:

### 🔥 **Latest & Greatest**

- **GPT-5** - OpenAI's most advanced model
- **GPT-5 Chat** - Enterprise conversations
- **GPT-5 Mini** - Compact reasoning
- **GPT-5 Nano** - Ultra-fast & cheap
- **Claude Opus 4.1** - Anthropic's flagship
- **Grok 4** - xAI's reasoning model

### 🌟 **Top Performers**

- **Gemini 2.5 Flash** - Google's workhorse
- **Gemini 2.5 Pro** - Advanced reasoning
- **Gemini 2.5 Flash Lite** - Ultra-low latency
- **Mistral Small 3.2 24B** - Updated instruction following
- **MiniMax M1** - 1M context reasoning

### 🆓 **Free Models**

- **Mistral Small 3.2 24B (Free)**
- **Hunyuan A13B Instruct (Free)** - Tencent's MoE
- **DeepSeek R1T2 Chimera (Free)** - Fast reasoning
- **Kimi Dev 72B (Free)** - Software engineering

### ⚡ **Speed Focused**

- **Mercury** - 5-10x faster diffusion LLM
- **Morph V3 Fast** - 4500+ tokens/sec code editing

### 🎯 **Specialized**

- **UI-TARS 7B** - GUI automation
- **GLM 4.1V 9B Thinking** - Vision reasoning
- **Anubis 70B V1.1** - Creative roleplay
- **ERNIE 4.5 300B** - Baidu's MoE model

## 🔗 How to Use

### URL-Based Model Selection

```bash
# Generate model hashes first
node scripts/generate-model-hashes.js

# Use in URLs
/?model=abc123def456              # Home with specific model
/search?q=hello&model=abc123def456 # Search with model
```

### API Endpoints

```bash
GET  /api/models                  # List all models with hashes
GET  /api/models/abc123def456      # Get specific model info
POST /api/models/abc123def456      # Set model programmatically
```

## 💰 Pricing

OpenRouter shows real-time pricing for each model. Popular options:

- **GPT-5 Nano**: $0.05/M input, $0.40/M output
- **Gemini 2.5 Flash Lite**: $0.10/M input, $0.40/M output
- **Mistral Small (Free)**: $0/M tokens
- **Mercury**: $0.25/M input, $1/M output

## 🔒 Security

- Model hashes use HMAC-SHA256 with your secret key
- No direct model ID exposure in URLs
- All requests go through OpenRouter's secure API

## 🛠 Development

### Add More Models

1. Check [OpenRouter Models](https://openrouter.ai/models)
2. Add to `public/config/models.json`:
   ```json
   {
     "id": "provider/model-name",
     "name": "Display Name",
     "provider": "Provider",
     "providerId": "openrouter",
     "enabled": true,
     "toolCallType": "native"
   }
   ```
3. Add to `lib/config/default-models.json`
4. Run `node scripts/generate-model-hashes.js`

### Package.json Dependencies

Only these AI SDK packages needed:

```json
{
  "@ai-sdk/openai": "^1.0.0",
  "ai": "^4.0.0"
}
```

## 🎯 Why OpenRouter Only?

✅ **Unified API** - One key for all models  
✅ **Cost Tracking** - Built-in usage monitoring  
✅ **Model Variety** - 400+ models from all providers  
✅ **Rate Limiting** - Built-in protection  
✅ **Fallbacks** - Automatic model switching  
✅ **Simplified Setup** - No multiple API keys to manage

## 🚨 Troubleshooting

**Model not working?**

- Check your OpenRouter credits
- Verify the model ID exists on OpenRouter
- Some models require special access

**Rate limited?**

- OpenRouter has built-in rate limiting
- Upgrade your plan for higher limits

**Hash not working?**

- Verify `MODEL_HASH_SECRET` matches
- Regenerate hashes after model changes
