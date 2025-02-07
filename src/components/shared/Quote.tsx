import Image from 'next/image';

export default function Quote({ children }: { children: React.ReactNode }) {
    return (
        <blockquote className="relative">
            <Image 
                src="/images/quote-left.png" 
                alt="Quote mark" 
                layout="fill"
                objectFit="contain"
                className="absolute -top-8 -left-8 w-[175px] h-[149px] opacity-50"
            />
            <Image 
                src="/images/quote-right.png" 
                alt="Quote mark" 
                layout="fill"
                objectFit="contain"
                className="absolute -bottom-8 -right-8 w-[159px] h-[133px] opacity-50"
            />

            <div className="relative z-10 px-12">
                {children}
            </div>
         </blockquote>
    )
  }