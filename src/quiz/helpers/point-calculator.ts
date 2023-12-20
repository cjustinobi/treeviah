import { Injectable } from '@nestjs/common'

@Injectable()
export class PointCalculator {
  calculatePoints(responseTime: number, maxResponseTime: number): number {
    const maxPoints = 1000

    if (responseTime <= maxResponseTime) {
      return Math.round((1 - responseTime / maxResponseTime) * maxPoints)
    } else {
      return 0
    }
  }
}
