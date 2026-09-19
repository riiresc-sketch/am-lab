const express = require('express')
const auth = require('../../lib/alight')
const { friendlyFirebaseError } = require('../../lib/errors')
const { incrementStats } = require('../../lib/stats')

const router = express.Router()

router.post('/', async (req, res) => {
  const { email } = req.body
  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ success: false, message: 'email gak valid.' })
  }
  const em = email.trim().toLowerCase()
  
  console.log('[SEND-LINK]', em)
  const r = await auth.link(em)
  
  if (!r.ok) {
    console.log('[SEND GAGAL]', r.why)
    return res.status(400).json({ success: false, message: friendlyFirebaseError(r.why), code: r.why })
  }

  incrementStats()
  return res.json({ success: true, email: em, message: `link dikirim ke ${em}. cek inbox / spam.` })
})

module.exports = router