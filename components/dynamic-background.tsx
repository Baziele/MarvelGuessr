"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface DynamicBackgroundProps {
  className?: string
}

export function DynamicBackground({ className }: DynamicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Make canvas full screen
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    // Wave parameters - using more subtle colors
    const waves = [
      { amplitude: 25, frequency: 0.005, speed: 0.001, color: "rgba(59, 130, 246, 0.03)", offset: 0 },
      { amplitude: 20, frequency: 0.015, speed: 0.002, color: "rgba(99, 102, 241, 0.03)", offset: Math.PI / 4 },
      { amplitude: 15, frequency: 0.01, speed: 0.0015, color: "rgba(139, 92, 246, 0.03)", offset: Math.PI / 2 },
      { amplitude: 18, frequency: 0.008, speed: 0.0012, color: "rgba(220, 38, 38, 0.02)", offset: Math.PI / 3 },
    ]

    let time = 0

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw each wave
      waves.forEach((wave) => {
        drawWave(ctx, canvas, wave, time)
      })

      time += 0.01
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  // Function to draw a single wave
  const drawWave = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    wave: {
      amplitude: number
      frequency: number
      speed: number
      color: string
      offset: number
    },
    time: number,
  ) => {
    const { amplitude, frequency, speed, color, offset } = wave

    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)

    // Draw wave across the canvas width
    for (let x = 0; x < canvas.width; x++) {
      // Create multiple overlapping sine waves for a more complex pattern
      const y =
        Math.sin(x * frequency + time * speed + offset) * amplitude +
        Math.sin(x * frequency * 0.5 + time * speed * 1.5) * amplitude * 0.5

      // Add a 3D effect by varying the y position based on distance from center
      const distanceFromCenter = Math.abs(x - canvas.width / 2) / (canvas.width / 2)
      const depthEffect = 1 - distanceFromCenter * 0.3 // Subtle depth effect

      // Draw multiple waves with slight vertical offsets for a 3D layered effect
      for (let i = 0; i < 5; i++) {
        const layerOffset = i * 10 * depthEffect
        ctx.lineTo(x, canvas.height / 2 + y * depthEffect + layerOffset)
      }
    }

    // Complete the wave path
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.closePath()

    // Fill the wave
    ctx.fillStyle = color
    ctx.fill()
  }

  return <canvas ref={canvasRef} className={cn("fixed top-0 left-0 w-full h-full -z-10", className)} />
}
