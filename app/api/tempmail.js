const express = require('express')
const router = express.Router()
const { incrementTempmail, getStats } = require('../../lib/stats')

const API_BASE = 'https://api.theresav.eu/api/tools/generator-email'
const API_KEY = '7Ppcz' // <-- langsung taro sini

async function createMail(){
  const data = await fetch(`${API_BASE}/create`, {
    headers:{ 'x-apikey': API_KEY }
  }).then(r=>r.json())
  const email = data.email || data.data?.email
  if(!email) throw new Error('Gagal generate email')
  return email
}

// POST /api/tempmail/create
router.post('/create', async (req,res)=>{
  const stat = incrementTempmail()
  if(!stat) return res.status(429).json({ success:false, message:'Limit 30/hari tempmail habis', left:0 })
  try{
    const email = await createMail()
    res.json({ success:true, email, domain: email.split('@')[1], left: stat.tempmailLeft, used: stat.tempmailUsed })
  }catch(e){
    res.status(500).json({ success:false, message:e.message })
  }
})

router.get('/create', async (req,res)=>{
  const stat = incrementTempmail()
  if(!stat) return res.status(429).json({ success:false, message:'Limit 30/hari tempmail habis', left:0 })
  try{
    const email = await createMail()
    res.json({ success:true, email, left: stat.tempmailLeft })
  }catch(e){
    res.status(500).json({ success:false, message:e.message })
  }
})

router.get('/generate', async (req,res)=>{
  const stat = incrementTempmail()
  if(!stat) return res.status(429).json({ success:false, message:'Limit 30/hari tempmail habis', left:0 })
  try{
    const email = await createMail()
    res.json({ success:true, email, left: stat.tempmailLeft })
  }catch(e){
    res.status(500).json({ success:false, message:e.message })
  }
})

router.get('/inbox', async (req,res)=>{
  try{
    const email = req.query.email
    if(!email) return res.json({ success:true, mails:[] })
    let data = await fetch(`${API_BASE}/inbox?email=${encodeURIComponent(email)}`, {
      headers:{ 'x-apikey': API_KEY }
    }).then(r=>r.json()).catch(async()=>{
      return await fetch(`${API_BASE}/messages?email=${encodeURIComponent(email)}`, {
        headers:{ 'x-apikey': API_KEY }
      }).then(r=>r.json())
    })
    res.json({ success:true, mails: data.messages || data.data || data.mails || data || [] })
  }catch(e){ res.json({ success:true, mails:[] }) }
})

router.get('/messages', async (req,res)=>{
  try{
    const email = req.query.email
    let data = await fetch(`${API_BASE}/inbox?email=${encodeURIComponent(email)}`, {
      headers:{ 'x-apikey': API_KEY }
    }).then(r=>r.json())
    res.json({ success:true, mails: data.messages || data.data || data.mails || [] })
  }catch{ res.json({ success:true, mails:[] }) }
})

module.exports = router