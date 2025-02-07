import Image from "next/image"

interface SocialLink {
  name: string
  href: string
  icon: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: '/storage/linkedin.png'
  },
  {
    name: 'WhatsApp',
    href: '#',
    icon: '/storage/whatsapp.png'
  },
  {
    name: 'Instagram',
    href: '#',
    icon: '/storage/instagram.png'
  },
  {
    name: 'YouTube',
    href: '#',
    icon: '/storage/youtube.png'
  }
]

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link) => (
        <a 
          key={link.name}
          href={link.href}
          aria-label={link.name}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <Image 
              src={link.icon}
              alt={link.name}
              width={48}
              height={48}
              className="object-cover"
            />
        </a>
      ))}
    </div>
  )
}