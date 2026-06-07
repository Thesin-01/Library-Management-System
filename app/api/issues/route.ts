import { NextRequest, NextResponse } from 'next/server'
import { getIssues, issueBook, returnBook } from '@/lib/db'

export async function GET() {
  const issues = getIssues()
  return NextResponse.json({ issues })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = issueBook(body)
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json({ issue: result }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const result = returnBook(body.issue_id)
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 404 })
  }
  return NextResponse.json({ fine: result.fine, days_overdue: result.days_overdue })
}
