import Image from 'next/image';

interface SocialIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function SocialIcon({ name, size = 24, className = "" }: SocialIconProps) {
  return (
    <Image 
      src={`/icons/${name}.svg`}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
    />
  );
}