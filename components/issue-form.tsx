'use client'

import { useState, useEffect } from 'react'
import {
  BookCopy,
  BookOpen,
  Users,
  Calendar,
  RotateCcw,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  IndianRupee,
  Hash,
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Book, Member, IssueWithDetails } from '@/lib/db'

type Tab = 'issue' | 'all'

export default function IssueForm() {
  const [activeTab, setActiveTab] = useState<Tab>('issue')
  const [books, setBooks] = useState<Book[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [issues, setIssues] = useState<IssueWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [returningId, setReturningId] = useState<number | null>(null)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const [form, setForm] = useState({
    book_id: '',
    member_id: '',
    librarian_id: '1',
    due_date: '',
  })

  async function fetchAll() {
    try {
      setLoading(true)
      const [booksRes, membersRes, issuesRes] = await Promise.all([
        fetch('/api/books'),
        fetch('/api/members'),
        fetch('/api/issues'),
      ])
      const booksData = await booksRes.json()
      const membersData = await membersRes.json()
      const issuesData = await issuesRes.json()

      setBooks(booksData.books || [])
      setMembers(membersData.members || [])
      setIssues(issuesData.issues || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  function clearMessage() {
    setTimeout(() => setMessage(null), 5000)
  }

  async function handleIssueBook(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: Number(form.book_id),
          member_id: Number(form.member_id),
          librarian_id: Number(form.librarian_id),
          due_date: form.due_date,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: 'success', text: 'Book issued successfully!' })
        setForm({ book_id: '', member_id: '', librarian_id: '1', due_date: '' })
        fetchAll()
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to issue book',
        })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
      clearMessage()
    }
  }

  async function handleReturn(issueId: number) {
    setReturningId(issueId)
    setMessage(null)

    try {
      const res = await fetch('/api/issues', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue_id: issueId }),
      })

      const data = await res.json()

      if (res.ok) {
        const fineText =
          data.days_overdue > 0
            ? `Book returned. Fine: ₹${data.fine} (${data.days_overdue} days overdue)`
            : 'Book returned successfully! No fine.'
        setMessage({ type: 'success', text: fineText })
        fetchAll()
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to return book',
        })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setReturningId(null)
      clearMessage()
    }
  }

  function getStatusBadge(issue: IssueWithDetails) {
    if (issue.return_date) {
      return <Badge variant="success">Returned</Badge>
    }
    if (issue.days_overdue > 0) {
      return <Badge variant="danger">Overdue</Badge>
    }
    return <Badge variant="warning">Active</Badge>
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'issue', label: 'Issue Book', icon: Send },
    { id: 'all', label: 'All Issues', icon: BookCopy },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
          Issue & Return Management
        </h1>
        <p className="text-slate-400">
          Issue books to members and manage returns
        </p>
      </div>

      {/* Message Toast */}
      {message && (
        <div
          className={cn(
            'flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl animate-in slide-in-from-top-2 duration-300',
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
          )}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-white/[0.1] text-white shadow-inner shadow-white/[0.05]'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-white/[0.04]'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4',
                  activeTab === tab.id && 'text-amber-400'
                )}
              />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Issue Book Tab */}
      {activeTab === 'issue' && (
        <Card className="border-white/[0.06] bg-white/[0.02] backdrop-blur-xl max-w-2xl">
          <CardHeader className="border-b border-white/[0.06]">
            <CardTitle className="flex items-center gap-2 text-white">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Send className="h-5 w-5 text-amber-400" />
              </div>
              Issue a New Book
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-24 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-10 w-full bg-white/[0.06] rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleIssueBook} className="space-y-6">
                {/* Book Select */}
                <div className="space-y-2">
                  <Label htmlFor="book" className="text-slate-300 flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                    Select Book
                  </Label>
                  <select
                    id="book"
                    value={form.book_id}
                    onChange={(e) =>
                      setForm({ ...form, book_id: e.target.value })
                    }
                    required
                    className="w-full h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.25em 1.25em',
                    }}
                  >
                    <option value="" className="bg-slate-900">
                      Choose a book...
                    </option>
                    {books.map((book) => (
                      <option
                        key={book.book_id}
                        value={book.book_id}
                        disabled={book.available_copies === 0}
                        className="bg-slate-900"
                      >
                        {book.title} ({book.available_copies} copies available)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Member Select */}
                <div className="space-y-2">
                  <Label htmlFor="member" className="text-slate-300 flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-violet-400" />
                    Select Member
                  </Label>
                  <select
                    id="member"
                    value={form.member_id}
                    onChange={(e) =>
                      setForm({ ...form, member_id: e.target.value })
                    }
                    required
                    className="w-full h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.25em 1.25em',
                    }}
                  >
                    <option value="" className="bg-slate-900">
                      Choose a member...
                    </option>
                    {members.map((member) => (
                      <option
                        key={member.member_id}
                        value={member.member_id}
                        className="bg-slate-900"
                      >
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Librarian ID */}
                <div className="space-y-2">
                  <Label htmlFor="librarian" className="text-slate-300 flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5 text-emerald-400" />
                    Librarian ID
                  </Label>
                  <Input
                    id="librarian"
                    type="number"
                    min="1"
                    value={form.librarian_id}
                    onChange={(e) =>
                      setForm({ ...form, librarian_id: e.target.value })
                    }
                    required
                    className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-amber-500/50"
                  />
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label htmlFor="due_date" className="text-slate-300 flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" />
                    Due Date
                  </Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={form.due_date}
                    onChange={(e) =>
                      setForm({ ...form, due_date: e.target.value })
                    }
                    required
                    className="bg-white/[0.04] border-white/[0.08] text-white focus:border-amber-500/50 [color-scheme:dark]"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 text-base font-semibold"
                >
                  {submitting ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  Issue Book
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Issues Tab */}
      {activeTab === 'all' && (
        <Card className="border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.04]"
                  >
                    <div className="h-4 w-8 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-4 w-36 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-4 w-28 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-4 w-20 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-4 w-20 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-4 w-16 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-4 w-16 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-8 w-20 bg-white/[0.06] rounded animate-pulse ml-auto" />
                  </div>
                ))}
              </div>
            ) : issues.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <BookCopy className="h-12 w-12 mb-4 opacity-40" />
                <p className="text-lg font-medium">No issues recorded</p>
                <p className="text-sm mt-1">
                  Issue your first book to get started
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/[0.06] hover:bg-transparent">
                      <TableHead className="text-slate-400 font-semibold">ID</TableHead>
                      <TableHead className="text-slate-400 font-semibold">Book</TableHead>
                      <TableHead className="text-slate-400 font-semibold">Member</TableHead>
                      <TableHead className="text-slate-400 font-semibold">Issue Date</TableHead>
                      <TableHead className="text-slate-400 font-semibold">Due Date</TableHead>
                      <TableHead className="text-slate-400 font-semibold">Return Date</TableHead>
                      <TableHead className="text-slate-400 font-semibold text-center">Status</TableHead>
                      <TableHead className="text-slate-400 font-semibold text-center">Fine</TableHead>
                      <TableHead className="text-slate-400 font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issues.map((issue) => (
                      <TableRow
                        key={issue.issue_id}
                        className={cn(
                          'border-white/[0.04] hover:bg-white/[0.03] transition-colors',
                          !issue.return_date &&
                            issue.days_overdue > 0 &&
                            'bg-rose-500/[0.03]'
                        )}
                      >
                        <TableCell className="text-slate-500 font-mono text-sm">
                          #{issue.issue_id}
                        </TableCell>
                        <TableCell className="text-white font-medium">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                            <span className="truncate max-w-[180px]">
                              {issue.book_title}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {issue.member_name}
                        </TableCell>
                        <TableCell className="text-slate-400 tabular-nums">
                          {formatDate(issue.issue_date)}
                        </TableCell>
                        <TableCell className="text-slate-400 tabular-nums">
                          {formatDate(issue.due_date)}
                        </TableCell>
                        <TableCell className="text-slate-400 tabular-nums">
                          {issue.return_date
                            ? formatDate(issue.return_date)
                            : '—'}
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(issue)}
                        </TableCell>
                        <TableCell className="text-center">
                          {!issue.return_date && issue.days_overdue > 0 ? (
                            <span className="inline-flex items-center gap-1 text-rose-400 text-sm font-semibold">
                              <IndianRupee className="h-3 w-3" />
                              {issue.fine_amount}
                            </span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {!issue.return_date && (
                            <Button
                              size="sm"
                              onClick={() => handleReturn(issue.issue_id)}
                              disabled={returningId === issue.issue_id}
                              className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200"
                            >
                              {returningId === issue.issue_id ? (
                                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                              ) : (
                                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                              )}
                              Return
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
