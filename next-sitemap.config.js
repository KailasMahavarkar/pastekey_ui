/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://pastekey.com',
  generateRobotsTxt: true,
  // ...other options
}
