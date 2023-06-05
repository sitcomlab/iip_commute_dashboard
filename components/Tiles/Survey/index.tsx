'use client'

import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import { animated, useTransition } from '@react-spring/web'
import { BaseTile } from '../Base/BaseTile'
import SurveyAnswer, { SurveyAnswerProps } from './Answer'
import { ID } from '@directus/sdk'

export type SurveyTileProps = {
  question: string
  answer: SurveyAnswerProps
  id: string | ID
}
export default function SurveyTile({ question, answer, id }: SurveyTileProps) {
  const [showAnswer, setShowAnswer] = useState(false)

  const transitions = useTransition(showAnswer, {
    from: { opacity: 0, y: 80 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 80 },
    initial: { opacity: 0, y: 0 },
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
    <BaseTile
      embedId={`survey-${id}`}
      footerCenterElement={RevealAnswerButton}
      variant="secondary"
    >
      <div className="text-white">
        <Title as="h5" font={'normal'} variant={'inverse'}>
          <span className="font-semibold">Befragungsergebnisse:</span>{' '}
          Bürger*innenumfrage
        </Title>
        <Spacer />
        <div className="relative h-fit">
          <div className="opacity-0">
            <Title as="h3" variant={'inverse'}>
              {question}
            </Title>
          </div>
          {transitions((styles, renderAnswer) =>
            renderAnswer ? (
              <SurveyAnswer {...answer} {...styles} />
            ) : (
              <animated.div
                className="absolute left-0 top-0 h-full w-full"
                style={styles}
              >
                <Title as="h3" variant={'inverse'}>
                  {question}
                </Title>
              </animated.div>
            ),
          )}
        </div>
      </div>
    </BaseTile>
  )
}
