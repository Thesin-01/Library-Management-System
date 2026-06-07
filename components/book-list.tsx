'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  BookOpen,
  X,
  Loader2,
  PackageOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import type { Book } from '@/lib/db'

const emptyForm = {
  title: '',
  author: '',
  publisher: '',
  year_of_publication: '',
  available_copies: '',
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function fetchBooks() {
    try {
      setLoading(true)
      const res = await fetch('/api/books')
      const data = await res.json()
      setBooks(data.books || [])
    } catch (error) {
      console.error('Failed to fetch books:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.publisher.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function openAddDialog() {
    setEditingBook(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEditDialog(book: Book) {
    setEditingBook(book)
    setForm({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      year_of_publication: String(book.year_of_publication),
      available_copies: String(book.available_copies),
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const body = {
        ...(editingBook ? { book_id: editingBook.book_id } : {}),
        title: form.title,
        author: form.author,
        publisher: form.publisher,
        year_of_publication: Number(form.year_of_publication),
        available_copies: Number(form.available_copies),
      }

      const res = await fetch('/api/books', {
        method: editingBook ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setDialogOpen(false)
        setForm(emptyForm)
        setEditingBook(null)
        fetchBooks()
      }
    } catch (error) {
      console.error('Failed to save book:', error)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(bookId: number) {
    if (!confirm('Are you sure you want to delete this book?')) return

    try {
      const res = await fetch('/api/books', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book_id: bookId }),
      })

      if (res.ok) {
        fetchBooks()
      }
    } catch (error) {
      console.error('Failed to delete book:', error)
    }
  }

  function getCopiesBadge(copies: number) {
    if (copies === 0) return <Badge variant="danger">0</Badge>
    if (copies <= 2) return <Badge variant="warning">{copies}</Badge>
    return <Badge variant="success">{copies}</Badge>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
            Books Management
          </h1>
          <p className="text-slate-400">
            Manage your library&apos;s book collection
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search books by title, author, or publisher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-500 rounded-xl focus:border-indigo-500/50 focus:ring-indigo-500/20"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Books Table */}
      <Card className="border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="space-y-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.04]"
                >
                  <div className="h-4 w-10 bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-4 w-48 bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-4 w-32 bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-4 w-32 bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-4 w-12 bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-4 w-12 bg-white/[0.06] rounded animate-pulse" />
                  <div className="flex gap-2 ml-auto">
                    <div className="h-8 w-8 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-8 w-8 bg-white/[0.06] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <PackageOpen className="h-12 w-12 mb-4 opacity-40" />
              <p className="text-lg font-medium">No books found</p>
              <p className="text-sm mt-1">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Add your first book to get started'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-slate-400 font-semibold">ID</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Title</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Author</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Publisher</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Year</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-center">Copies</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow
                    key={book.book_id}
                    className="border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                  >
                    <TableCell className="text-slate-500 font-mono text-sm">
                      #{book.book_id}
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                        {book.title}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{book.author}</TableCell>
                    <TableCell className="text-slate-400">{book.publisher}</TableCell>
                    <TableCell className="text-slate-400 tabular-nums">
                      {book.year_of_publication}
                    </TableCell>
                    <TableCell className="text-center">
                      {getCopiesBadge(book.available_copies)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditDialog(book)}
                          className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-200"
                          title="Edit book"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(book.book_id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
                          title="Delete book"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-2xl border-white/[0.08] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <BookOpen className="h-5 w-5 text-indigo-400" />
              </div>
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Enter book title"
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-indigo-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-slate-300">Author</Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                required
                placeholder="Enter author name"
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-indigo-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-slate-300">Publisher</Label>
              <Input
                id="publisher"
                value={form.publisher}
                onChange={(e) => setForm({ ...form, publisher: e.target.value })}
                placeholder="Enter publisher name"
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-indigo-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-slate-300">Year of Publication</Label>
                <Input
                  id="year"
                  type="number"
                  value={form.year_of_publication}
                  onChange={(e) =>
                    setForm({ ...form, year_of_publication: e.target.value })
                  }
                  placeholder="e.g. 2024"
                  className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="copies" className="text-slate-300">Available Copies</Label>
                <Input
                  id="copies"
                  type="number"
                  min="0"
                  value={form.available_copies}
                  onChange={(e) =>
                    setForm({ ...form, available_copies: e.target.value })
                  }
                  required
                  placeholder="e.g. 5"
                  className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-indigo-500/50"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-white/[0.06]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25"
              >
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingBook ? 'Update Book' : 'Add Book'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
