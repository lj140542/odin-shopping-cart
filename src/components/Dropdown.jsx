import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import { mdiChevronDown } from '@mdi/js'

export default function Dropdown({ name, options }) {
  const [display, setDisplay] = useState(false)
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setDisplay(false));

  return (
    <div className="relative" ref={wrapperRef} onClick={() => setDisplay(!display)}>
      <a className="group p-4 flex items-center gap-x-1 font-semibold leading-6">
        <span>{name}</span>
        <Icon className={'transition-transform duration-300' + (display ? " rotate-180" : " rotate-0")} path={mdiChevronDown} size={.8} />
      </a>
      <ul className={
        "flex-column absolute left-1/2 z-10 bg-light-bg dark:bg-dark-bg " +
        "rounded-xl border-light-primary dark:border-dark-primary shadow-md " +
        "w-screen max-w-sm -translate-x-1/2 p-4 transition-transform origin-top duration-300"
        + (display ? " scale-y-1" : " scale-y-0")
      }>
        {options.map(option => {
          return <li key={option.name}>
            <div key={option.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-light-primary dark:hover:bg-dark-primary">
              <div>
                <Link to={option.link} className="font-semibold text-light-second dark:text-dark-second">
                  {option.name}
                  <span className="absolute inset-0" />
                </Link>
                <p className="mt-1 text-light-text dark:text-dark-text">{option.description}</p>
              </div>
            </div>
          </li>
        })}
      </ul>

    </div>
  )
}

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target))
        callback();
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

Dropdown.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array
};