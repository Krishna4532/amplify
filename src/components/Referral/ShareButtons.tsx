import React from 'react';

export const ShareButtons = ({ url }: { url: string }) => {
  const shareLinks = [
    { name: 'WhatsApp', color: 'bg-[#25D366]', link: `https://wa.me/?text=Join me on Amplify: ${url}` },
    { name: 'Twitter', color: 'bg-[#1DA1F2]', link: `https://twitter.com/intent/tweet?text=Join me on Amplify!&url=${url}` },
  ];

  return (
    <div className="flex gap-3 mt-4">
      {shareLinks.map((social) => (
        <a 
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer"
          className={`${social.color} text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity`}
        >
          Share on {social.name}
        </a>
      ))}
    </div>
  );
};