import { NextRequest, NextResponse } from 'next/server'
import { getMembers, addMember, updateMember, deleteMember } from '@/lib/db'

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') || undefined
  const members = getMembers(search)
  return NextResponse.json({ members })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const member = addMember(body)
  return NextResponse.json({ member }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { member_id, ...data } = body
  const member = updateMember(member_id, data)
  if (!member) return NextResponse.json({ error: 'Member not found' }, { status: 404 })
  return NextResponse.json({ member })
}

export async function DELETE(request: NextRequest) {
  const body = await request.json()
  const success = deleteMember(body.member_id)
  if (!success) return NextResponse.json({ error: 'Member not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
