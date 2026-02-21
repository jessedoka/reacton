'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
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
import Lightning from '../public/icons8-lightning-bolt-96.png'
import Refresh from '../public/icons8-refresh-480.png'
import { getStoredScores, setStoredScores } from '../utils/localStorage'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Reactionbox() {
  const [scores, setScores] = useState([])
  const [tries, setTries] = useState(0)
  const [lastScore, setLastScore] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | waiting | go | reacted
  const timerStartRef = useRef(0)
  const timeoutRef = useRef(null)
  const [currentResult, setCurrentResult] = useState(null)

  useEffect(() => {
    const stored = getStoredScores()
    setScores(stored.prev)
    setTries(stored.tries)
  }, [])

  const save = useCallback((newScores, newTries) => {
    setStoredScores({ prev: newScores, tries: newTries })
  }, [])

  const handleStart = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('waiting')
    const delay = 1500 + Math.random() * 2500
    timeoutRef.current = setTimeout(() => {
      timerStartRef.current = Date.now()
      setPhase('go')
    }, delay)
  }, [phase])

  const handleClick = useCallback(() => {
    if (phase === 'go') {
      const reactionTime = Date.now() - timerStartRef.current
      const newScores = [...scores, reactionTime]
      setScores(newScores)
      setCurrentResult(reactionTime)
      setPhase('reacted')
      save(newScores, tries)
    }
  }, [phase, scores, tries, save])

  const handleReset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const newTries = tries + 1
    setLastScore(currentResult)
    setCurrentResult(null)
    setTries(newTries)
    setPhase('idle')
    save(scores, newTries)
  }, [tries, currentResult, scores, save])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const bgClass =
    phase === 'reacted' ? 'bg-accent-cyan'
    : phase === 'go' ? 'bg-accent-green'
    : phase === 'waiting' ? 'bg-accent-red'
    : 'bg-card'

  const labels = scores.map((_, i) => i)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Reaction Time (ms)',
        fill: false,
        tension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(78, 172, 207, 100)',
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

  const disabled = phase === 'waiting' || phase === 'reacted'

  return (
    <div>
      <div className="flex items-center flex-col">
        <button
          disabled={disabled}
          className={`${bgClass} w-full max-w-[50rem] h-[55vh] sm:h-[32rem] rounded-md flex items-center justify-center`}
          onClick={phase === 'go' ? handleClick : handleStart}
        >
          {phase === 'idle' && (
            <Image className="hover:animate-wiggle" src={Lightning} alt="Lightning Symbol" />
          )}
        </button>
        <div className="flex m-5 gap-4 sm:gap-10 flex-wrap justify-center">
          <div className="bg-card rounded-md h-[4rem] w-full sm:w-[15rem] flex items-center justify-center">
            {lastScore ? lastScore + 'ms' : '-'}
          </div>
          <div className="bg-card rounded-md h-[4rem] w-full sm:w-[15rem] flex items-center justify-center">
            {phase === 'reacted' && currentResult ? currentResult + 'ms' : '-'}
          </div>
          <button
            className="w-full sm:w-[15rem] h-[4rem] bg-card rounded-md hover:bg-sky-500 ease-in-out duration-300 flex items-center justify-center"
            onClick={handleReset}
          >
            <Image width={30} height={30} src={Refresh} alt="Refresh Symbol" />
          </button>
        </div>
        <div className="hidden sm:block w-full max-w-[50rem] pt-4 px-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}
