interface MenuToggleProps {
    isOpen: boolean
    onToggle: () => void
  }
  
  import Image from 'next/image';
  
  export default function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
    return (
      <button
        className="relative w-[88px] h-[101px] focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle menu"
      >
        <div className="text-3xl font-gloria absolute top-0 left-1">Menu</div>
        
        {/* Menu Lines */}
        <div className="absolute left-0 space-y-1">
          {[0, 1, 2].map((index) => (
            <Image
              key={index}
              src="/images/menu-line.png"
              style={{
                top: `${45 + (index * 14)}px`
              }}
              className={`
                absolute w-[88px] h-7 object-cover transition-transform duration-200
                ${isOpen && index === 0 ? 'rotate-45 translate-y-3' : ''}
                ${isOpen && index === 1 ? 'opacity-0' : ''}
                ${isOpen && index === 2 ? '-rotate-45 -translate-y-3' : ''}
              `}
              alt=""
              width={88}
              height={28}
            />
          ))}
        </div>
      </button>
    )
  }