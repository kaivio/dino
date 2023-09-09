import React from 'react';
import feather from 'feather-icons';

function ButtonContent({ children }) {
  return <div className="inline">{children}</div>
}

function ButtonIconContent({ children }) {
  return <div className="inline text-[0]">{children}</div>
}

function ButtonSVGStringContent({ children }) {
  return <div className="inline text-[0]" dangerouslySetInnerHTML={{__html:children}}></div>
}


export function ButtonBase({ className, Wrapper, children, ...props }) {
  // left-0 right-0 top-[-50%] aspect-square rounded-full  
  props.tabIndex = props.tabIndex || 0
  className += className.indexOf('rounded-') == -1 ? ' rounded-md' : ''
  return (
    <div className={className +
      ' cursor-pointer select-none whitespace-nowrap' +
      ' overflow-hidden relative inline-block w-max'}
      {...props}>
      <div className='bg-current absolute left-0 right-0 top-0 bottom-0
       opacity-0  pointer:hover:opacity-10 active:!opacity-50 
       transition-opacity duration-500 ease-out'
        style={{ backgroundColor: 'currentColor' }}
      ></div>
      <Wrapper>{children}</Wrapper>
    </div>
  )
}

export function ButtonIcon({ className, icon, size = '16px', children, ...props }) {
  if (!feather.icons[icon]) {
    icon = 'figma'
  }
  let svg = feather.icons[icon].toSvg({
    width: size,
    height: size,
  })

  children = children || svg

  return <ButtonBase className={className + ' text-[0] aspect-square rounded-full'} {...props}>
    {children}
  </ButtonBase>
}

export default function Button({ variant = 'base', ...props }) {
  let wrapper = ButtonContent
  if (props.icon) {
    variant = 'icon'
    wrapper = ButtonSVGStringContent
  } 


  let ButtonVariant = {
    base: ButtonBase,
    icon: ButtonIcon,
  }[variant]

  if (!ButtonVariant) {
    throw 'Button variant not has: ' + variant
  }


  return <ButtonVariant Wrapper={wrapper} {...props} />
}