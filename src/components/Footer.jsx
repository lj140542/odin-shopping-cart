import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';

export default function Footer() {
  return (
    <footer
      className='
      flex justify-center items-center 
      w-screen h-32 
      bg-light-primary dark:bg-dark-primary'
    >
      <a
        href="https://github.com/lj140542/odin-shopping-cart"
        className='flex gap-2'
      >
        <Icon path={mdiGithub} size={1} />
        made by Jonathan Lefebvre
      </a>
    </footer>
  )
}