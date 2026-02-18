import React from 'react';
import CTAGroup from './CTAGroup';

const StickyMobileCTA = ({ onOpenForm }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] lg:hidden">
      <div className="h-10 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
      <div className="bg-white/92 backdrop-blur-xl border-t border-black/10 px-3 py-3">
        <div className="mx-auto max-w-md">
          <CTAGroup label="sticky" onOpenForm={onOpenForm} size="md" variant="sticky" />
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;