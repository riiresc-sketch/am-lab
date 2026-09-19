const express = require('express')
const router = express.Router()

const API_BASE = 'https://api.theresav.eu/api/tools/generator-email'
const API_KEY = process.env.THERESAV_KEY

// POST /api/tempmail/create -> acak domain
router.post('/create', async (req,res)=>{
  try{
    // KOSONG = ACAK, jangan kirim ?domain
    const data = await fetch(`${API_BASE}/create`, {
      headers:{ 'x-apikey': API_KEY }
    }).then(r=>r.json())

    res.json({ 
      success:true, 
      email: data.email || data.data?.email,
      domain: (data.email || '').split('@')[1]
    })
  }catch(e){
    res.status(500).json({ success:false, message:e.message })
  }
})

// GET /api/tempmail/inbox?email=xxx
router.get('/inbox', async (req,res)=>{
  try{
    const email = req.query.email
    let data = await fetch(`${API_BASE}/inbox?email=${email}`, {
      headers:{ 'x-apikey': API_KEY }
    }).then(r=>r.json()).catch(async()=>{
      return await fetch(`${API_BASE}/messages?email=${email}`, {
        headers:{ 'x-apikey': API_KEY }
      }).then(r=>r.json())
    })
    res.json({ success:true, mails: data.messages || data.data || data.mails || data || [] })
  }catch(e){ res.status(500).json({ success:false }) }
})

// GET /api/tempmail/generate -> alias buat frontend lu yang + Generate Baru
router.get('/generate', async (req,res)=>{
  req.url = '/create'
  router.handle(req,res)
})

module.exports = router