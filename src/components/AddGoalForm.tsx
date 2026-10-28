import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Goal } from '../types'

interface AddGoalFormProps {
  onAddGoal: (goal: Omit<Goal, 'id' | 'savedAmount'>) => void
}

function AddGoalForm({ onAddGoal }: AddGoalFormProps) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🎯')
  const [target, setTarget] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const targetAmount = Number(target)
    if (!name.trim() || targetAmount <= 0) return

    onAddGoal({
      name: name.trim(),
      emoji: emoji.trim() || '🎯',
      targetAmount,
    })

    setName('')
    setEmoji('🎯')
    setTarget('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-5 shadow-md"
    >
      <h2 className="mb-3 text-lg font-semibold text-gray-800">
        ✨ New goal
      </h2>

      <div className="flex gap-2">
        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          maxLength={2}
          aria-label="Emoji"
          className="w-14 rounded-xl border border-pink-200 px-2 py-2 text-center text-sm outline-none focus:border-pink-400"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Goal name"
          className="w-full rounded-xl border border-pink-200 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
      </div>

      <div className="mt-2 flex gap-2">
        <input
          type="number"
          min="0"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target amount"
          className="w-full rounded-xl border border-pink-200 px-3 py-2 text-sm outline-none focus:border-pink-400"
        />
        <button
          type="submit"
          className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 active:scale-95"
        >
          Create
        </button>
      </div>
    </form>
  )
}

export default AddGoalForm