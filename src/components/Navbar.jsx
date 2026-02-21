import { navIcons, navLinks } from '#constants'
import React, { use } from 'react'
import dayjs from 'dayjs';
import useWindowStore from '#store/window.js';


const Navbar = () => {

    const { openWindow } = useWindowStore();

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className='font-bold mt-1'>Ansh's Portfolio</p>

                <ul className='mt-1'>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick={() => openWindow(type)} >
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <ul className='mt-1'>
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img src={img} className='icon-hover' alt={`icon-${id}`} />
                        </li>
                    ))}
                </ul>

                <time className='mt-1'>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>

        </nav>
    );
};

export default Navbar;