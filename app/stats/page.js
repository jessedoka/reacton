'use client'

import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { getStoredScores } from '../../utils/localStorage'
import Image from 'next/image'
import Gold from '../../public/icons8-gold-medal-96.png'
import Silver from '../../public/icons8-medal-second-place-96.png'
import Bronze from '../../public/icons8-bronze-medal-96.png'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function StatsPage() {
  const [scores, setScores] = useState([])
  const [tries, setTries] = useState(0)

  useEffect(() => {
    const stored = getStoredScores()
    setScores(stored.prev)
    setTries(stored.tries)
  }, [])

  const best = scores.length > 0 ? Math.min(...scores) : null
  const average = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
  const sorted = [...scores].sort((a, b) => a - b)
  const top3 = sorted.slice(0, 3)

  const labels = scores.map((_, i) => i + 1)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Reaction Time (ms)',
        fill: false,
        tension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(78, 172, 207, 1)',
        borderWidth: 2,
        data: scores,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      title: { display: false },
      legend: { display: false },
    },
  }

  const medals = [Gold, Silver, Bronze]

  if (scores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-12">
        <div className="bg-card p-8 rounded-md">
          <p className="text-xl mb-2">No scores yet</p>
          <p className="text-gray-400">Go to the Test page and start clicking!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-4 sm:my-8 w-full max-w-[50rem]">
        <div className="bg-card rounded-md p-6 text-center">
          <p className="text-gray-400 text-sm mb-1">Best Time</p>
          <p className="text-3xl font-medium text-accent-green">{best}ms</p>
        </div>
        <div className="bg-card rounded-md p-6 text-center">
          <p className="text-gray-400 text-sm mb-1">Average</p>
          <p className="text-3xl font-medium text-accent-cyan">{average}ms</p>
        </div>
        <div className="bg-card rounded-md p-6 text-center">
          <p className="text-gray-400 text-sm mb-1">Total Tries</p>
          <p className="text-3xl font-medium">{tries}</p>
        </div>
      </div>

      {top3.length > 0 && (
        <div className="bg-card rounded-md p-6 w-full max-w-[50rem] mb-4 sm:mb-8">
          <h3 className="text-lg font-medium mb-4 text-center">Top Scores</h3>
          <div className="flex flex-col gap-3">
            {top3.map((score, i) => (
              <div key={i} className="flex items-center gap-4 justify-center">
                <Image src={medals[i]} alt={`#${i + 1}`} width={32} height={32} />
                <span className="text-xl">{score}ms</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-[50rem] pt-4 px-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
