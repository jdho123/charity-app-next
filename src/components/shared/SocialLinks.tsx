import { SocialIcon } from '@/components/socials/SocialIcon';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  iconClassName?: string;
}

const socialLinks = [
  {
    name: 'facebook',
    href: '#',
  },
  {
    name: 'instagram',
    href: '#',
  },
  {
    name: 'linkedin',
    href: '#',
  },
  {
    name: 'youtube',
    href: '#',
  }
];

export default function SocialLinks({ 
  className = "flex items-center gap-4",
  iconSize = 24,
  iconClassName = "transition-opacity hover:opacity-80"
}: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map(({ name, href }) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <SocialIcon 
            name={name}
            size={iconSize}
            className={iconClassName}
          />
        </a>
      ))}
    </div>
  );
}