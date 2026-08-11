import React, { useState } from 'react';
import { Facebook, Linkedin, MessageCircle, Link2, Check } from 'lucide-react';

import { trackCTA } from '../lib/tracking';

const SITE_URL = 'https://tabelaplanosaude.com.br';

export default function ShareButtons({ path, title }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleShare = (network) => {
    trackCTA('compartilhar_post', 'blog_post', { rede: network, url });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      handleShare('copiar_link');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Erro ao copiar link:', e);
    }
  };

  const links = [
    {
      key: 'facebook',
      label: 'Compartilhar no Facebook',
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      key: 'linkedin',
      label: 'Compartilhar no LinkedIn',
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      key: 'whatsapp',
      label: 'Compartilhar no WhatsApp',
      Icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-black uppercase tracking-widest text-slate-500">
        Compartilhar
      </span>
      {links.map(({ key, label, Icon, href }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onClick={() => handleShare(key)}
          className="group rounded-xl border border-slate-200 bg-slate-50 p-2.5 transition-all hover:bg-[#ff8200]"
        >
          <Icon className="h-4 w-4 text-slate-500 group-hover:text-white" />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copiar link do post"
        className="group rounded-xl border border-slate-200 bg-slate-50 p-2.5 transition-all hover:bg-[#ff8200]"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Link2 className="h-4 w-4 text-slate-500 group-hover:text-white" />
        )}
      </button>
    </div>
  );
}
