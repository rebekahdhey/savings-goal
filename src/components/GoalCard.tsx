import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Goal } from '../types'
import { formatMoney, getPercent } from '../utils'

interface GoalCardProps {
  goal: Goal
  onAddMoney: (id: string, amount: number) => void
}

function GoalCard({ goal, onAddMoney }: GoalCardProps) {
  const [amount, setAmount] = useState('')
  const percent = getPercent(goal.savedAmount, goal.targetAmount)
  const isDone = percent === 100

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const amountToAdd = Number(amount)
    if (amountToAdd <= 0) return

    onAddMoney(goal.id, amountToAdd)
    setAmount('')
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          {goal.emoji} {goal.name}
        </h2>
        <span className="text-sm font-bold text-pink-500">
          {isDone ? '🎉 Done!' : `${percent}%`}
        </span>
      </div>

      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-pink-100">
        <div
          className="h-full rounded-full bg-pink-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {formatMoney(goal.savedAmount)} of {formatMoney(goal.targetAmount)}
      </p>

      {!isDone && (
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to add"
            aria-label="Amount to add"
            className="w-full rounded-xl border border-pink-200 px-3 py-2 text-sm outline-none focus:border-pink-400"
          />
          <button
            type="submit"
            className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95"
          >
            Add
          </button>
        </form>
      )}
    </div>
  )
}

export default GoalCard