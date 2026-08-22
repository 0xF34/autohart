import { redirect } from 'next/navigation'

export default function ToolRedirectPage({
  params,
}: {
  params: { tool: string }
}) {
  redirect('/login')
}
