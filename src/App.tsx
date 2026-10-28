import type { Goal } from './types'
import { sampleGoals } from './sampleGoals'
import GoalCard from './components/GoalCard'
import AddGoalForm from './components/AddGoalForm'
import { useLocalStorage } from './useLocalStorage'

function App() {
  const [goals, setGoals] = useLocalStorage<Goal[]>('savings-goals', sampleGoals)
  // ...the rest stays the same

  function handleAddMoney(id: string, amount: number) {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === id
          ? { ...goal, savedAmount: goal.savedAmount + amount }
          : goal,
      ),
    )
  }

  function handleAddGoal(newGoal: Omit<Goal, 'id' | 'savedAmount'>) {
    const goal: Goal = {
      ...newGoal,
      id: crypto.randomUUID(),
      savedAmount: 0,
    }
    setGoals((current) => [...current, goal])
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-pink-500">
        🐷 My Savings Goals
      </h1>

      <div className="mx-auto max-w-md space-y-4">
        <AddGoalForm onAddGoal={handleAddGoal} />

        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onAddMoney={handleAddMoney} />
        ))}
      </div>
    </div>
  )
}

export default App