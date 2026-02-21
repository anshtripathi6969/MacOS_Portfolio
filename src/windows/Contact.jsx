import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
import WindowControls from '#components/WindowControls';
import { socials } from '#constants';

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2 className='text-black font-medium'>Contact Me</h2>
      </div>

      <div className="p-8 pb-10 flex flex-col items-center gap-8 bg-gray-50 h-[calc(100%-2.5rem)] overflow-y-auto">

        {/* PROFILE SECTION */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative group">
            <img
              src="/images/myself5.jpg"
              alt="Ansh"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full ring-2 ring-black/5"></div>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 font-[Google Sans]">Ansh Tripathi</h3>
            <p className="text-sm font-medium text-gray-500">Full Stack Developer • India</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm mt-1">
            <p className="text-xs font-medium text-gray-600">🚀 building cool stuff</p>
          </div>
        </div>

        {/* SOCIALS GRID */}
        <div className="w-full max-w-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Socials</p>
          <ul className="grid grid-cols-2 gap-3">
            {socials.map(({ id, bg, link, icon, text }) => (
              <li key={id} className='group'>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: bg }}></div>
                  <div className="size-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${bg}` }}>
                    <img src={icon} alt={text} className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{text}</p>
                    <p className="text-[10px] text-gray-400 group-hover:text-gray-600">Connect</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* EMAIL SECTION */}
        <div className="w-full max-w-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Get in touch</p>
          <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="text-sm font-semibold text-gray-900 truncate selection:bg-blue-100">anshtripathi8989@gmail.com</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText('anshtripathi8989@gmail.com')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-black"
              title="Copy Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
