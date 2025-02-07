import Link from 'next/link'

interface DropdownLinkProps {
  href?: string
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch'
  as?: 'a' | 'button'
  onClick?: (event: React.MouseEvent) => void
  children: React.ReactNode
}

export default function DropdownLink({
  href = '#',
  method = 'get',
  as = 'a',
  onClick,
  children
}: DropdownLinkProps) {
  const baseClasses = `
    block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 
    hover:bg-gray-100 focus:outline-none focus:bg-gray-100 
    transition duration-150 ease-in-out
  `

  if (as === 'button') {
    return (
      <button
        type="submit"
        className={baseClasses}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return (
    <Link
      href={href}
      className={baseClasses}
      onClick={(e) => {
        if (method !== 'get') {
          e.preventDefault()
          // Handle non-GET methods here
          // You might want to use a form submission or API call
        }
        onClick?.(e)
      }}
    >
      {children}
    </Link>
  )
}