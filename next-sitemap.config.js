/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || 'https://pastekey.netlify.app',
  generateRobotsTxt: true,
}
