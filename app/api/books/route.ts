import { NextRequest, NextResponse } from 'next/server'
import { getBooks, addBook, updateBook, deleteBook } from '@/lib/db'

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') || undefined
  const books = getBooks(search)
  return NextResponse.json({ books })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const book = addBook(body)
  return NextResponse.json({ book }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { book_id, ...data } = body
  const book = updateBook(book_id, data)
  if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 })
  return NextResponse.json({ book })
}

export async function DELETE(request: NextRequest) {
  const body = await request.json()
  const success = deleteBook(body.book_id)
  if (!success) return NextResponse.json({ error: 'Book not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
