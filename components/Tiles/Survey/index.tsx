'use client'

import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import { animated, useTransition } from 'react-spring'
import { BaseTile } from '../Base/BaseTile'
import SurveyAnswer, { SurveyAnswerProps } from './Answer'

export type SurveyTileProps = {
  question: string
  answer: SurveyAnswerProps
}
export default function SurveyTile({ question, answer }: SurveyTileProps) {
  const [showAnswer, setShowAnswer] = useState(false)

  const transitions = useTransition(showAnswer, {
    from: { opacity: 0, y: 80 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 80 },
    initial: false,
  })

  const RevealAnswerButton = (
    <Button
      className="transition-all"
      onClick={() => setShowAnswer(!showAnswer)}
      variant={'inverse'}
    >
      {showAnswer ? 'zurück zur Frage' : 'Antwort aufdecken'}
    </Button>
  )
  return (
    <BaseTile footerCenterElement={RevealAnswerButton} variant="secondary">
      <div className="text-white">
        <p>
          <span className="font-semibold">Befragungsergebnisse:</span>{' '}
          Bürgerumfrage 2022
        </p>
        <Spacer />
        <div className="relative min-h-[12rem]">
          {transitions((styles, renderAnswer) =>
            renderAnswer ? (
              <SurveyAnswer {...answer} {...styles} />
            ) : (
              <animated.div className="absolute top-0 left-0" style={styles}>
                <Title variant={'inverse'}>{question}</Title>
              </animated.div>
            ),
          )}
        </div>
      </div>
    </BaseTile>
  )
}
