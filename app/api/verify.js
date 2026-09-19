const express = require('express')
const auth = require('../../lib/alight')
const { friendlyFirebaseError } = require('../../lib/errors')
const { incrementStats, getStats } = require('../../lib/stats')

const router = express.Router()

router.post('/', async (req, res) => {
  const { email, magicLink, link } = req.body
  const finalLink = (magicLink || link || '').trim()
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'email wajib diisi.' })
  }
  if (!finalLink) {
    return res.status(400).json({ success: false, message: 'link dari email wajib diisi.' })
  }

  const em = email.trim().toLowerCase()
  console.log('[VERIFY]', em, finalLink.slice(0,80))

  const v = await auth.auth(em, finalLink)
  if (!v.ok) {
    return res.status(400).json({ success: false, message: friendlyFirebaseError(v.why), code: v.why })
  }

  const premium = await auth.pro(v.id)
  const stats = premium.ok ? incrementStats() : getStats()

  const now = new Date()
  const until = new Date()
  until.setFullYear(until.getFullYear() + 1)

  return res.json({
    success: true,
    message: premium.ok ? 'verifikasi berhasil, premium aktif.' : 'login berhasil, aktivasi premium gagal.',
    data: {
      stats: stats,
      uid: v.uid,
      email: v.user?.email || em,
      status: premium.ok ? 'ACTIVE' : 'INACTIVE',
      planName: 'Alight Motion Pro / Member',
      orderId: premium.order || null,
      validUntil: until.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
      idToken: v.id,
      refreshToken: v.ref,
      premiumResponse: premium.ok ? premium.r : null,
      premiumError: premium.ok ? null : premium.why,
    }
  })
})

module.exports = router