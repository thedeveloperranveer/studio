import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 250 50"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('font-headline', props.className)}
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#00C6FF' }} />
          <stop offset="100%" style={{ stopColor: '#6E00FF' }} />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="36"
        fontWeight="bold"
        fill="url(#logo-gradient)"
        className="font-headline"
      >
        StudyJEET
      </text>
    </svg>
  );
}
