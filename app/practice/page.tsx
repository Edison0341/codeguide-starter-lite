"use client"

import { useState, useEffect } from 'react'
import { PauseIcon, PlayIcon, SettingsIcon } from 'lucide-react'
import { Navbar } from '@/components/nav/navbar'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

const sampleQuestions: Question[] = Array(31).fill(null).map((_, index) => ({
  id: index + 1,
  question: "Sample ASVAB question text will go here. This is question " + (index + 1),
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option A"
}))

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showAnswered, setShowAnswered] = useState(true)
  const [showUnanswered, setShowUnanswered] = useState(true)
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (!isPaused) {
      timer = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPaused])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex pt-16">
        {/* Left Sidebar */}
        <div className="w-64 border-r p-4 bg-white dark:bg-gradient-to-b dark:from-white dark:to-black">
          <h2 className="font-bold mb-4 dark:text-black dark:text-opacity-100">Filters</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2 dark:text-black dark:text-opacity-100">Sections</h3>
            <label className="flex items-center mb-2 dark:text-black dark:text-opacity-100">
              <input type="checkbox" className="mr-2" defaultChecked />
              Practice Test
            </label>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2 dark:text-black dark:text-opacity-100">Answers</h3>
            <label className="flex items-center mb-2 dark:text-black dark:text-opacity-100">
              <input 
                type="checkbox" 
                className="mr-2"
                checked={showAnswered}
                onChange={(e) => setShowAnswered(e.target.checked)}
              />
              Answered
            </label>
            <label className="flex items-center dark:text-black dark:text-opacity-100">
              <input 
                type="checkbox" 
                className="mr-2"
                checked={showUnanswered}
                onChange={(e) => setShowUnanswered(e.target.checked)}
              />
              Unanswered
            </label>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2 dark:text-black dark:text-opacity-100">Questions</h3>
            <div className="grid grid-cols-6 gap-1">
              {Array(31).fill(null).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`p-2 text-center text-sm ${
                    currentQuestion === index 
                      ? 'bg-blue-500 text-white' 
                      : answers[index] 
                        ? 'bg-gray-200 dark:bg-gray-700' 
                        : 'bg-gray-100 dark:bg-gray-800'
                  } hover:bg-blue-200 dark:hover:bg-blue-700`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 dark:bg-gradient-to-b dark:from-black dark:to-gray-900 dark:text-white">
          <div className="max-w-4xl mx-auto">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                  {formatTime(time)}
                </span>
                <button 
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  aria-label={isPaused ? "Resume test" : "Pause test"}
                >
                  {isPaused ? (
                    <PlayIcon size={20} />
                  ) : (
                    <PauseIcon size={20} />
                  )}
                </button>
              </div>

              <div className="text-center">
                Practice Test - Question {currentQuestion + 1} (1 of 31)
              </div>
            </div>

            {/* Question Content */}
            <div className="bg-gray-50 dark:bg-gradient-to-r dark:from-gray-900 dark:to-black p-6 rounded-lg mb-6">
              <p className="text-lg mb-6">{sampleQuestions[currentQuestion].question}</p>
              
              <div className="space-y-3">
                {sampleQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion]: option }))}
                    className={`w-full text-left p-3 rounded ${
                      answers[currentQuestion] === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center">
              <div className="space-x-4">
                <button className="text-blue-500 dark:text-blue-400 hover:underline">Report an error</button>
              </div>

              <div className="space-x-4">
                <button
                  onClick={() => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1)}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Finish
                </button>
                <button
                  onClick={() => currentQuestion < 30 && setCurrentQuestion(prev => prev + 1)}
                  disabled={currentQuestion === 30}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
