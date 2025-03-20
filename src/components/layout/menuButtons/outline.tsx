import { MenuButtonProps } from './type';

export default function OutlineMenu({ toggleMenu, isOpen }: MenuButtonProps) {
  return (
    <button onClick={toggleMenu} className="fixed top-4 right-4 z-50 group">
      <div className="flex flex-col items-end bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md border border-gray-200">
        <span
          className={`font-gloria text-2xl mb-1 text-black ${
            !isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          Menu
        </span>
        <div className="space-y-1.5">
          <div
            className={`h-[3px] bg-black rounded-full transform origin-right transition-all duration-200 ${
              isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-10'
            }`}
          ></div>
          <div
            className={`h-[3px] bg-black rounded-full transform origin-right transition-all duration-200 ${
              isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-8'
            }`}
          ></div>
          <div
            className={`h-[3px] bg-black rounded-full transform origin-right transition-all duration-200 ${
              isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-6'
            }`}
          ></div>
        </div>
      </div>
    </button>
  );
}
