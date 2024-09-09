'use client'

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion } from 'framer-motion';

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const rest = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')} : ${rest.toString().padStart(2, '0')}`;
}

export default function Timer() {
    const [time, setTime] = useState(0);
    const [timerState, setTimerState] = useState<'stop' | 'play'>('stop');

    useEffect(() => {
        if (timerState === 'stop') return;

        const interval = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timerState]);

    function stopTimer() {
        setTimerState('stop');
        setTime(0);
    }

    return (
        <div>
            <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={'fixed z-20 top-0 right-0 p-3 w-[6rem]'}
            >
                <AnimatePresence mode={'wait'}>
                    {timerState === 'stop' ? (
                        <motion.div
                            key="stopped"
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Clock className={'ml-auto absolute top-3 right-3'} onClick={() => setTimerState('play')} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="playing"
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: {delay: 0.4} }}
                            transition={{ duration: 0.2 }}
                        >
                            <AiOutlineClose size={25} className={'ml-auto'} onClick={stopTimer} />
                            <p className={'text-xl w-[5rem] absolute top-14 right-5'}>{formatTime(time)}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <motion.div
                className={'-z-10 bg-secondary rounded-full fixed top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem]'}
                initial={false}
                exit={{ width: 0, height: 0 }}
                animate={{
                    width: timerState === 'play' ? '20rem' : 0,
                    height: timerState === 'play' ? '20rem' : 0,
                }}
            />

        </div>
    );
}
