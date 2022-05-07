import { useState } from 'react';
import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG:{ 
    title: 'Issue',
    image: {
      source: bugImageUrl,
      alt: 'Bug Image'
    }

  },
  IDEA:{
    title: 'Idea',
    image: {
      source: ideaImageUrl,
      alt: 'Idea image'
    }
  },
  OTHER:{
    title: 'Other',
    image: {
      source: thoughtImageUrl,
      alt: 'Thinking cloud'
    }
  }}
export type AcceptedFeedbackTypes = keyof typeof feedbackTypes;

export function WidgetForm(){
  const [ feedbackType, setFeedbackType ] = useState<AcceptedFeedbackTypes | null>(null);
  const [ feedbackSent, setFeedbackSent ] = useState(false);
  
    function handleRestartFeedback(){
      setFeedbackType(null);
      setFeedbackSent(false);
      
    }
    return(
    <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
        { feedbackSent ? (
          <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
        ) : ( <>
        
          { !feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          
          ) : 
          
          ( <FeedbackContentStep 
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={()=>setFeedbackSent(true)}
              />)
          
          }
        
        </>)}


          <footer className='text-xs text-neutral-400'>
            Made with <span className='text-brand-500'>♥</span> by <a className='underline underline-offset-2' href='https://rocketseat.com.br'>Rocketseat</a>
          </footer>
    </div>
    );

};