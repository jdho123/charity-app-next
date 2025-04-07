import { MenuButtonProps } from './type';

export default function ReactiveMenu({ toggleMenu, isOpen }: MenuButtonProps) {
  return (
    <button onClick={toggleMenu} className="fixed top-4 right-4 z-50 group">
      <div className="flex flex-col items-end p-2 rounded-lg">
        <span
          className={`font-gloria text-2xl mb-1 text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] ${
            !isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          Menu
        </span>
        <div className="space-y-1.5">
          {/* Lines with shadow for contrast */}
          <div
            className={`h-[3px] rounded-full transform origin-right transition-all duration-200 
          bg-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] ${
            isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-10'
          }`}
          ></div>
          <div
            className={`h-[3px] rounded-full transform origin-right transition-all duration-200 
          bg-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] ${
            isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-8'
          }`}
          ></div>
          <div
            className={`h-[3px] rounded-full transform origin-right transition-all duration-200 
          bg-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] ${
            isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-6'
          }`}
          ></div>
        </div>
      </div>
    </button>
  );
}
