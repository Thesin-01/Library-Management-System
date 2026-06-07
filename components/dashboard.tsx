'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Users, BookCopy, AlertTriangle, Clock, ArrowRight } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Stats, IssueWithDetails } from '@/lib/db'

interface StatCard {
  label: string
  value: number
  icon: React.ElementType
  gradient: string
  glowColor: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [issues, setIssues] = useState<IssueWithDetails[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, issuesRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/issues'),
        ])
        const statsData = await statsRes.json()
        const issuesData = await issuesRes.json()
        setStats(statsData)
        setIssues(issuesData.issues || [])
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards: StatCard[] = stats
    ? [
        {
          label: 'Total Books',
          value: stats.totalBooks,
          icon: BookOpen,
          gradient: 'from-indigo-500 to-blue-500',
          glowColor: 'shadow-indigo-500/20',
        },
        {
          label: 'Total Members',
          value: stats.totalMembers,
          icon: Users,
          gradient: 'from-violet-500 to-purple-500',
          glowColor: 'shadow-violet-500/20',
        },
        {
          label: 'Current Issues',
          value: stats.currentIssues,
          icon: BookCopy,
          gradient: 'from-amber-500 to-orange-500',
          glowColor: 'shadow-amber-500/20',
        },
        {
          label: 'Overdue Books',
          value: stats.overdueBooks,
          icon: AlertTriangle,
          gradient: 'from-rose-500 to-pink-500',
          glowColor: 'shadow-rose-500/20',
        },
      ]
    : []

  const recentIssues = issues.slice(0, 5)
  const overdueIssues = issues.filter(
    (i) => !i.return_date && i.days_overdue > 0
  )

  function getStatusBadge(issue: IssueWithDetails) {
    if (issue.return_date) {
      return <Badge variant="success">Returned</Badge>
    }
    if (issue.days_overdue > 0) {
      return <Badge variant="danger">Overdue</Badge>
    }
    return <Badge variant="warning">Active</Badge>
  }

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-10 w-64 bg-white/[0.06] rounded-xl animate-pulse" />
          <div className="h-5 w-96 bg-white/[0.04] rounded-lg animate-pulse" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-36 bg-white/[0.04] rounded-2xl animate-pulse border border-white/[0.06]"
            />
          ))}
        </div>

        {/* Recent activity skeleton */}
        <div className="h-80 bg-white/[0.04] rounded-2xl animate-pulse border border-white/[0.06]" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-400 text-lg">
          Welcome to Library Management System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card
              key={card.label}
              className={cn(
                'group relative overflow-hidden border-white/[0.06] bg-white/[0.02] backdrop-blur-xl',
                'hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500',
                'hover:shadow-xl',
                card.glowColor
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                      {card.label}
                    </p>
                    <p className="text-4xl font-bold text-white tabular-nums">
                      {card.value.toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={cn(
                      'relative rounded-xl p-3 bg-gradient-to-br',
                      card.gradient,
                      'shadow-lg group-hover:scale-110 transition-transform duration-300'
                    )}
                  >
                    <div
                      className={cn(
                        'absolute inset-0 rounded-xl bg-gradient-to-br opacity-40 blur-xl',
                        card.gradient
                      )}
                    />
                    <Icon className="relative h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
          <CardHeader className="border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5 text-indigo-400" />
                Recent Activity
              </CardTitle>
              <span className="text-xs text-slate-500 uppercase tracking-wider">
                Last 5 issues
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentIssues.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <BookCopy className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p>No recent activity</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {recentIssues.map((issue) => (
                  <div
                    key={issue.issue_id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-indigo-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {issue.book_title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {issue.member_name} •{' '}
                          {formatDate(issue.issue_date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {getStatusBadge(issue)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Overdue Alert */}
        <Card
          className={cn(
            'border-white/[0.06] bg-white/[0.02] backdrop-blur-xl',
            overdueIssues.length > 0 && 'border-l-4 border-l-rose-500'
          )}
        >
          <CardHeader className="border-b border-white/[0.06]">
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle
                className={cn(
                  'h-5 w-5',
                  overdueIssues.length > 0
                    ? 'text-rose-400'
                    : 'text-emerald-400'
                )}
              />
              {overdueIssues.length > 0 ? 'Overdue Alerts' : 'All Clear!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {overdueIssues.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-sm">No overdue books</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {overdueIssues.map((issue) => (
                  <div
                    key={issue.issue_id}
                    className="px-6 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {issue.book_title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {issue.member_name}
                        </p>
                        <p className="text-xs text-rose-400/80 mt-1">
                          {issue.days_overdue} days overdue
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-semibold">
                          ₹{issue.fine_amount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
