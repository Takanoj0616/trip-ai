// TikTok API Proxy Server Example
// This is a Node.js Express server that acts as a proxy for TikTok API requests
// Run this separately as a backend service

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// TikTok API Configuration
const TIKTOK_API_BASE = 'https://open-api.tiktok.com';
const TIKTOK_RESEARCH_BASE = 'https://research-api.tiktok.com';

// TikTok API Search Endpoint (for regular API)
app.post('/api/tiktok/search', async (req, res) => {
  try {
    const { query, max_count, access_token } = req.body;
    
    console.log('TikTok API Request:', { query, max_count });
    
    const response = await axios.post(`${TIKTOK_API_BASE}/v2/video/query/`, {
      query: query,
      max_count: max_count || 20,
      fields: [
        'id',
        'video_description',
        'create_time',
        'cover_image_url',
        'share_url',
        'view_count',
        'like_count',
        'comment_count',
        'share_count',
        'play_url', // Note: This may require special permissions
        'download_url'
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('TikTok API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'TikTok API request failed',
      details: error.response?.data || error.message
    });
  }
});

// TikTok Research API Endpoint
app.post('/api/tiktok/research', async (req, res) => {
  try {
    const { query, max_count, api_key } = req.body;
    
    console.log('TikTok Research API Request:', { query, max_count });
    
    const response = await axios.post(`${TIKTOK_RESEARCH_BASE}/research/video/query/`, {
      query: query,
      max_count: max_count || 20,
      start_date: '20240101', // Adjust date range as needed
      end_date: '20241231'
    }, {
      headers: {
        'Authorization': `Bearer ${api_key}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('TikTok Research API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'TikTok Research API request failed',
      details: error.response?.data || error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`TikTok API Proxy Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;