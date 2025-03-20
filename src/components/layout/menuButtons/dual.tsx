import { MenuButtonProps } from './type';

export default function DualMenu({ toggleMenu, isOpen }: MenuButtonProps) {
  return (
    <button onClick={toggleMenu} className="fixed top-4 right-4 z-50 group">
      <div className="flex flex-col items-end p-2 rounded-lg">
        <span
          className={`font-gloria text-2xl mb-1 text-black stroke-white ${
            !isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            WebkitTextStroke: '1px white', // For webkit browsers
            textShadow: '1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff', // Cross-browser text outline
          }}
        >
          Menu
        </span>
        <div className="space-y-1.5">
          {/* Each line has a white outline for visibility on any background */}
          <div
            className={`relative h-[3px] transform origin-right transition-all duration-200 ${
              isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-10'
            }`}
          >
            <div className="absolute inset-0 bg-white rounded-full blur-[0.5px] scale-[1.15]"></div>
            <div className="absolute inset-0 bg-black rounded-full"></div>
          </div>
          <div
            className={`relative h-[3px] transform origin-right transition-all duration-200 ${
              isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-8'
            }`}
          >
            <div className="absolute inset-0 bg-white rounded-full blur-[0.5px] scale-[1.15]"></div>
            <div className="absolute inset-0 bg-black rounded-full"></div>
          </div>
          <div
            className={`relative h-[3px] transform origin-right transition-all duration-200 ${
              isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-6'
            }`}
          >
            <div className="absolute inset-0 bg-white rounded-full blur-[0.5px] scale-[1.15]"></div>
            <div className="absolute inset-0 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </button>
  );
}
