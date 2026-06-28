import { PrismaClient } from '@prisma/client'
export const dynamic = 'force-dynamic'
const prisma = new PrismaClient()

export default async function AdminPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '40px', fontFamily: 'Inter, sans-serif', color: '#F1F5F9' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
        <span style={{ color: '#00FF94' }}>&lt;</span>Admin<span style={{ color: '#00FF94' }}>/&gt;</span>
      </h1>
      <p style={{ color: '#64748B', marginBottom: 40 }}>Contact form мэссэжүүд</p>

      {messages.length === 0 ? (
        <div style={{ color: '#475569', textAlign: 'center', marginTop: 80 }}>Одоогоор мэссэж байхгүй байна</div>
      ) : (
        <div style={{ display: 'grid', gap: 16, maxWidth: 800 }}>
          {messages.map((m) => (
            <div key={m.id} style={{
              background: '#0F172A', border: '1px solid #1E293B',
              borderRadius: 12, padding: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{m.name}</span>
                  <span style={{ color: '#00FF94', fontSize: 13, marginLeft: 12 }}>{m.email}</span>
                </div>
                <span style={{ color: '#475569', fontSize: 12 }}>
                  {new Date(m.createdAt).toLocaleDateString('mn-MN')}
                </span>
              </div>
              <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}