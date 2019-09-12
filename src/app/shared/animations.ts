// animations.ts
import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
    unfoldDown: trigger('unfoldDown', [
        state('void', style({
            height: '0px'
        })),
        state('*', style({
            maxHeight: '400px',
            minHeight: '200px'
        })),
        transition('void <=> *', animate('0.3s cubic-bezier(.36,1.08,.3,.88)'))
    ]),
    slide: trigger('slide', [
        state('void', style({
            opacity: '0',
            transform: 'translateX(-5px)'
        })),
        state('*', style({
            opacity: '1',
            transform: 'translateX(0px)'
        })),
        transition('void => *', animate('0.3s cubic-bezier(.36,1.08,.3,.88)'))
    ]),
    notification: trigger('notification', [
        state('void', style({
            left: '-100%'
        })),
        state('*', style({
            left: '15px'
        })),
        transition('void <=> *', animate('0.2s cubic-bezier(.36,1.08,.3,.88)'))
    ]),
    rotateRightFade: trigger('rotateRightFade', [
        state('void', style({
            opacity: '0',
            transform: 'rotate(-180deg)',
            position: 'absolute'
        })),
        state('*', style({
            opacity: '1',
            transform: 'rotate(0deg)',
            position: 'absolute'
        })),
        transition('void => *', animate('200ms', style({
            opacity: '1',
            transform: 'rotate(0deg)'
        }))),
        transition('* => void', animate('200ms', style({
            opacity: '0',
            transform: 'rotate(180deg)'
        })))
    ])

}