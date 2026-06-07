'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  Mail,
  Phone,
  X,
  Loader2,
  UserX,
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
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
import type { Member } from '@/lib/db'

const emptyForm = {
  name: '',
  email: '',
  phone_number: '',
}

export default function MemberList() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function fetchMembers() {
    try {
      setLoading(true)
      const res = await fetch('/api/members')
      const data = await res.json()
      setMembers(data.members || [])
    } catch (error) {
      console.error('Failed to fetch members:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function openAddDialog() {
    setEditingMember(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEditDialog(member: Member) {
    setEditingMember(member)
    setForm({
      name: member.name,
      email: member.email,
      phone_number: member.phone_number,
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const body = {
        ...(editingMember ? { member_id: editingMember.member_id } : {}),
        name: form.name,
        email: form.email,
        phone_number: form.phone_number,
      }

      const res = await fetch('/api/members', {
        method: editingMember ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setDialogOpen(false)
        setForm(emptyForm)
        setEditingMember(null)
        fetchMembers()
      }
    } catch (error) {
      console.error('Failed to save member:', error)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(memberId: number) {
    if (!confirm('Are you sure you want to delete this member?')) return

    try {
      const res = await fetch('/api/members', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member_id: memberId }),
      })

      if (res.ok) {
        fetchMembers()
      }
    } catch (error) {
      console.error('Failed to delete member:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
            Members Management
          </h1>
          <p className="text-slate-400">
            Manage library members and their registrations
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search members by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-500 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20"
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

      {/* Members Table */}
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
                  <div className="h-4 w-40 bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-4 w-48 bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-4 w-28 bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-4 w-24 bg-white/[0.06] rounded animate-pulse" />
                  <div className="flex gap-2 ml-auto">
                    <div className="h-8 w-8 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-8 w-8 bg-white/[0.06] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <UserX className="h-12 w-12 mb-4 opacity-40" />
              <p className="text-lg font-medium">No members found</p>
              <p className="text-sm mt-1">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Add your first member to get started'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-slate-400 font-semibold">ID</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Name</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Email</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Phone</TableHead>
                  <TableHead className="text-slate-400 font-semibold">Joined Date</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow
                    key={member.member_id}
                    className="border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                  >
                    <TableCell className="text-slate-500 font-mono text-sm">
                      #{member.member_id}
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        {member.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                        {member.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                        {member.phone_number}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-400 tabular-nums">
                      {formatDate(member.membership_date)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditDialog(member)}
                          className="p-2 rounded-lg text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 transition-all duration-200"
                          title="Edit member"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.member_id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
                          title="Delete member"
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
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Users className="h-5 w-5 text-violet-400" />
              </div>
              {editingMember ? 'Edit Member' : 'Add New Member'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Full Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Enter full name"
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-violet-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="Enter email address"
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-violet-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
              <Input
                id="phone"
                value={form.phone_number}
                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                placeholder="Enter phone number"
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-violet-500/50"
              />
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
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25"
              >
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingMember ? 'Update Member' : 'Add Member'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
